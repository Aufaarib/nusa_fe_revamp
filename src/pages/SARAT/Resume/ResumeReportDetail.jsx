import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSessionReportDetail } from "../../../api/Sarat";
import { Header } from "../../../components";
import { DataTablesDetailSession } from "../../../components/DataTables";
import { AlerNewsFiles, AlertMessage } from "../../../components/ModalPopUp";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ResumeReportDetail() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getSessionReportDetail(
      location.state.id,
      setData,
      setQuestion,
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
    // {
    //   name: <div>File Resume</div>,
    //   cell: (data) => (
    //     <div className="flex flex-row gap-2">
    //       <button
    //         title="Lihat File"
    //         onClick={() => {
    //           const downloads = true;
    //           AlerNewsFiles(data.resume_file, downloads, location.state.name);
    //         }}
    //       >
    //         <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
    //       </button>
    //     </div>
    //   ),
    //   width: "auto",
    // },
  ];
  const columns2 = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Pertanyaan</div>,
      cell: (data) => <div>{data.question?.question}</div>,
      width: "auto",
    },
    {
      name: <div>Jawaban</div>,
      cell: (data) => (
        <div>
          {data.question.question_type !== "UPLOAD" ? (
            data.answer || "-"
          ) : data.answer !== "" ? (
            <button
              title="Lihat File"
              onClick={() => {
                data.answer?.toLowerCase().endsWith(".pdf")
                  ? window.open(
                      `${process.env.REACT_APP_BASE_STATIC_SARAT_FILE}${data.answer}`,
                      "_blank"
                    )
                  : AlerNewsFiles(data.answer);
              }}
            >
              <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
            </button>
          ) : (
            "-"
          )}
          {/* {data.question.question_type !== "UPLOAD" ? (
            data.answer_description !== "" ? (
              data.answer_description
            ) : (
              data.answer
            )
          ) : data.answer !== "" ? (
            <button
              title="Lihat File"
              onClick={() => {
                data.question?.question_type === "UPLOAD" &&
                data.question?.answer !== ""
                  ? window.open(
                      `${process.env.REACT_APP_BASE_STATIC_SARAT_FILE}${data.answer}`,
                      "_blank"
                    )
                  : AlerNewsFiles(data.answer);
              }}
            >
              <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
            </button>
          ) : (
            ""
          )} */}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Hasil</div>,
      cell: (data) => (
        <div>
          {data.correct_answer !== ""
            ? data.is_correct
              ? "Benar"
              : "Salah"
            : "-"}
        </div>
      ),
      width: "auto",
    },
  ];

  const handleViewResume = (resume) => {
    AlertMessage("Resume Detail", `${resume}`, "Tutup", "info");
  };

  // const filteredDataQuestion = question.filter((val) => val.question?.question_type === "UPLOAD" && val.q)

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Resume Report"
        navPrev="/admin/list-report-resume"
        at="Detail Resume Report"
        title={`${location.state.flag} Resume Report - ${location.state.name}`}
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
