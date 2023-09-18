import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClassRoom } from "../../../api/RuanganKelas";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";

const ListRuanganKelas = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

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
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => (
    //     <div
    //       className={
    //         data.status === 1
    //           ? "capitalize text-hijau"
    //           : "capitalize text-merah"
    //       }
    //     >
    //       {data.status == 1 ? "Aktif" : "Tidak Aktif"}
    //     </div>
    //   ),
    //   width: "auto",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru mr-3"
            onClick={() => navigateClassRoomDetails(data.id, data.room?.name)}
          >
            <i className="fa fa-eye" /> Detail
          </button>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            onClick={() =>
              navigateUpdateClassRoom(
                data.id,
                data.academicYear?.id,
                data.academicYear?.name,
                data.classes?.id,
                data.classes?.name,
                data.room?.id,
                data.room?.name,
                data.teachers[0].id,
                data.teachers[0].fullname,
                data.capacity
              )
            }
          >
            <i className="fa fa-edit" /> Edit
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
    tahunAjaranId,
    tahunAjaran,
    kelasId,
    kelas,
    ruanganId,
    ruangan,
    waliKelasId,
    waliKelas,
    kapasitas
  ) => {
    navigate("/admin/ubah-ruang-kelas", {
      state: {
        id: id,
        tahunAjaranId: tahunAjaranId,
        tahunAjaran: tahunAjaran,
        kelasId: kelasId,
        kelas: kelas,
        ruanganId: ruanganId,
        ruangan: ruangan,
        waliKelasId: waliKelasId,
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
export default ListRuanganKelas;
