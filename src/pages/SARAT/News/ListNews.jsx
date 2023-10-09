import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesSession } from "../../../components/DataTables";
import { getNews, getSession } from "../../../api/Sarat";
import moment from "moment/moment";
import {
  AlerNewsFiles,
  AlerNewsVideos,
  AlertFiles,
} from "../../../components/ModalPopUp";

export default function ListNews() {
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
      data.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getNews(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "220px",
    },
    {
      name: <div>Thumbnail</div>,
      cell: (data) => (
        <button
          title="Lihat Thumbnail"
          onClick={() => {
            AlerNewsFiles(data.images[0].image_url);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file-image-o" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Video</div>,
      cell: (data) => (
        <button
          title="Lihat Video"
          onClick={() => {
            AlerNewsVideos(data.video_url);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file-video-o" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Tanggal Dibuat</div>,
      cell: (data) => <div>{moment(data.createdAt).format("YYYY-MM-DD")}</div>,
      width: "190px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div className="flex gap-2">
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            title="Edit"
            onClick={() =>
              navigateUbahNews(
                data.id,
                data.session_detail_id,
                data.description,
                data.video_url,
                data.images
              )
            }
          >
            <i className="fa fa-edit" /> Edit Berita
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() => navigateDetailNews(data.id, data.description)}
          >
            <i className="fa fa-edit" /> Daftar Foto
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "260px",
    },
  ];

  const navigateDetailNews = (id, description) => {
    navigate("/admin/list-foto-berita", {
      state: {
        id: id,
        description: description,
      },
    });
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
        at="Resume"
        title="Daftar Resume"
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
          buttonText="Tambah Berita"
        />
      </div>
    </>
  );
}
