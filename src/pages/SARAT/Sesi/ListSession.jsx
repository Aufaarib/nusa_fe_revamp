import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataTablesSession } from "../../../components/DataTables";
import { Header } from "../../../components";
import { getDetailSession } from "../../../api/Sarat";

export default function ListSession() {
  const [data, setData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const path = "/admin/list-resume";
  const location = useLocation();

  console.log("detailsData === ", detailsData);
  console.log("data === ", data);
  console.log("resumeId === ", localStorage.getItem("RESUME_ID"));
  console.log("resumeName === ", localStorage.getItem("RESUME_NAME"));

  let filteredItems = detailsData;
  if (detailsData !== null) {
    filteredItems = detailsData.filter((data) =>
      data.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getDetailSession(
      localStorage.getItem("RESUME_ID"),
      setData,
      setDetailsData,
      setSts
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
      width: "240px",
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
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateSoal(data.title)}
          >
            <i className="fa fa-edit" /> Data Soal
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "150px",
    },
  ];

  const navigateTambahSession = () => {
    navigate("/admin/tambah-sesi", {
      state: {
        resume_id: localStorage.getItem("RESUME_ID"),
        resume_name: localStorage.getItem("RESUME_NAME"),
        academicYearId: data.academic_year_id,
        details: detailsData,
      },
    });
  };

  const navigateSoal = (session_tittle) => {
    navigate("/admin/list-soal", {
      state: {
        session_id: localStorage.getItem("RESUME_ID"),
        session_tittle: session_tittle,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Data Resume"
        navePrev={path}
        at="Data Sesi"
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
