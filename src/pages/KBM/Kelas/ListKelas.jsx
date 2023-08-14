import { DataTables } from "../../../components/DataTables";
import { CustomStylesModalHapus } from "../../../components/CustomStyles";
import { getKelas, deleteKelas } from "../../../api/Kelas";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { AlertDelete, ModalStatusList } from "../../../components/ModalPopUp";

export default function ListKelas() {
  const [data, setData] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKelas(setData, setSts);
  }, []);

  // const openModalHapus = (id, name) => {
  //   // setisOpenDelete(true);
  //   setDesc_nama(name);
  //   setDeleteId(id);
  //   AlertDelete(name, id, onDelete);
  // };

  // const closeModalHapus = () => {
  //   setisOpenDelete(false);
  // };

  const onDelete = (id) => {
    deleteKelas(setSts, id, setData);
  };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Kelas</div>,
      selector: (data) => data.grade,
      cell: (data) => <div>{data.grade}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Kelas</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Deskripsi</div>,
      selector: (data) => data.description,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            className="btn-action-merah"
            title="Edit"
            onClick={() =>
              navigateUbahKelas(
                data.id,
                data.grade,
                data.name,
                data.description
              )
            }
          >
            <i className="fa fa-edit" /> Ubah
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "360px",
    },
  ];

  const navigate = useNavigate();

  const navigateTambahKelas = () => {
    navigate("/admin/tambah-kelas");
  };

  const navigateUbahKelas = (id, grade, name, description) => {
    navigate("/admin/ubah-kelas", {
      state: {
        id: id,
        grade: grade,
        name: name,
        description: description,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Bank"
        // navePrev={path}
        at="Kelas"
        title="List Kelas"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKelas}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
