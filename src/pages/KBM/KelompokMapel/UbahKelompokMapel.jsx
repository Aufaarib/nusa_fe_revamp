import React from "react";
import TextInput from "../../../components/TextInput";
import { DropdownSiswa, DropdownStatus } from "../../../components/Dropdown";
import {
  postKelompokMapel,
  updateKelompokMapel,
} from "../../../api/KelompokMataPelajaran";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import { Header } from "../../../components";
import { useEffect } from "react";
import { getMapel } from "../../../api/MataPelajaran";
import { getClassRoom } from "../../../api/RuanganKelas";
import { getSemester, getTahunAjaran } from "../../../api/TahunAjaran";
import { getGuru } from "../../../api/Guru";

export default function UbahKelompokMapel() {
  const location = useLocation();

  const id = location.state.id;
  const smesterId = location.state.academicPeriodeId;
  const MapelId = location.state.subjectId;
  const roomId = location.state.roomId;
  const smester = location.state.academicPeriode;
  const hari = location.state.day;
  const mapel = location.state.subject;
  const room = location.state.room;
  const start = location.state.startTime;
  const end = location.state.endTime;
  const stats = location.state.status;

  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [classRoomData, setClassRoomData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [academicPeriodeId, setacademicPeriodeId] = useState({
    value: smesterId,
    label: smester,
  });
  const [subjectId, setacSubjectId] = useState({
    value: MapelId,
    label: mapel,
  });
  const [roomClassId, setClassRoomId] = useState({
    value: roomId,
    label: room,
  });
  const [day, setDay] = useState(hari);
  const [startTime, setStartTime] = useState({
    value: start,
    label: start,
  });
  const [endTime, setEndTime] = useState({ value: end, label: end });
  const [teacherId, setTeacherId] = useState();
  const [status, setStatus] = useState(stats);
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const path = "/admin/list-kelompok-mapel";

  const fetchAcademicPeriode = () => {
    getSemester(setAcademicPeriodeData, setSts);
  };

  const fetchSubject = () => {
    getMapel(setSubjectData, setSts);
  };

  const fetchClassRoom = () => {
    getClassRoom(setClassRoomData, setSts);
  };

  const fetchTeacher = () => {
    getGuru(setTeacherData, setSts);
  };

  useEffect(() => {
    fetchAcademicPeriode();
    fetchSubject();
    fetchClassRoom();
    fetchTeacher();
  }, []);

  const postData = (e) => {
    e.preventDefault();

    if (
      academicPeriodeId === "" ||
      subjectId === "" ||
      roomClassId === "" ||
      day === "" ||
      teacherId === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateKelompokMapel(
        setSts,
        id,
        path,
        academicPeriodeId,
        subjectId,
        roomClassId,
        day,
        teacherId,
        startTime,
        endTime
      );
    }
  };

  const navigateKelompokMapel = () => {
    navigate(path);
  };

  const academicYearOptions = academicPeriodeData.map((c) => ({
    label: `Semester : ${c.increment}`,
    value: c.id,
  }));

  const subjectOptions = subjectData.map((c) => ({
    label: `${c.code} : ${c.name}`,
    value: c.id,
  }));

  const classRoomOptions = classRoomData.map((c) => ({
    label: `${c.room.name}`,
    value: c.id,
  }));

  const teacherOptions = teacherData.map((c) => ({
    label: c.fullname,
    value: c.id,
  }));

  const dayOptions = [
    { value: 1, label: "Senin" },
    { value: 2, label: "Selasa" },
    { value: 3, label: "Rabu" },
    { value: 4, label: "Kamis" },
    { value: 5, label: "Jumat" },
  ];

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Kelompok Mapel"
        navePrev={path}
        at="Ubah Kelompok Mata Pelajaran"
        title="Ubah Kelompok Mata Pelajaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Kelompok Mata Pelajaran
        </p>
        <article>
          <DropdownSiswa
            label="Semester"
            required={true}
            defaultValue={smesterId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacademicPeriodeId(e.value)}
            // placeholder={`Sm ${smester}`}
          />
          <DropdownSiswa
            label="Hari"
            required={true}
            defaultValue={day}
            isClearable={false}
            options={dayOptions}
            isSearchable={false}
            onChange={(e) => setDay(e.value)}
            // placeholder={
            //   (hari == 1 && "Senin") ||
            //   (hari == 2 && "Selasa") ||
            //   (hari == 3 && "Rabu") ||
            //   (hari == 4 && "Kamis") ||
            //   (hari == 5 && "Jumat")
            // }
          />
          <DropdownSiswa
            label="Mata Pelajaran"
            required={true}
            defaultValue={MapelId}
            isClearable={false}
            options={subjectOptions}
            isSearchable={false}
            onChange={(e) => setacSubjectId(e.value)}
            // placeholder={mapel}
          />
          <DropdownSiswa
            label="Ruangan Kelas"
            required={true}
            defaultValue={roomId}
            isClearable={false}
            options={classRoomOptions}
            isSearchable={false}
            onChange={(e) => setClassRoomId(e.value)}
            // placeholder={room}
          />
          <TextInput
            label="Jam Mulai"
            type="text"
            defaultValue={startTime}
            // placeholder={"07:20"}
            onChange={(e) => setStartTime(e.target.value)}
            required={true}
          />
          <TextInput
            label="Jam Selesai"
            type="text"
            defaultValue={endTime}
            // placeholder={"08:20"}
            onChange={(e) => setEndTime(e.target.value)}
            required={true}
          />
          <DropdownSiswa
            label="Guru"
            required={true}
            defaultValue={teacherId}
            isClearable={false}
            options={teacherOptions}
            isSearchable={false}
            onChange={(e) => setTeacherId(e.value)}
          />
          <DropdownStatus
            label="Status"
            required={true}
            isClearable={true}
            defaultValue={status}
            isSearchable={false}
            onChange={setStatus}
            // placeholder={status == 1 ? "Aktif" : "Non-Aktif"}
          />

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Tambah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateKelompokMapel}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
