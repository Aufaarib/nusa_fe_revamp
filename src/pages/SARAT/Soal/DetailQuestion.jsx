import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getDetailQuestion, getQuestion, getSession } from "../../../api/Sarat";
import { BsChevronBarLeft } from "react-icons/bs";

export default function ListQuestion() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const path = "/admin/list-soal";
  const session_tittle = localStorage.getItem("SESSION_TITTLE");

  console.log("Answers Data === ", data);
  // console.log(location.state.question_id);

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.description?.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getDetailQuestion(location.state.question_id, setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Jawaban</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Kunci Jawaban</div>,
      selector: (data) => data.correct_answer,
      cell: (data) => (
        <div
          className={
            data.correct_answer === 1
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.correct_answer == 1 ? "Benar" : "Salah"}
        </div>
      ),
      width: "auto",
    },

    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-1">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            title="Edit"
            onClick={() =>
              navigateUbahDetailQuestion(
                data.id,
                data.description,
                data.correct_answer
              )
            }
          >
            <i className="fa fa-edit" /> Edit Jawaban
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateListSoal = () => {
    navigate(path, {
      state: {
        session_tittle: session_tittle,
      },
    });
  };

  const navigateUbahDetailQuestion = (id, description, correct_answer) => {
    navigate("/admin/ubah-detail-soal", {
      state: {
        id: id,
        description: description,
        correct_answer: correct_answer,
        question_id: location.state.question_id,
      },
    });
  };

  const navigateTambahDetailQuestion = () => {
    navigate("/admin/tambah-detail-soal", {
      state: {
        question_id: location.state.question_id,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Soal"
        navPrev={path}
        at="Daftar Pilihan Jawaban"
        title="Daftar Pilihan Jawaban"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={data}
          onClick={navigateTambahDetailQuestion}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          //   pagination={pagination}
          buttonText="Tambah Pilihan Jawaban"
        />
        <div className="flex justify-start w-full">
          <button
            onClick={navigateListSoal}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </button>
        </div>
      </div>
    </>
  );
}
