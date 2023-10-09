import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getInstitution, getSession } from "../../../api/Sarat";

export default function ListInstitution() {
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
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getInstitution(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Institusi</div>,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
  ];

  const navigateListSession = (resume_id, resume_name) => {
    localStorage.setItem("RESUME_ID", resume_id);
    localStorage.setItem("RESUME_NAME", resume_name);
    navigate("/admin/list-sesi");
  };

  const navigateTambahSession = () => {
    navigate("/admin/tambah-resume");
  };

  const navigateUbahSession = (
    resume_id,
    resume_name,
    academicYearId,
    detailsData
  ) => {
    navigate("/admin/ubah-resume", {
      state: {
        resumeId: resume_id,
        resumeName: resume_name,
        academicYearId: academicYearId,
        details: detailsData,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Institusi"
        title="Daftar Institusi"
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
          buttonText="Tambah Resume"
          showButton={false}
        />
      </div>
    </>
  );
}
