import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getSession, getSessionReport } from "../../../api/Sarat";
import axios from "../../../api/axios";
import {
  AlertMessage,
  AlertStatusSuccess,
} from "../../../components/ModalPopUp";
import moment from "moment";
import { getTahunAjaran } from "../../../api/TahunAjaran";

export default function ListResumeReport() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const year = moment().format("YYYY");
  const [academicYearFilter, setAcademicYearFilter] = useState();
  const [filterAcademicYear, SetFilterAcademicYear] = useState(
    localStorage.getItem("FilterAcademicYear") == null
      ? "false"
      : localStorage.getItem("FilterAcademicYear")
  );
  const navigate = useNavigate();

  console.log("kk", data[0]?.session_detail?.session?.academic_year_id);
  console.log("asdajs", academicYearFilter);
  localStorage.setItem("FilterAcademicYear", filterAcademicYear);

  let filteredItems = data;
  let filteredAcademicYear = data;

  if (filterAcademicYear === "true" && academicYearFilter !== undefined) {
    filteredAcademicYear = data.filter(
      (data) =>
        data.session_detail.session.academic_year_id === academicYearFilter
    );
    filteredItems = filteredAcademicYear.filter((data) =>
      data.parent_name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getSessionReport(currentPage, itemsPerPage, setData, setSts, setPagination);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Sesi</div>,
      cell: (data) => (
        <div>{`${data.session_detail.session.name} - ${data.session_detail.title} - ${data.session_detail.description}`}</div>
      ),
      width: "300px",
    },
    {
      name: <div>Kehadiran</div>,
      cell: (data) => <div>{data.attendance_type}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Orang Tua</div>,
      cell: (data) => <div>{data.parent_name}</div>,
      width: "auto",
    },
    {
      name: <div>Status Orang Tua</div>,
      cell: (data) => <div className="capitalize">{data.parent_type}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Siswa</div>,
      cell: (data) => <div>{data.student_name}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-2">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Detail Resume Report"
            onClick={() =>
              navigateDetail(
                data.id,
                data.parent_name,
                data.parent_type,
                data.student_name
              )
            }
          >
            <i className="fa fa-edit" /> Detail
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "180px",
    },
  ];

  const navigateTambahSession = () => {
    navigate("/admin/tambah-resume");
  };

  const navigateDetail = (id, name, status, student) => {
    navigate("/admin/detail-report-resume", {
      state: {
        id: id,
        name: name,
        status: status,
        student: student,
      },
    });
  };

  const handleAcademicYearFilter = (event) => {
    const val = parseInt(event.target.value);
    setAcademicYearFilter(val);
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Resume Report"
        title="Resume Report"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahSession}
          filter={true}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          showButton={false}
          filterAcademicYear={filterAcademicYear}
          SetFilterAcademicYear={SetFilterAcademicYear}
          onChangeAcademicYear={handleAcademicYearFilter}
          academicYeardata={data}
          valueAcademicYear={academicYearFilter}
        />
      </div>
    </>
  );
}
