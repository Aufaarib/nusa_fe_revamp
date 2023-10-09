import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getNews, getNewsDetail, getSession } from "../../../api/Sarat";
import moment from "moment/moment";
import { AlerNewsFiles, AlertFiles } from "../../../components/ModalPopUp";
import { BsChevronBarLeft } from "react-icons/bs";

export default function ListFotoFoto() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.createdAt.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getNewsDetail(location.state.id, setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Foto</div>,
      cell: (data) => (
        <button
          title="Lihat Thumbnail"
          onClick={() => {
            AlerNewsFiles(data.image_url);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Tanggal Di Upload</div>,
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

  const navigateListNews = () => {
    navigate("/admin/list-berita");
  };

  const navigateTambahBerita = () => {
    navigate("/admin/tambah-berita");
  };

  const navigateUbahNews = (
    id,
    session_detail_id,
    description,
    video_url,
    images
  ) => {
    navigate("/admin/ubah-berita", {
      state: {
        id: id,
        session_detail_id: session_detail_id,
        description: description,
        video_url: video_url,
        images: images,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Daftar Foto Berita"
        title="Daftar Foto Berita"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesSession
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahBerita}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          buttonText="Tambah Foto"
        />
        <div className="flex justify-start w-full">
          <button
            onClick={navigateListNews}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </button>
        </div>
      </div>
    </>
  );
}
