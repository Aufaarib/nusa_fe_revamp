import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataTablesSession } from "../../../components/DataTables";
import { Header } from "../../../components";
import { getDetailSession } from "../../../api/Sarat";
import axios from "../../../api/axios";
import {
  AlertMessage,
  AlertStatusSuccess,
} from "../../../components/ModalPopUp";
import { useStateContext } from "../../../contexts/ContextProvider";
import { ErrorHandling } from "../../../api/ErrorHandling";

export default function ListSession() {
  const [data, setData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const path = "/admin/list-resume";
  const location = useLocation();

  let filteredItems = detailsData;
  if (detailsData !== null) {
    filteredItems = detailsData.filter((data) =>
      data.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getDetailSession(
      localStorage.getItem("RESUME_ID"),
      setData,
      setDetailsData,
      setSts,
      setIsLoading
    );
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Sesi</div>,
      cell: (data) => <div>{data.title}</div>,
      width: "140px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
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
        <div className="flex flex-col gap-1">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateSoalPreTest(data.id, data.title)}
          >
            <i className="fa fa-eye" /> Daftar Soal Pre-Test
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateSoalPresensi(data.id, data.title)}
          >
            <i className="fa fa-eye" /> Daftar Soal Presensi
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className={data.status === 0 ? "btn-hijau" : "btn-mrh"}
            title="Edit"
            onClick={() =>
              onClickActivation(data.id, data.status === 0 ? 1 : 0)
            }
          >
            {data.status === 0 ? (
              <>
                <i className="fa fa-check" /> Aktifkan
              </>
            ) : (
              <>
                <i className="fa fa-times" /> Non-Aktifkan
              </>
            )}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "180px",
    },
    {
      name: <div>Report</div>,
      cell: (data) => (
        <div className="flex flex-col text-center gap-1">
          <a
            href={`${process.env.REACT_APP_NUSA_SARAT}/session/report-export?session_detail_id=${data.id}&flag=PRE_TEST`}
            style={{ width: "150px", height: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
          >
            <i className="fa fa-download" /> Download Report Pre-Test
          </a>
          <a
            href={`${process.env.REACT_APP_NUSA_SARAT}/session/report-export?session_detail_id=${data.id}&flag=ATTENDANCE`}
            style={{ width: "150px", height: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
          >
            <i className="fa fa-download" /> Download Report Presensi
          </a>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "180px",
    },
  ];

  const navigateTambahSession = () => {
    navigate("/admin/edit-sesi", {
      state: {
        resume_id: localStorage.getItem("RESUME_ID"),
        resume_name: localStorage.getItem("RESUME_NAME"),
        academicYearId: data.academic_year_id,
        details: detailsData,
      },
    });
  };

  const onClickActivation = (id, status) => {
    setIsLoading(true);
    axios
      .put(
        process.env.REACT_APP_NUSA_SARAT +
          `/session/update-session-detail/${id}`,
        {
          status,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then(() => {
        setIsLoading(false);
        setSts({ type: "success" });
        getDetailSession(
          localStorage.getItem("RESUME_ID"),
          setData,
          setDetailsData,
          setSts,
          setIsLoading
        );
        AlertStatusSuccess(
          navigate,
          "Berhasil",
          "Tutup",
          "success",
          "Edit Status Berhasil"
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setSts({ type: "error", error });
        ErrorHandling(error);
      });
  };

  const navigateSoalPreTest = (session_id, session_tittle) => {
    localStorage.setItem("SESSION_ID", session_id);
    localStorage.setItem("SESSION_TITTLE", session_tittle);
    localStorage.setItem("FLAG", "PRE_TEST");
    navigate("/admin/list-soal");
  };

  const navigateSoalPresensi = (session_id, session_tittle) => {
    localStorage.setItem("SESSION_ID", session_id);
    localStorage.setItem("SESSION_TITTLE", session_tittle);
    localStorage.setItem("FLAG", "ATTENDANCE");
    navigate("/admin/list-soal");
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Resume"
        navPrev={path}
        at="Daftar Sesi"
        title={`${localStorage.getItem("RESUME_NAME")}`}
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahSession}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination
          buttonText="Edit Sesi"
        />
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
    </>
  );
}
