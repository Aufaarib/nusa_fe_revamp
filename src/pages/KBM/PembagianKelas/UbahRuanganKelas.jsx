import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGuru } from "../../../api/Guru";
import { getKelas } from "../../../api/Kelas";
import { getRoom } from "../../../api/Ruangan";
import { getTahunAjaran } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DropdownSiswa } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { updateClassRoom } from "../../../api/RuanganKelas";

export default function UbahRuanganKelas() {
  const navigate = useNavigate();
  const location = useLocation();
  const [academicYearData, setAcademicYearData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [academicYearIds, setacAdemicYearId] = useState({
    value: location.state.tahunAjaranId,
    label: location.state.tahunAjaran,
  });
  const [classIds, setClassId] = useState({
    value: location.state.kelasId,
    label: location.state.kelas,
  });
  const [teacherIds, setTeacherId] = useState({
    value: location.state.waliKelasId,
    label: location.state.waliKelas,
  });
  const [roomIds, setRoomId] = useState({
    value: location.state.ruanganId,
    label: location.state.ruangan,
  });
  const [capacitys, setCapacity] = useState(location.state.kapasitas);
  const [sts, setSts] = useState(undefined);
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
    const id = location.state.id;

    if (
      academicYearIds === "" ||
      classIds === "" ||
      roomIds === "" ||
      capacitys === "" ||
      teacherIds === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      const academicYearId = academicYearIds.value;
      const classId = classIds.value;
      const roomId = roomIds.value;
      const teacherId = teacherIds.value;

      updateClassRoom(
        setSts,
        id,
        navigateRuangKelas,
        academicYearId,
        classId,
        roomId,
        capacity,
        teacherId
      );
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
        at="Ubah Ruangan Kelas"
        title="Ubah Ruangan Kelas"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Ruang Kelas
        </p>
        <article>
          <DropdownSiswa
            label="Tahun Ajaran"
            required={true}
            defaultValue={academicYearIds}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={setacAdemicYearId}
          />
          <DropdownSiswa
            label="Kelas"
            required={true}
            defaultValue={classIds}
            isClearable={false}
            options={classOptions}
            isSearchable={false}
            onChange={setClassId}
          />
          <DropdownSiswa
            label="Ruang"
            required={true}
            defaultValue={roomIds}
            isClearable={false}
            options={roomOptions}
            isSearchable={false}
            onChange={setRoomId}
          />
          <TextInput
            label="Kapasitas"
            type="number"
            defaultValue={capacitys}
            onChange={setCapacity}
            required={true}
          />
          <DropdownSiswa
            label="Wali Kelas"
            required={true}
            defaultValue={teacherIds}
            isClearable={false}
            options={teacherOptions}
            isSearchable={false}
            onChange={setTeacherId}
          />

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
