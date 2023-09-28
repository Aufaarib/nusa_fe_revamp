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

  console.log(data);

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  useEffect(() => {
    getDetailQuestion(localStorage.getItem("RESUME_ID"), setData, setSts);
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
      selector: (data) => data.is_publish,
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
    // {
    //   name: <div>Aksi</div>,
    //   cell: (data) => (
    //     <div>
    //       <button
    //         style={{ width: "auto", padding: "2px 10px" }}
    //         className="btn-biru"
    //         title="Edit"
    //         onClick={() => navigateDetailSession(data.id, data.name)}
    //       >
    //         <i className="fa fa-edit" /> Detail
    //       </button>
    //     </div>
    //   ),
    //   ignoreRowClick: true,
    //   button: true,
    //   width: "180px",
    // },
  ];

  const navigateListSoal = () => {
    navigate("/admin/list-soal", {
      state: {
        session_tittle: location.state.session_tittle,
      },
    });
  };

  const navigateTambahDetailQuestion = () => {
    navigate("/admin/tambah-sesi");
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Soal"
        title="Soal"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
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
