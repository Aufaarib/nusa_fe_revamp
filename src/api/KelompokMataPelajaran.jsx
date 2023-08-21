import {
  AlertMessage,
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKelompokMapel(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/subject/group", {
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

export function updateStatusKelompokMapel(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_BASE_URL + `/group-course/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getKelompokMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function updateKelompokMapel(
  setStatus,
  id,
  path,
  academicPeriodeId,
  subjectId,
  roomClassId,
  day,
  teacherId,
  startTime,
  endTime
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/subject/group/${id}`,
      {
        academicPeriodeId,
        subjectId,
        roomClassId,
        day,
        teacherId,
        startTime,
        endTime,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah Kelompok Mata Pelajaran Berhasil"
      );
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertMessage(
        "Gagal",
        "Ubah Kelompok Mata Pelajaran Gagal",
        "Coba Lagi",
        "error"
      );
    });
}

export function postKelompokMapel(
  setStatus,
  path,
  academicPeriodeId,
  subjectId,
  roomClassId,
  teacherId,
  day,
  startTime,
  endTime
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/subject/group",
      {
        academicPeriodeId,
        subjectId,
        roomClassId,
        teacherId,
        day,
        startTime,
        endTime,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Kelompok Mata Pelajaran Berhasil"
      );
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertMessage(
        "Gagal",
        "Tambah Kelompok Mata Pelajaran Gagal",
        "Coba Lagi",
        "error"
      );
    });
}

export function deleteKelompokMapel(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/group-course/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getKelompokMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
