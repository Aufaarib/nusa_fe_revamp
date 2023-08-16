import React from "react";
import TextInput from "../../../components/TextInput";
import { DropdownSiswa, DropdownStatus } from "../../../components/Dropdown";
import { postKelompokMapel } from "../../../api/KelompokMataPelajaran";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertEmpty } from "../../../components/ModalPopUp";
import { Header } from "../../../components";
import { useEffect } from "react";
import { getMapel } from "../../../api/MataPelajaran";
import { getClassRoom } from "../../../api/RuanganKelas";
import { getSemester, getTahunAjaran } from "../../../api/TahunAjaran";

export default function TambahKelompokMapel() {
  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [classRoomData, setClassRoomData] = useState([]);
  const [academicPeriodeId, setacademicPeriodeId] = useState("");
  const [subjectId, setacSubjectId] = useState("");
  const [classRoomId, setClassRoomId] = useState("");
  const [day, setDay] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [statusVal, setStatus] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const path = "/admin/list-kelompok-mapel";

  const fetchAcademicPeriode = () => {
    getSemester(setAcademicPeriodeData, setSts);
  };

  console.log("TESSSSSSSS === ", academicPeriodeData);

  const fetchSubject = () => {
    getMapel(setSubjectData, setSts);
  };

  const fetchClassRoom = () => {
    getClassRoom(setClassRoomData, setSts);
  };

  useEffect(() => {
    fetchAcademicPeriode();
    fetchSubject();
    fetchClassRoom();
  }, []);

  const postData = (e) => {
    e.preventDefault();

    if (
      academicPeriodeId === "" ||
      subjectId === "" ||
      classRoomId === "" ||
      day === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      AlertEmpty();
    } else {
      postKelompokMapel(
        setSts,
        path,
        academicPeriodeId,
        subjectId,
        classRoomId,
        day,
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
        at="Tambah Kelompok Mata Pelajaran"
        title="Tambah Kelompok Mata Pelajaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Kelompok Mata Pelajaran
        </p>
        <article>
          <DropdownSiswa
            label="Semester"
            required={true}
            defaultValue={academicPeriodeId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacademicPeriodeId(e.value)}
          />
          <DropdownSiswa
            label="Hari"
            required={true}
            defaultValue={day}
            isClearable={false}
            options={dayOptions}
            isSearchable={false}
            onChange={(e) => setDay(e.value)}
          />
          <DropdownSiswa
            label="Mata Pelajaran"
            required={true}
            defaultValue={subjectId}
            isClearable={false}
            options={subjectOptions}
            isSearchable={false}
            onChange={(e) => setacSubjectId(e.value)}
          />
          <DropdownSiswa
            label="Ruangan Kelas"
            required={true}
            defaultValue={classRoomId}
            isClearable={false}
            options={classRoomOptions}
            isSearchable={false}
            onChange={(e) => setClassRoomId(e.value)}
          />
          <TextInput
            label="Jam Mulai"
            type="text"
            placeholder={"07:20"}
            onChange={(e) => setStartTime(e.target.value)}
            required={true}
          />
          <TextInput
            label="Jam Selesai"
            type="text"
            placeholder={"08:20"}
            onChange={(e) => setEndTime(e.target.value)}
            required={true}
          />
          <DropdownStatus
            label="Status"
            required={true}
            isClearable={true}
            defaultValue={statusVal}
            isSearchable={false}
            onChange={setStatus}
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
