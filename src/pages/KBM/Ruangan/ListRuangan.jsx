import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmission } from "../../../api/SetupPmb";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import { getMurid } from "../../../api/Murid";
import { getClassRoom } from "../../../api/RuanganKelas";

const ListRuangan = () => {
  const [data, setData] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const path = "/admin/list-bank";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.room?.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getClassRoom(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Tahum Ajaran</div>,
      selector: (data) => data.academicYear?.name,
      cell: (data) => <div>{data.academicYear?.name}</div>,
      width: "auto",
    },
    {
      name: <div>Ruangan</div>,
      selector: (data) => data.room?.name,
      cell: (data) => <div>{data.room?.name}</div>,
      width: "auto",
    },
    {
      name: <div>Wali Kelas</div>,
      selector: (data) => data.teachers[0].fullname,
      cell: (data) => <div>{data.teachers[0].fullname}</div>,
      width: "auto",
    },
    {
      name: <div>Kapasitas</div>,
      selector: (data) => data.capacity,
      cell: (data) => <div>{data.capacity}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div
          className={
            data.status === 1
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status == 1 ? "Aktif" : "Tidak Aktif"}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-action-merah mr-3"
            onClick={() => navigateClassRoomDetails(data.id, data.room?.name)}
          >
            <i className="fa fa-eye" /> Detail
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-action-merah"
            onClick={() =>
              navigateUpdateClassRoom(
                data.id,
                data.academicYear?.id,
                data.classes?.id,
                data.room?.id,
                data.teachers[0].id,
                data.capacity
              )
            }
          >
            <i className="fa fa-edit" /> Ubah
          </button>
        </>
      ),
      ignoreRowClick: true,
      button: true,
      width: "220px",
    },
  ];

  const navigateClassRoomDetails = (id, namaRuangan) => {
    navigate("/admin/detail-ruang-kelas", {
      state: {
        id: id,
        namaRuangan: namaRuangan,
      },
    });
  };
  const navigateUpdateClassRoom = (
    id,
    tahunAjaran,
    kelas,
    Ruangan,
    waliKelas,
    kapasitas
  ) => {
    navigate("/admin/ubah-ruang-kelas", {
      state: {
        id: id,
        tahunAjaran: tahunAjaran,
        kelas: kelas,
        Ruangan: Ruangan,
        waliKelas: waliKelas,
        kapasitas: kapasitas,
      },
    });
  };

  const navigateTambahRuangKelas = () => {
    navigate("/admin/tambah-ruang-kelas");
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Daftar Ruangan Kelas"
        title="Daftar Ruangan Kelas"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahRuangKelas}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Ruangan Kelas"
        />
      </div>
    </>
  );
};
export default ListRuangan;
