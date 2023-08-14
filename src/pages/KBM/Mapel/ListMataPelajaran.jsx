import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteMapel,
  getMapel,
  updateStatusMapel,
} from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";
import {
  AlertDelete,
  AlertUpdateStatusAktif,
  AlertUpdateStatusNonAktif,
} from "../../../components/ModalPopUp";

export default function ListMataPelajaran() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  const [isOpenUpdateTidakAktif, setisOpenUpdateTidakAktif] = useState(false);
  const [isOpenUpdateAktif, setisOpenUpdateAktif] = useState(false);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [filterText, setFilterText] = useState("");

  const navigate = useNavigate();

  const path = "/admin/tambah-mata-pelajaran";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getMapel(setData, setSts);
  }, []);

  // const handleNonActiveStatus = (id, course_name) => {
  //   // setisOpenUpdateTidakAktif(true);
  //   // setStatus("Aktif");
  //   // setDesc(course_name);
  //   // setUpdateId(id);
  //   AlertUpdateStatusNonAktif(course_name, statusAktif, id, onUpdateStatus);
  // };

  // // const closeModalUpdateTidakAktif = () => {
  // //   setisOpenUpdateTidakAktif(false);
  // // };

  // const handleActiveStatus = (id, course_name) => {
  //   // setisOpenUpdateAktif(true);
  //   // setStatus("Tidak Aktif");
  //   // setDesc(course_name);
  //   // setUpdateId(id);
  //   AlertUpdateStatusAktif(course_name, statusNonAktif, id, onUpdateStatus);
  // };

  // const closeModalUpdateAktif = () => {
  //   setisOpenUpdateAktif(false);
  // };

  // const onUpdateStatus = (id, status) => {
  //   updateStatusMapel(setSts, status, id, setData);
  //   // closeModalUpdateAktif();
  //   // closeModalUpdateTidakAktif();
  //   // setisOpenStatus(true);
  // };

  // const openModalHapus = (id, course_name) => {
  //   // setisOpenDelete(true);
  //   setDesc_nama(course_name);
  //   setDeleteId(id);
  //   AlertDelete(course_name, id, onDelete);
  // };

  // const closeModalHapus = () => {
  //   setisOpenDelete(false);
  // };

  // const onDelete = (id) => {
  //   deleteMapel(setSts, id, setData);
  //   // closeModalHapus();
  //   // setisOpenStatus(true);
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   getMapel(setData, setSts);
  //   setSts("");
  // };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Name</div>,
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
      name: <div>Tipe</div>,
      selector: (data) => data.type,
      cell: (data) => <div>{data.type}</div>,
      width: "auto",
    },
    // {
    //   name: <div>Deskripsi</div>,
    //   selector: (data) => data.description,
    //   cell: (data) => <div>{data.description}</div>,
    //   width: "auto",
    // },
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => <div>{data.status}</div>,
    //   width: "auto",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ fontSize: "14px" }}
            onClick={() =>
              navigateUbahMapel(
                data.code,
                data.name,
                data.description,
                data.type
              )
            }
            className="btn-mrh"
          >
            <i className="fa fa-pencil mt-1 mr-1"></i> Ubah
          </button>
          {/* {data?.status === "Aktif" && (
            <button
              className="btn-mrh ml-3 w-auto px-2"
              onClick={() => handleActiveStatus(data.id, data.course_name)}
            >
              <i className="fa fa-play mt-1 mr-1"></i> {data.status}
            </button>
          )}
          {data?.status === "Tidak Aktif" && (
            <button
              className="btn-mrh ml-3 w-auto px-2"
              onClick={() => handleNonActiveStatus(data.id, data.course_name)}
            >
              <i className="fa fa-pause mt-1 mr-1"></i> {data.status}
            </button>
          )} */}
          {/* <button
            style={{ fontSize: "14px" }}
            onClick={() => openModalHapus(data.id, data.course_name)}
            className="btn-mrh ml-3"
          >
            <i className="fa fa-trash mt-1 mr-1"></i> Hapus
          </button> */}
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "360px",
    },
  ];

  const navigateTambahMataPelajaran = () => {
    navigate(path);
  };

  const navigateUbahMapel = (
    id,
    course_name,
    code,
    group_course_id,
    description
  ) => {
    navigate("/admin/ubah-mata-pelajaran", {
      state: {
        id: id,
        course_name: course_name,
        code: code,
        group_course_id: group_course_id,
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
        at="Mata Pelajaran"
        title="List Mata Pelajaran"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahMataPelajaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
