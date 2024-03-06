import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSessionReportDetail } from "../../../api/Sarat";
import { Header } from "../../../components";
import { DataTablesDetailSession } from "../../../components/DataTables";
import {
  AlerNewsFiles,
  AlertEmpty,
  AlertMessage,
} from "../../../components/ModalPopUp";
import { TextArea } from "../../../components/TextInput";
import img from "../../../data/assalamualaikum.png";

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
      name: <div>File Resume</div>,
      cell: (data) => (
        <div className="flex flex-col gap-2">
          <button
            title="Lihat File"
            onClick={() => {
              AlerNewsFiles(data.resume_file);
            }}
          >
            <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
          </button>
          <button
            onClick={() => handleDownload(data.resume_file, data.parent_name)}
            type="button"
            title="Unduh File"
            className="flex flex-row items-center"
          >
            <i style={{ fontSize: "14px" }} className="fa fa-download" />
            <p>Unduh</p>
          </button>
        </div>
      ),
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

  const download = (filename, content) => {
    var element = document.createElement("a");
    element.setAttribute("href", content);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handleDownload = async (file_name, parent_name) => {
    try {
      const result = await fetch(
        process.env.REACT_APP_BASE_STATIC_SARAT_FILE + file_name,
        {
          method: "GET",
          headers: {},
        }
      );
      const blob = await result.blob();
      const url = URL.createObjectURL(blob);
      download(`file resume ${parent_name}`, url);
      URL.revokeObjectURL(url);
    } catch (error) {
      AlertMessage(
        "Tidak Dapat Mengunduh File",
        "File Tidak Tesedia",
        "Tutup",
        "warning"
      );
    }
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
        <div className="flex flex-row items-center gap-5 justify-between px-10">
          <div style={{ width: "100%" }}>
            <p className="text-merah font-bold">Resume : </p>
            <br />
            <textarea
              style={{
                width: "50%",
                border: "1px solid gray",
                height: "100px",
              }}
              className="px-2 rounded-md"
              value={data[0]?.resume}
            />
          </div>
        </div>
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
