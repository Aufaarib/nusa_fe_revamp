import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataTablesSession } from "../../../components/DataTables";
import { Header } from "../../../components";
import { getDetailSession, getScores } from "../../../api/Sarat";
import axios from "../../../api/axios";
import {
  AlertMessage,
  AlertStatusSuccess,
} from "../../../components/ModalPopUp";
import { useStateContext } from "../../../contexts/ContextProvider";
import { ErrorHandling } from "../../../api/ErrorHandling";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

export default function ListScores() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const path = "/admin/list-sesi";
  const location = useLocation();

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.user.fullname.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getScores(
      setData,
      setSts,
      setIsLoading,
      localStorage.getItem("SESSION_ID"),
      localStorage.getItem("FLAG")
    );
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama</div>,
      cell: (data) => <div>{data.user.fullname}</div>,
      width: "auto",
    },
    {
      name: <div>Skor</div>,
      cell: (data) => <div>{data.score}</div>,
      width: "auto",
    },
    {
      name: <div>Rangking</div>,
      cell: (data) => <div>{data.rank}</div>,
      width: "auto",
    },
  ];

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Sesi"
        navPrev={path}
        at="Daftar Skor"
        title={`Daftar Skor - ${localStorage.getItem("SESSION_TITTLE")} - ${
          localStorage.getItem("FLAG") === "ATTENDANCE"
            ? "Presensi"
            : "Pre-Test"
        }`}
      />

      <div style={{ marginTop: "50px", zIndex: 0 }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          // onClick={navigateTambahSession}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination
          showButton={false}
          searchText="Cari Nama"
        />
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
    </>
  );
}
