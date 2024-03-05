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

export default function ListResumeReport() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
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
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          showButton={false}
        />
      </div>
    </>
  );
}
