import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import {
  getActiveSession,
  getDonations,
  getNews,
  getNewsDetail,
  getSession,
} from "../../../api/Sarat";
import moment from "moment/moment";
import { AlerNewsFiles, AlertFiles } from "../../../components/ModalPopUp";
import { BsChevronBarLeft } from "react-icons/bs";

export default function ListDonations() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(
    "location.state.session_id === ",
    localStorage.getItem("SESSION_ID")
  );
  console.log("data === ", data);

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.donation_history?.filter((data) =>
      data.createdAt.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getDonations(localStorage.getItem("SESSION_ID"), setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Jumlah Infaq</div>,
      cell: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.total)}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Tanggal Dibuat</div>,
      cell: (data) => <div>{moment(data.createdAt).format("YYYY-MM-DD")}</div>,
      width: "auto",
    },
    // {
    //   name: <div>Aksi</div>,
    //   cell: (data) => (
    //     // <div className="flex gap-2">
    //     <button
    //       style={{ width: "auto", padding: "2px 10px" }}
    //       className="btn-mrh"
    //       title="Hapus"
    //       // onClick={() =>
    //       //   navigateUbahNews(
    //       //     data.id,
    //       //     data.session_detail_id,
    //       //     data.description,
    //       //     data.video_url,
    //       //     data.images
    //       //   )
    //       // }
    //     >
    //       <i className="fa fa-trash" /> Hapus
    //     </button>
    //     // </div>
    //   ),
    //   ignoreRowClick: true,
    //   button: true,
    //   width: "260px",
    // },
  ];

  const navigateTambahInfaq = () => {
    navigate("/admin/tambah-infaq");
  };

  const navigateListSesi = () => {
    navigate("/admin/list-sesi");
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Daftar Infaq"
        title={
          data.length !== 0
            ? `Total Infaq ${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(data.total)}`
            : "Total Infaq Rp 0"
        }
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahInfaq}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          buttonText="Tambah Infaq"
        />
        <div className="flex justify-start w-full">
          <button
            onClick={navigateListSesi}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </button>
        </div>
      </div>
    </>
  );
}
