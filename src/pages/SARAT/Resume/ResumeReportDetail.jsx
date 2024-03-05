import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSessionReportDetail } from "../../../api/Sarat";
import { Header } from "../../../components";
import { DataTablesDetailSession } from "../../../components/DataTables";
import { AlertMessage } from "../../../components/ModalPopUp";

export default function ResumeReportDetail() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  // if (data !== null) {
  //   filteredItems = data.filter((data) =>
  //     data.parent_name.toLowerCase().includes(filterText.toLowerCase())
  //   );
  // }

  useEffect(() => {
    getSessionReportDetail(location.state.id, setData, setQuestion, setSts);
  }, []);

  console.log("data", question);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Alasan Telat</div>,
      cell: (data) => <div>{data.reason_late}</div>,
      width: "150px",
    },
    {
      name: <div>Institusi</div>,
      cell: (data) => <div>{data.institution.name}</div>,
      width: "auto",
    },
    {
      name: <div>Waktu Mulai</div>,
      cell: (data) => <div>{data.start_time}</div>,
      width: "auto",
    },
    {
      name: <div>Waktu Selesai</div>,
      cell: (data) => <div>{data.end_time}</div>,
      width: "auto",
    },
    {
      name: <div>Resume</div>,
      cell: (data) => (
        <button
          onClick={() => handleViewResume(data.resume)}
          className="truncate hover:text-blue-700"
          title="Lihat Selengkapnya"
        >
          {data.resume}
        </button>
      ),
      width: "300px",
    },
    {
      name: <div>Resume File</div>,
      cell: (data) => <div>{data.resume_file}</div>,
      width: "auto",
    },
  ];
  const columns2 = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Pertanyaan</div>,
      cell: (data) => <div>{data.question?.description}</div>,
      width: "auto",
    },
    {
      name: <div>Jawaban</div>,
      cell: (data) => <div>{data.question_detail?.description}</div>,
      width: "auto",
    },
    {
      name: <div>Hasil</div>,
      cell: (data) => (
        <div>
          {data.question_detail?.correct_answer == 1 ? "Benar" : "Salah"}
        </div>
      ),
      width: "auto",
    },
  ];

  const handleViewResume = (resume) => {
    AlertMessage("Resume Detail", `${resume}`, "Tutup", "info");
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Resume Report"
        navPrev="/admin/list-report-resume"
        at="Detail Resume Report"
        title={location.state.name + " - " + location.state.student}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          gap: "40px",
        }}
      >
        <DataTablesDetailSession columns={columns} data={data} />
        <p className="text-merah font-bold">Jawaban Soal : </p>
        <DataTablesDetailSession columns={columns2} data={question} />
        <div className="flex justify-start w-full">
          <Link
            to={"/admin/list-report-resume"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </Link>
        </div>
      </div>
    </>
  );
}
