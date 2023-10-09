import moment from "moment/moment";
import { useEffect, useState } from "react";
import { getAdmissionStatement } from "../../../api/Registrasi";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { useLocation, useNavigate } from "react-router-dom";
// import { getAdmissionStatement } from "../../../api/Registrasi";

export default function ListAdmissionStatement() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [pagination, setPagination] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();

  let filteredItems = null;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.question.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  useEffect(() => {
    getAdmissionStatement(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Pertanyaan</div>,
      cell: (data) => <div>{data.question}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Dibuat</div>,
      cell: (data) => <div>{moment(data.createdAt).format("YYYY-MM-DD")}</div>,
      width: "auto",
    },
  ];

  const navigateTambahPertanyaan = () => {
    navigate("/admin/tambah-pertanyaan-pernyataan");
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Laporan Keuangan"
        title="Data Laporan Keuangan"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahPertanyaan}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          buttonText="Tambah Pertanyaan"
          showButton={true}
        />
      </div>
    </>
  );
}
