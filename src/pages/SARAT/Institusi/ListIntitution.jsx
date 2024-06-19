import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getInstitution, getSession } from "../../../api/Sarat";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ListInstitution() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getInstitution(setData, setIsLoading);
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

  const navigateTambahSession = () => {
    navigate("/admin/tambah-resume");
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navPrev={path}
        at="Institusi"
        title="Daftar Institusi"
      />

      <div style={{ marginTop: "5px" }}>
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
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
