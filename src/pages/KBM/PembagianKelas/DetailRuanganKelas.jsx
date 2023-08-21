import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getClassRoom, getStudentListRoom } from "../../../api/RuanganKelas";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import moment from "moment/moment";
import { BsChevronBarLeft } from "react-icons/bs";

const DetailRuanganKelas = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = "/admin/list-ruang-kelas";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.firstName.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getStudentListRoom(setData, setSts, location.state.id);
  }, []);

  const navigateTambahMurid = (id, namaRuangan) => {
    navigate("/admin/tambah-murid-ke-kelas", {
      state: {
        id: id,
        namaRuangan: namaRuangan,
      },
    });
  };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Kode</div>,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Lengkap</div>,
      cell: (data) => (
        <div>{`${data.firstName} ${data.middleName} ${data.lastName}`}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Jenis Kelamin</div>,
      selector: (data) => data.gender,
      cell: (data) => (
        <div>{data.gender === "male" ? "Laki-Laki" : "Perempuan"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Tempat Lahir</div>,
      selector: (data) => data.birthPlace,
      cell: (data) => <div>{data.birthPlace}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Lahir</div>,
      selector: (data) => data.birthDate,
      cell: (data) => moment(data.birthDate).format("DD/MM/YYYY"),
      width: "auto",
    },
    {
      name: <div>Golongan Darah</div>,
      selector: (data) => data.bloodType,
      cell: (data) => data.bloodType,
      width: "auto",
    },
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
    //   width: "90px",
    // },
    // {
    //   name: <div>Aksi</div>,
    //   cell: (data) => (
    //     <button
    //       className="btn-action-merah"
    //       title="Edit"
    //       //   onClick={() =>
    //       //     navigateUbahMurid(
    //       //       data.code,
    //       //       data.firstName,
    //       //       data.middleName,
    //       //       data.lastName,
    //       //       data.gender,
    //       //       data.religion,
    //       //       data.birthPlace,
    //       //       data.birthDate,
    //       //       data.bloodType,
    //       //       data.distanceFromHome
    //       //     )
    //       //   }
    //     >
    //       <i className="fa fa-edit" /> Ubah
    //     </button>
    //   ),
    //   ignoreRowClick: true,
    //   button: true,
    //   width: "90px",
    // },
  ];

  return (
    <>
      <Header
        home="Admin KBM"
        prev="Daftar Ruangan Kelas"
        navePrev={path}
        at="Detail Ruangan Kelas"
        title={`Daftar Murid ${location.state.namaRuangan}`}
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={() =>
            navigateTambahMurid(location.state.id, location.state.namaRuangan)
          }
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambahkan Murid Ke Kelas"
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
};
export default DetailRuanganKelas;
