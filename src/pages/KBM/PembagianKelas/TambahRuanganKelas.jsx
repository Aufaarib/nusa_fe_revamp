import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMapel } from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { AlertEmpty } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { DropdownSiswa } from "../../../components/Dropdown";
import { getTahunAjaran } from "../../../api/TahunAjaran";
import { useEffect } from "react";
import { getKelas } from "../../../api/Kelas";
import { getRoom } from "../../../api/Ruangan";
import { getGuru } from "../../../api/Guru";

export default function TambahRuanganKelas() {
  const [academicYearData, setAcademicYearData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [academicYearId, setacAdemicYearId] = useState("");
  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [statusVal, setStatus] = useState("");
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

    // const status = statusVal.value;

    if (
      name.length === 0 ||
      description.length === 0 ||
      type.length === 0
      // statusVal.length === 0 ||
      // group_course_id.length === 0
    ) {
      AlertEmpty();
    } else {
      postMapel(setSts, path, name, description, type);
      // setisOpenStatus(true);
    }
  };

  const academicYearOptions = academicYearData.map((c) => ({
    label: `${c.name} : ${c.curriculum.code}`,
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
        // prev="Bank"
        // navePrev={path}
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
            defaultValue={roomData}
            isClearable={false}
            options={roomOptions}
            isSearchable={false}
            onChange={(e) => setRoomId(e.value)}
          />
          <TextInput
            label="Kapasitas"
            type="number"
            onChange={(e) => setCapacity(e.target.value)}
            required={true}
          />
          <DropdownSiswa
            label="Wali Kelas"
            required={true}
            defaultValue={teacherData}
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
