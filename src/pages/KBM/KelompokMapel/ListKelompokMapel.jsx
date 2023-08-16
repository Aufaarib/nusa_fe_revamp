import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteKelompokMapel,
  getKelompokMapel,
  updateStatusKelompokMapel,
} from "../../../api/KelompokMataPelajaran";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";
import {
  AlertDelete,
  AlertUpdateStatusAktif,
  AlertUpdateStatusNonAktif,
} from "../../../components/ModalPopUp";

export default function ListKelompokMapel() {
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("");
  const statusAktif = "Aktif";
  const statusNonAktif = "Tidak Aktif";
  const [sts, setSts] = useState(undefined);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [desc, setDesc] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.subject.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKelompokMapel(setData, setSts);
  }, []);

  const handleNonActiveStatus = (id, description) => {
    // setisOpenUpdateTidakAktif(true);
    // setStatus("Aktif");
    // setDesc(description);
    // setUpdateId(id);
    AlertUpdateStatusNonAktif(description, statusAktif, id, onUpdateStatus);
  };

  // const closeModalUpdateTidakAktif = () => {
  //   setisOpenUpdateTidakAktif(false);
  // };

  const handleActiveStatus = (id, description) => {
    // setisOpenUpdateAktif(true);
    // setStatus("Tidak Aktif");
    // setDesc(description);
    // setUpdateId(id);
    AlertUpdateStatusAktif(description, statusNonAktif, id, onUpdateStatus);
  };

  // const closeModalUpdateAktif = () => {
  //   setisOpenUpdateAktif(false);
  // };

  const onUpdateStatus = (id, status) => {
    updateStatusKelompokMapel(setSts, status, id, setData);
    // closeModalUpdateAktif();
    // closeModalUpdateTidakAktif();
    // setisOpenStatus(true);
  };

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
    deleteKelompokMapel(setSts, id, setData);
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
      name: <div>Semester</div>,
      selector: (data) => data.academicPeriode?.increment,
      cell: (data) => <div>{`Sm ${data.academicPeriode?.increment}`}</div>,
      width: "auto",
    },
    {
      name: <div>Hari</div>,
      cell: (data) => (
        <div>
          {(data.schedule.day == 1 && "Senin") ||
            (data.schedule.day == 2 && "Selasa") ||
            (data.schedule.day == 3 && "Rabu") ||
            (data.schedule.day == 4 && "Kamis") ||
            (data.schedule.day == 5 && "Jumat")}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Mapel</div>,
      selector: (data) => data.subject.name,
      cell: (data) => <div>{data.subject.name}</div>,
      width: "auto",
    },
    {
      name: <div>Ruangan Kelas</div>,
      selector: (data) => data.roomClasses?.room?.name,
      cell: (data) => <div>{data.roomClasses?.room?.name}</div>,
      width: "220px",
    },
    {
      name: <div>Jam Mulai</div>,
      selector: (data) => data.schedule.startTime,
      cell: (data) => <div>{data.schedule.startTime}</div>,
      width: "100px",
    },
    {
      name: <div>Jam Selesai</div>,
      selector: (data) => data.schedule.endTime,
      cell: (data) => <div>{data.schedule.endTime}</div>,
      width: "100px",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
      width: "90px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            onClick={() =>
              navigateUbahKelompokMapel(
                data.id,
                data.academicPeriode.id,
                data.subject.id,
                data.roomClasses?.id,
                data.academicPeriode.increment,
                data.schedule.day,
                data.subject.name,
                data.roomClasses?.room?.name,
                data.schedule.startTime,
                data.schedule.endTime,
                data.status
              )
            }
            className="btn-action-merah ml-3 w-auto px-2"
          >
            <i className="fa fa-pencil mt-1 mr-1"></i> Ubah
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "160px",
    },
  ];

  const navigate = useNavigate();

  const navigateTambahKelompokMapel = () => {
    navigate("/admin/tambah-kelompok-mapel");
  };

  const navigateUbahKelompokMapel = (
    id,
    academicPeriodeId,
    subjectId,
    roomId,
    academicPeriode,
    schedule,
    subject,
    room,
    startTime,
    endTime,
    status
  ) => {
    navigate("/admin/ubah-kelompok-mapel", {
      state: {
        id: id,
        academicPeriodeId: academicPeriodeId,
        subjectId: subjectId,
        roomId: roomId,
        academicPeriode: academicPeriode,
        day: schedule,
        subject: subject,
        room: room,
        startTime: startTime,
        endTime: endTime,
        status: status,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Bank"
        // navePrev={path}
        at="Daftar Kelompok Mapel"
        title="Daftar Kelompok Mata Pelajaran"
      />
      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKelompokMapel}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
