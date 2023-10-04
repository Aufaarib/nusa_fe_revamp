import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getNews, getSession } from "../../../api/Sarat";
import moment from "moment/moment";

export default function ListNews() {
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
      data.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getNews(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "220px",
    },
    {
      name: <div>Thumbnail</div>,
      cell: (data) => (
        <button
          title="Lihat Thumbnail"
          //   onClick={() => {
          //     openPaymentProof(data.invoice);
          //   }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Video</div>,
      cell: (data) => (
        <button
          title="Lihat Video"
          //   onClick={() => {
          //     openPaymentProof(data.invoice);
          //   }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file-video-o" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Tanggal Dibuat</div>,
      cell: (data) => <div>{moment(data.createdAt).format("YYYY-MM-DD")}</div>,
      width: "190px",
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
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

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
