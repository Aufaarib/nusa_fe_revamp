import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMapel } from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { DropdownSiswa } from "../../../components/Dropdown";
import { getTahunAjaran } from "../../../api/TahunAjaran";
import { useEffect } from "react";
import { getKelas } from "../../../api/Kelas";
import { getRoom } from "../../../api/Ruangan";
import { getGuru } from "../../../api/Guru";
import { postClassRoom } from "../../../api/RuanganKelas";

export default function TambahRuanganKelas() {
  const [academicYearData, setAcademicYearData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [academicYearId, setacAdemicYearId] = useState("");
  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [capacitys, setCapacity] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  const path = "/admin/list-ruang-kelas";

  const navigateRuangKelas = () => {
    navigate(path);
  };

  const fetchClass = async () => {
    getKelas(setClassData, setSts);
  };

  const fetchAcademicYear = () => {
    getTahunAjaran(setAcademicYearData, setSts);
  };

  const fetchRoom = () => {
    getRoom(setRoomData, setSts);
  };

  const fetchTeacher = () => {
    getGuru(setTeacherData, setSts);
  };

  useEffect(() => {
    fetchAcademicYear();
    fetchClass();
    fetchRoom();
    fetchTeacher();
  }, []);

  const postData = (e) => {
    e.preventDefault();

    const capacity = parseInt(capacitys);

    if (
      academicYearId === "" ||
      classId === "" ||
      roomId === "" ||
      capacitys === "" ||
      teacherId === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postClassRoom(
        setSts,
        navigateRuangKelas,
        academicYearId,
        classId,
        roomId,
        capacity,
        teacherId
      );
      // setisOpenStatus(true);
    }
  };

  const academicYearOptions = academicYearData.map((c) => ({
    label: `${c.code} : ${c.name}`,
    value: c.id,
  }));

  const classOptions = classData.map((c) => ({
    label: `${c.grade} : ${c.name}`,
    value: c.id,
  }));

  const roomOptions = roomData.map((c) => ({
    label: `${c.code} : ${c.name}`,
    value: c.id,
  }));

  const teacherOptions = teacherData.map((c) => ({
    label: `${c.code} : ${c.fullname}`,
    value: c.id,
  }));

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Ruangan Kelas"
        navPrev={path}
        at="Tambah Ruangan Kelas"
        title="Tambah Ruangan Kelas"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Ruang Kelas
        </p>
        <article>
          <DropdownSiswa
            label="Tahun Ajaran"
            required={true}
            defaultValue={academicYearId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacAdemicYearId(e.value)}
          />
          <DropdownSiswa
            label="Kelas"
            required={true}
            defaultValue={classId}
            isClearable={false}
            options={classOptions}
            isSearchable={false}
            onChange={(e) => setClassId(e.value)}
          />
          <DropdownSiswa
            label="Ruang"
            required={true}
            defaultValue={roomId}
            isClearable={false}
            options={roomOptions}
            isSearchable={false}
            onChange={(e) => setRoomId(e.value)}
          />
          <TextInput
            label="Kapasitas"
            type="number"
            defaultValue={capacitys}
            onChange={(e) => setCapacity(e.target.value)}
            required={true}
          />
          <DropdownSiswa
            label="Wali Kelas"
            required={true}
            defaultValue={teacherId}
            isClearable={false}
            options={teacherOptions}
            isSearchable={false}
            onChange={(e) => setTeacherId(e.value)}
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
              onClick={navigateRuangKelas}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
