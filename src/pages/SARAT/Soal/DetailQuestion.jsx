import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getDetailQuestion, getQuestion, getSession } from "../../../api/Sarat";
import { BsChevronBarLeft } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ListQuestion() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setIsLoading } = useStateContext();
  const path = "/admin/list-soal";
  const session_tittle = localStorage.getItem("SESSION_TITTLE");

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.description?.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getDetailQuestion(
      location.state.question_id,
      setData,
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
      name: <div>Jawaban</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Kunci Jawaban</div>,
      selector: (data) => data.is_correct,
      cell: (data) => (
        <div
          className={
            data.is_correct === 1
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.is_correct == 1 ? "Benar" : "Salah"}
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
                data.is_correct,
                data.sequence
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

  console.log(location.state.session_detail_id);

  const navigateUbahDetailQuestion = (
    id,
    description,
    is_correct,
    sequence
  ) => {
    navigate("/admin/ubah-detail-soal", {
      state: {
        id: id,
        sequence: sequence,
        question_id: location.state.question_id,
        description: description,
        is_correct: is_correct,
        session_detail_id: location.state.session_detail_id,
        question: location.state.question,
        is_publish: location.state.is_publish,
        detail_question_sequence: location.state.sequence,
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
