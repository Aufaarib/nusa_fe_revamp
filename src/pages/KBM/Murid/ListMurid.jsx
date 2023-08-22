import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMurid } from "../../../api/Murid";
import { Header } from "../../../components";
import { DataTablesWithoutButton } from "../../../components/DataTables";

const ListMurid = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const path = "/admin/list-murid";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.firstName.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getMurid(setData, setSts);
  }, []);

  const navigateUbahMurid = (
    code,
    firstName,
    middleName,
    lastName,
    gender,
    religion,
    birthPlace,
    birthDate,
    bloodType,
    distanceFromHome
  ) => {
    navigate("/admin/ubah-murid", {
      state: {
        code: code,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        gender: gender,
        religion: religion,
        birthPlace: birthPlace,
        birthDate: birthDate,
        bloodType: bloodType,
        distanceFromHome: distanceFromHome,
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
      width: "90px",
    },
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
    //   width: "90px",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          className="btn-action-merah"
          title="Edit"
          onClick={() =>
            navigateUbahMurid(
              data.code,
              data.firstName,
              data.middleName,
              data.lastName,
              data.gender,
              data.religion,
              data.birthPlace,
              data.birthDate,
              data.bloodType,
              data.distanceFromHome
            )
          }
        >
          <i className="fa fa-edit" /> Ubah
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "120px",
    },
  ];

  const navigateTambahGuru = () => {
    navigate("/admin/tambah-guru");
  };

  // const handleStatus = (code, description, status) => {
  //   AlertUbahStatus(description, code, status, onUpdateStatus);
  //   // setisOpenUpdateTidakAktif(true);
  //   // setStatus("Aktif");
  //   // setDesc(description);
  //   // setUpdateId(id);
  // };

  // const onUpdateStatus = (code) => {
  //   updateStatusKurikulum(setSts, code, setData);
  //   // closeModalUpdateAktif();
  //   // closeModalUpdateTidakAktif();
  //   // setisOpenStatus(true);
  // };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Bank"
        // navePrev={path}
        at="Murid"
        title="Daftar Murid"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesWithoutButton
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahGuru}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
};
export default ListMurid;
