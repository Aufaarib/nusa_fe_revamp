import {
  AlertMessage,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getClassRoom(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/classroom", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getStudentListRoom(setData, setSts, id) {
  axios
    .get(process.env.REACT_APP_BASE_URL + `/classroom/${id}/student`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getKelompokMapelRoom(setData, setSts, roomClassesId) {
  const data = [];
  axios
    .get(process.env.REACT_APP_BASE_URL + "/subject/group", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      res.data.body.forEach((element) => {
        if (element.roomClasses.id === roomClassesId) {
          data.push(element);
        }
      });
      console.log("kkkkmk === ", data);
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function postClassRoom(
  setSts,
  navigate,
  academicYearId,
  classId,
  roomId,
  capacity,
  teacherId
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/classroom`,
      {
        academicYearId,
        classId,
        roomId,
        capacity,
        teacherId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Ruangan Kelas Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Ruangan Kelas Gagal", "Coba Lagi", "error");
    });
}
export function updateClassRoom(
  setSts,
  id,
  path,
  academicYearId,
  classId,
  roomId,
  capacity,
  teacherId
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/classroom/${id}`,
      {
        academicYearId,
        classId,
        roomId,
        capacity,
        teacherId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Ruangan Kelas",
        "success",
        "Ubah Ruangan Kelas Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Ruangan Kelas Gagal", "Coba Lagi", "error");
    });
}

export function moveStudentToClassRoom(setSts, path, students, id) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/classroom/${id}/student`,
      {
        students,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Penambahan Murid Ke Kelas Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage(
        "Gagal",
        "Penambahan Murid Ke Kelas Gagal",
        "Coba Lagi",
        "error"
      );
    });
}
