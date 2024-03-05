import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getClassRoom,
  getKelompokMapelRoom,
  getStudentListRoom,
} from "../../../api/RuanganKelas";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import moment from "moment/moment";
import { BsChevronBarLeft } from "react-icons/bs";

const DetailRuanganKelas = () => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = "/admin/list-ruang-kelas";

  let filteredStudents = data;
  let filteredSubjects = data;

  if (data !== null) {
    {
      fetched === "1"
        ? (filteredStudents = data.filter((data) =>
            data.firstName?.toLowerCase().includes(filterText.toLowerCase())
          ))
        : (filteredSubjects = data.filter((data) =>
            data.subject?.name.toLowerCase().includes(filterText.toLowerCase())
          ));
    }
  }

  const fetchStudents = () => {
    setFetched("1");
    getStudentListRoom(setData, setSts, location.state.id);
  };

  const fetchSubjects = () => {
    setFetched("2");
    getKelompokMapelRoom(setData, setSts, location.state.id);
  };

  useEffect(() => {
    setFetched("1");
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
  const navigateTambahKelompokMapel = () => {
    navigate("/admin/tambah-kelompok-mapel");
  };

  const columnsStudents = [
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
      cell: (data) => (
        <div>{data.gender === "male" ? "Laki-Laki" : "Perempuan"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Tempat Lahir</div>,
      cell: (data) => <div>{data.birthPlace}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Lahir</div>,
      cell: (data) => moment(data.birthDate).format("DD/MM/YYYY"),
      width: "auto",
    },
    {
      name: <div>Golongan Darah</div>,
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
  const columnsSubjects = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Hari</div>,
      cell: (data) => (
        <div>
          {(data.schedule?.day == 1 && "Senin") ||
            (data.schedule?.day == 2 && "Selasa") ||
            (data.schedule?.day == 3 && "Rabu") ||
            (data.schedule?.day == 4 && "Kamis") ||
            (data.schedule?.day == 5 && "Jumat")}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Mata Pelajaran</div>,
      cell: (data) => <div>{data.subject?.name}</div>,
      width: "auto",
    },
    {
      name: <div>Jam Mulai</div>,
      cell: (data) => <div>{data.schedule?.startTime}</div>,
      width: "auto",
    },
    {
      name: <div>Jam Selesai</div>,
      cell: (data) => <div>{data.schedule?.endTime}</div>,
      width: "auto",
    },
    {
      name: <div>Guru</div>,
      cell: (data) => <div>{data.teacher?.fullname}</div>,
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
        navPrev={path}
        at="Detail Ruangan Kelas"
        title={`Daftar Murid ${location.state.namaRuangan}`}
      />

      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            backgroundColor: "#F3F4F6",
            justifyContent: "space-evenly",
            borderRadius: "6px",
          }}
        >
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "100%",
              backgroundColor: fetched === "1" ? "#8F0D1E" : "",
              color: fetched === "1" ? "white" : "black",
            }}
            onClick={() => fetchStudents()}
            // disabled={dataStep1 !== null ? false : true}
          >
            <i className="fa fa-bank" /> Daftar Murid
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "100%",
              backgroundColor: fetched === "2" ? "#8F0D1E" : "",
              color: fetched === "2" ? "white" : "black",
            }}
            onClick={() => fetchSubjects()}
            // disabled={
            //   dataStep1 !== null
            //     ? dataStep1?.status !== "valid"
            //       ? true
            //       : false
            //     : true
            // }
          >
            <i className="fa fa-user" /> Daftar Jadwal Pelajaran
          </button>
        </div>
        {fetched === "1" ? (
          <DataTablesPMB
            columns={columnsStudents}
            data={filteredStudents}
            onClick={() =>
              navigateTambahMurid(location.state.id, location.state.namaRuangan)
            }
            onFilter={(e) => setFilterText(e.target.value)}
            filterText={filterText}
            buttontxt="Tambahkan Murid Ke Kelas"
          />
        ) : (
          <DataTablesPMB
            columns={columnsSubjects}
            data={filteredSubjects}
            onClick={() => navigateTambahKelompokMapel()}
            onFilter={(e) => setFilterText(e.target.value)}
            filterText={filterText}
            buttontxt="Tambahkan Jadwal Pelajaran"
          />
        )}
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
