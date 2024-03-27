import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getSession } from "../../../api/Sarat";
import axios from "../../../api/axios";
import {
  AlertMessage,
  AlertStatusSuccess,
} from "../../../components/ModalPopUp";

export default function ListResume() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getSession(currentPage, itemsPerPage, setData, setSts, setPagination);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Resume</div>,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div
          className={
            data.status === 1
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status == 1 ? "Aktif" : "Tidak Aktif"}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-2">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            title="Edit"
            onClick={() =>
              navigateUbahSession(
                data.id,
                data.name,
                data.academic_year_id,
                data.details
              )
            }
          >
            <i className="fa fa-edit" /> Edit Nama Resume
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateListSession(data.id, data.name)}
          >
            <i className="fa fa-edit" /> Daftar Sesi
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() =>
              onClickActivation(data.id, data.status === 0 ? 1 : 0)
            }
          >
            {data.status === 0 ? (
              <>
                <i className="fa fa-edit" /> Aktifkan
              </>
            ) : (
              <>
                <i className="fa fa-edit" /> Non-Aktifkan
              </>
            )}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "450px",
    },
  ];

  const onClickActivation = (id, status) => {
    axios
      .put(
        process.env.REACT_APP_NUSA_SARAT + `/session/update/${id}`,
        {
          status,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then(() => {
        setSts({ type: "success" });
        getSession(currentPage, itemsPerPage, setData, setSts, setPagination);
        AlertStatusSuccess(
          navigate,
          "Berhasil",
          "Tutup",
          "success",
          "Edit Status Berhasil"
        );
      })
      .catch((error) => {
        setSts({ type: "error", error });
        if (error.code === "ERR_NETWORK") {
          AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
        } else {
          AlertMessage("Gagal", "Edit Status Gagal", "Coba Lagi", "error");
        }
      });
  };

  const navigateListSession = (resume_id, resume_name) => {
    localStorage.setItem("RESUME_ID", resume_id);
    localStorage.setItem("RESUME_NAME", resume_name);
    navigate("/admin/list-sesi");
  };

  const navigateTambahSession = () => {
    navigate("/admin/tambah-resume");
  };

  const navigateUbahSession = (
    resume_id,
    resume_name,
    academicYearId,
    detailsData
  ) => {
    navigate("/admin/ubah-resume", {
      state: {
        resumeId: resume_id,
        resumeName: resume_name,
        academicYearId: academicYearId,
        details: detailsData,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Resume"
        title="Daftar Resume"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahSession}
          filter={false}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          buttonText="Tambah Resume"
        />
      </div>
    </>
  );
}
