import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDetailSession,
  getSession,
  getSessionReport,
} from "../../../api/Sarat";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ListResumeReport() {
  const [dataDetailSession, setDatadataDetailSession] = useState([]);
  const [data, setData] = useState([]);
  const [dataTA, setDataTA] = useState([]);
  const [dataSession, setDataSession] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [filterFlag, setFilterFlag] = useState("PRE_TEST");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const year = moment().format("YYYY");
  const [TAFilter, setTAFilter] = useState("");
  const [filterPreTest, SetFilterPreTest] = useState(true);
  const [filterPresensi, setFilterPresensi] = useState(false);
  const [filterTA, SetFilterTA] = useState(
    localStorage.getItem("FilterTA") == null
      ? "false"
      : localStorage.getItem("FilterTA")
  );
  const [sessionFilter, setSessionFilter] = useState("");
  const [filterSession, SetFilterSession] = useState(
    localStorage.getItem("FilterSession") == null
      ? "false"
      : localStorage.getItem("FilterSession")
  );
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  localStorage.setItem("FilterTA", filterTA);
  localStorage.setItem("FilterSession", filterSession);

  let filteredItems = data;
  let filteredAcademicYear = data;

  // if (filterAcademicYear === "true" && academicYearFilter !== undefined) {
  //   filteredAcademicYear = data.filter(
  //     (data) =>
  //       data.session_detail.session.academic_year_id === academicYearFilter
  //   );
  //   filteredItems = filteredAcademicYear.filter((data) =>
  //     data.parent_name.toLowerCase().includes(filterText.toLowerCase())
  //   );
  // }

  useEffect(() => {
    if (filterTA === "false") {
      setTAFilter("");
    } else if (filterSession === "false") {
      setSessionFilter("");
    }
  });

  const fetchReport = (TAFilter, sessionFilter, filterText, filterFlag) => {
    getSessionReport(
      currentPage,
      itemsPerPage,
      setData,
      setSts,
      setPagination,
      setIsLoading,
      TAFilter,
      sessionFilter,
      filterText,
      filterFlag
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReport(TAFilter, sessionFilter, filterText, filterFlag);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getSession(0, 20, setDataTA, setSts, setPagination, setIsLoading);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-2">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Detail Resume Report"
            onClick={() => {
              data.parent_type === "MOTHER"
                ? navigateDetail(
                    data.id,
                    data.user.parent.mother_name,
                    data.parent_type,
                    data.flag
                  )
                : navigateDetail(
                    data.id,
                    data.user.parent.father_name,
                    data.parent_type,
                    data.flag
                  );
            }}
          >
            <i className="fa fa-edit" /> Detail
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "180px",
    },
    {
      name: <div>Sesi</div>,
      cell: (data) => (
        <div>{`${data.session_detail.session.name} - ${data.session_detail.title} - ${data.session_detail.description}`}</div>
      ),
      width: "300px",
    },
    {
      name: <div>Resume</div>,
      cell: (data) => <div>{data.flag}</div>,
      width: "150px",
    },
    {
      name: <div>Kehadiran</div>,
      cell: (data) => <div>{data.attendance_type}</div>,
      width: "180px",
    },
    {
      name: <div>Nama Orang Tua</div>,
      cell: (data) => (
        <div>
          {data.parent_type === "MOTHER"
            ? data.user.parent.mother_name
            : data.user.parent.father_name}
        </div>
      ),
      width: "270px",
    },
    {
      name: <div>Status Orang Tua</div>,
      cell: (data) => <div className="capitalize">{data.parent_type}</div>,
      width: "140px",
    },
    {
      name: <div>Nama Siswa</div>,
      cell: (data) =>
        data.user.parent.students.map((items, index) => (
          <div>
            {items.student_name}
            {index + 1 !== data.user.parent.students.length && ","}
          </div>
        )),
      width: "300px",
    },
  ];

  const navigateTambahSession = () => {
    navigate("/admin/tambah-resume");
  };

  const navigateDetail = (id, name, status, flag) => {
    navigate("/admin/detail-report-resume", {
      state: {
        id: id,
        name: name,
        status: status,
        flag: flag,
      },
    });
  };

  const handleTAFilter = (event) => {
    const val = parseInt(event.target.value);
    setTAFilter(val);
    getDetailSession(
      val,
      setDatadataDetailSession,
      setDataSession,
      setSts,
      setIsLoading
    );
    fetchReport(val, sessionFilter, filterText, filterFlag);
  };
  const handleSessionFilter = (event) => {
    const val = parseInt(event.target.value);
    setSessionFilter(val);
    fetchReport(TAFilter, val, filterText, filterFlag);
  };
  const handleChangeFlag = (e) => {
    setFilterFlag(e);
    fetchReport(TAFilter, sessionFilter, filterText, e);
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navPrev={path}
        at="Resume Report"
        title="Resume Report"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahSession}
          filter={true}
          onFilter={(e) => {
            setFilterText(e.target.value);
            fetchReport(TAFilter, sessionFilter, e.target.value);
          }}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          showButton={false}
          filterSession={filterSession}
          SetFilterSession={SetFilterSession}
          onChangeSession={handleSessionFilter}
          sessionData={dataSession}
          valueSession={sessionFilter}
          filterTA={filterTA}
          SetFilterTA={SetFilterTA}
          onChangeTA={handleTAFilter}
          TAData={dataTA}
          valueTA={TAFilter}
          filterPreTest={filterPreTest}
          setFilterPreTest={SetFilterPreTest}
          filterPresensi={filterPresensi}
          setFilterPresensi={setFilterPresensi}
          setFilterFlag={handleChangeFlag}
        />
      </div>
    </>
  );
}
