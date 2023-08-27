import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGuru } from "../../../api/Guru";
import { updateKelompokMapel } from "../../../api/KelompokMataPelajaran";
import { getMapel } from "../../../api/MataPelajaran";
import { getClassRoom } from "../../../api/RuanganKelas";
import { getSemester } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import {
  DropdownKurikulum,
  DropdownSiswa,
  DropdownStatus,
} from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahKelompokMapel() {
  const location = useLocation();

  const id = location.state.id;
  const smesterId = location.state.academicPeriodeId;
  const MapelId = location.state.subjectId;
  const roomId = location.state.roomId;
  const guruId = location.state.teacherId;
  const smester = location.state.academicPeriode;
  const hari = location.state.day;
  const mapel = location.state.subject;
  const room = location.state.room;
  const guru = location.state.teacherName;
  const start = location.state.startTime;
  const end = location.state.endTime;
  const stats = location.state.status;

  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [classRoomData, setClassRoomData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [academicPeriodeIds, setacademicPeriodeId] = useState({
    label: `Semester ${smester}`,
    value: smesterId,
  });
  const [subjectIds, setaSubjectId] = useState({
    label: mapel,
    value: MapelId,
  });
  const [roomClassIds, setClassRoomId] = useState({
    label: room,
    value: roomId,
  });
  const [days, setDay] = useState({ value: hari, label: `Hari Ke ${hari}` });
  const [startTime, setStartTime] = useState(start);
  const [endTime, setEndTime] = useState(end);
  const [teacherIds, setTeacherId] = useState({
    label: guru,
    value: guruId,
  });
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
      academicPeriodeIds === "" ||
      subjectIds === "" ||
      roomClassIds === "" ||
      days === "" ||
      teacherIds === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      const academicPeriodeId = academicPeriodeIds.value;
      const subjectId = subjectIds.value;
      const roomClassId = roomClassIds.value;
      const day = days.value;
      const teacherId = teacherIds.value;

      updateKelompokMapel(
        setSts,
        id,
        navigateKelompokMapel,
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

  const academicPeriodeOptions = academicPeriodeData.map((c) => ({
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
          <DropdownKurikulum
            label="Semester"
            required={true}
            isClearable={true}
            defaultValue={academicPeriodeIds}
            isSearchable={false}
            options={academicPeriodeOptions}
            onChange={setacademicPeriodeId}
          />
          {/* <DropdownSiswa
            label="Semester"
            required={true}
            defaultValue={smesterId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacademicPeriodeId(e.value)}
            // placeholder={`Sm ${smester}`}
          /> */}
          <DropdownKurikulum
            label="Hari"
            required={true}
            isClearable={true}
            defaultValue={days}
            isSearchable={false}
            options={dayOptions}
            onChange={setDay}
          />
          {/* <DropdownSiswa
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
          /> */}
          <DropdownKurikulum
            label="Mata Pelajaran"
            required={true}
            isClearable={true}
            defaultValue={subjectIds}
            isSearchable={false}
            options={subjectOptions}
            onChange={setaSubjectId}
          />
          {/* <DropdownSiswa
            label="Mata Pelajaran"
            required={true}
            defaultValue={MapelId}
            isClearable={false}
            options={subjectOptions}
            isSearchable={false}
            onChange={(e) => setacSubjectId(e.value)}
            // placeholder={mapel}
          /> */}
          <DropdownKurikulum
            label="Ruangan Kelas"
            required={true}
            isClearable={true}
            defaultValue={roomClassIds}
            isSearchable={false}
            options={classRoomOptions}
            onChange={setClassRoomId}
          />
          {/* <DropdownSiswa
            label="Ruangan Kelas"
            required={true}
            defaultValue={roomId}
            isClearable={false}
            options={classRoomOptions}
            isSearchable={false}
            onChange={(e) => setClassRoomId(e.value)}
            // placeholder={room}
          /> */}
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
          <DropdownKurikulum
            label="Guru"
            required={true}
            isClearable={true}
            defaultValue={teacherIds}
            isSearchable={false}
            options={teacherOptions}
            onChange={setTeacherId}
          />
          {/* <DropdownSiswa
            label="Guru"
            required={true}
            defaultValue={teacherId}
            isClearable={false}
            options={teacherOptions}
            isSearchable={false}
            onChange={(e) => setTeacherId(e.value)}
          /> */}
          {/* <DropdownStatus
            label="Status"
            required={true}
            isClearable={true}
            defaultValue={status}
            isSearchable={false}
            onChange={setStatus}
            // placeholder={status == 1 ? "Aktif" : "Non-Aktif"}
          /> */}

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
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
