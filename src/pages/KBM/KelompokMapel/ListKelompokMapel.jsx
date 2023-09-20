import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKelompokMapel } from "../../../api/KelompokMataPelajaran";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";

export default function ListKelompokMapel() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
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

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    // {
    //   name: <div>Semester</div>,
    //   selector: (data) => data.academicPeriode?.increment,
    //   cell: (data) => <div>{`Sm ${data.academicPeriode?.increment}`}</div>,
    //   width: "auto",
    // },
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
      width: "150px",
    },
    {
      name: <div>Ruangan Kelas</div>,
      selector: (data) => data.roomClasses?.room?.name,
      cell: (data) => <div>{data.roomClasses?.room?.name}</div>,
      width: "150px",
    },
    {
      name: <div>Jam Mulai</div>,
      selector: (data) => data.schedule.startTime,
      cell: (data) => <div>{data.schedule.startTime}</div>,
      width: "auto",
    },
    {
      name: <div>Jam Selesai</div>,
      selector: (data) => data.schedule.endTime,
      cell: (data) => <div>{data.schedule.endTime}</div>,
      width: "auto",
    },
    {
      name: <div>Guru</div>,
      selector: (data) => data.teacher?.fullname,
      cell: (data) => <div>{data.teacher?.fullname}</div>,
      width: "120px",
    },
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
    //   width: "auto",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
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
                data.teacher?.id,
                data.teacher?.fullname,
                data.status
              )
            }
          >
            <i className="fa fa-edit"></i> Edit
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
    teacherId,
    teacherName,
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
        teacherId: teacherId,
        teacherName: teacherName,
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
