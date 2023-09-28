import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getQuestion, getSession } from "../../../api/Sarat";
import { BsChevronBarLeft } from "react-icons/bs";

export default function ListQuestion() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const path = "/admin/list-sesi";
  const session_id = localStorage.getItem("RESUME_ID");
  const session_name = localStorage.getItem("RESUME_NAME");

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  useEffect(() => {
    getQuestion(setData, setSts, session_id);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Pertanyaan</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.is_publish,
      cell: (data) => (
        <div
          className={
            data.is_publish === 1
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.is_publish == 1 ? "Aktif" : "Tidak Aktif"}
        </div>
      ),
      width: "120px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateDetailQuestion()}
          >
            <i className="fa fa-edit" /> Detail Pilihan Jawaban
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateDetailQuestion = () => {
    navigate("/admin/detail-soal", {
      state: {
        session_tittle: location.state.session_tittle,
      },
    });
  };

  const navigateDetailSession = () => {
    navigate(path);
  };

  const navigateTambahQuestion = () => {
    navigate("/admin/tambah-soal", {
      state: {
        session_tittle: location.state.session_tittle,
        questions: data.length,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Data Sesi"
        navePrev={path}
        at="Data Soal"
        title={`Data Soal ${location.state.session_tittle}`}
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahQuestion}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          //   pagination={pagination}
          buttonText="Tambah Soal"
        />
      </div>
      <div className="flex justify-start w-full">
        <button
          onClick={navigateDetailSession}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </button>
      </div>
    </>
  );
}
