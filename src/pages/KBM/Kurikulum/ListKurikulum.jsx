import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteKurikulum,
  getKurikulum,
  updateStatusKurikulum,
} from "../../../api/Kurikulum";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";
import { AlertUbahStatus } from "../../../components/ModalPopUp";

export default function ListKurikulum() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
  const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const path = "/admin/tambah-kurikulum";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKurikulum(setData, setSts);
  }, []);

  const handleStatus = (code, description, status) => {
    AlertUbahStatus(description, code, status, onUpdateStatus);
    // setisOpenUpdateTidakAktif(true);
    // setStatus("Aktif");
    // setDesc(description);
    // setUpdateId(id);
  };

  const onUpdateStatus = (code) => {
    updateStatusKurikulum(setSts, code, setData);
    // closeModalUpdateAktif();
    // closeModalUpdateTidakAktif();
    // setisOpenStatus(true);
  };

  const onDelete = (id) => {
    deleteKurikulum(setSts, id, setData);
    // closeModalHapus();
    // setisOpenStatus(true);
  };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Code</div>,
      selector: (data) => data.code,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "230px",
    },
    {
      name: <div>Deskripsi</div>,
      selector: (data) => data.description,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    // {
    //   name: <div>Semester</div>,
    //   selector: (data) => data.semester_id,
    //   cell: (data) => <div>{data.semester_id}</div>,
    //   width: "auto",
    // },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            onClick={() =>
              navigateUbahKurikulum(
                data.id,
                data.code,
                data.name,
                data.description,
                data.semester_id
              )
            }
            className="btn-action-merah ml-3 w-auto px-2"
          >
            <i className="fa fa-edit mt-1 mr-1"></i> Ubah
          </button>
          {data?.status === 1 && (
            <button
              className="btn-action-merah ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.name, data.status)}
            >
              <i className="fa fa-play mt-1 mr-1"></i> Aktif
            </button>
          )}
          {data?.status === 0 && (
            <button
              className="btn-action-merah ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.name, data.status)}
            >
              <i className="fa fa-pause mt-1 mr-1"></i> Tidak Aktif
            </button>
          )}
          {/* <button
            style={{ fontSize: "14px" }}
            onClick={() => openModalHapus(data.id, data.name)}
            className="btn-mrh ml-3"
          >
            <i className="fa fa-trash mt-1 mr-1"></i> Hapus
          </button> */}
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "200px",
    },
  ];

  const navigateTambahKurikulum = () => {
    navigate(path);
  };

  const navigateUbahKurikulum = (id, code, name, description, semester_id) => {
    navigate("/admin/ubah-kurikulum", {
      state: {
        id: id,
        code: code,
        name: name,
        description: description,
        semester_id: semester_id,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Kelompok Mapel"
        // navePrev={path}
        at="Daftar Kurikulum"
        title="Daftar Kurikulum"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKurikulum}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
