import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getConfig, getQuestion, getSession } from "../../../api/Sarat";
import { BsChevronBarLeft } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function Config() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setIsLoading } = useStateContext();
  const path = "/admin/list-sesi";
  const flag = localStorage.getItem("FLAG");
  const session_id = localStorage.getItem("SESSION_ID");
  const session_tittle = localStorage.getItem("SESSION_TITTLE");

  let filteredItems = data;
  // if (data !== null) {
  //   filteredItems = data.filter((data) =>
  //     data.description.toLowerCase().includes(filterText.toLowerCase())
  //   );
  // }

  useEffect(() => {
    setIsLoading(true);
    getConfig(setData, setSts, setIsLoading);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Jam Telat</div>,
      cell: (data) => <div>{data.late_hour}</div>,
      width: "auto",
    },
    {
      name: <div>Jam Mulai Pre-Test</div>,
      cell: (data) => <div>{data.start_pre_test}</div>,
      width: "auto",
    },
    {
      name: <div>Jam Selesai Pre-Test</div>,
      cell: (data) => <div>{data.end_pre_test}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Pre-Test</div>,
      cell: (data) => <div>{data.day_pre_test || "-"}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-1 w-auto">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            title="Edit"
            onClick={() =>
              navigateUbahConfig(
                data.late_hour,
                data.start_pre_test,
                data.end_pre_test,
                data.day_pre_test, // ← add this
              )
            }
          >
            <i className="fa fa-edit" /> Edit Config
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "320px",
    },
  ];

  const navigateUbahConfig = (
    late_hour,
    start_pre_test,
    end_pre_test,
    day_pre_test,
  ) => {
    navigate("/admin/ubah-config", {
      state: {
        late_hour: late_hour,
        start_pre_test: start_pre_test,
        end_pre_test: end_pre_test,
        day_pre_test: day_pre_test, // ← add this
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Config SARAT"
        // navPrev={path}
        at="Config SARAT"
        title="Config SARAT"
      />

      <div style={{ marginTop: "5px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          // onClick={navigateTambahQuestion}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          // pagination={pagination}
          // buttonText="Tambah Soal"
          showButton={false}
        />
      </div>
      {/* <div className="flex justify-start w-full">
        <button
          onClick={navigateDetailSession}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </button>
      </div> */}
    </>
  );
}
