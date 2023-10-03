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
  const session_id = localStorage.getItem("SESSION_ID");
  const session_tittle = localStorage.getItem("SESSION_TITTLE");

  console.log(session_id);

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
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-1 w-auto">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            title="Edit"
            onClick={() =>
              navigateUbahQuestion(
                data.id,
                data.session_detail_id,
                data.description,
                data.is_publish,
                data.sequence
              )
            }
          >
            <i className="fa fa-edit" /> Edit Pertanyaan
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateDetailQuestion(data.id)}
          >
            <i className="fa fa-edit" /> Detail Pilihan Jawaban
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "320px",
    },
  ];

  const navigateDetailQuestion = (question_id) => {
    navigate("/admin/detail-soal", {
      state: {
        question_id: question_id,
        session_tittle: session_tittle,
      },
    });
  };

  const navigateUbahQuestion = (
    question_id,
    session_detail_id,
    description,
    is_publish,
    sequence
  ) => {
    navigate("/admin/ubah-soal", {
      state: {
        question_id: question_id,
        session_detail_id: session_detail_id,
        description: description,
        is_publish: is_publish,
        sequence: sequence,
        session_tittle: session_tittle,
      },
    });
  };

  const navigateDetailSession = () => {
    navigate(path);
  };

  const navigateTambahQuestion = () => {
    navigate("/admin/tambah-soal", {
      state: {
        session_tittle: session_tittle,
        questions: data.length,
        session_id: session_id,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Sesi"
        navePrev={path}
        at="Daftar Soal"
        title={`Daftar Soal ${session_tittle}`}
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
