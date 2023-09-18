import {
  AlertMessage,
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getJadwalMapel(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/course-schedule/fetch")
    .then((res) => {
      setData(res.data.data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function updateJadwalMapel(
  setSts,
  path,
  class_id,
  course_id,
  day,
  start_time,
  end_time,
  id
) {
  axios
    .post(process.env.REACT_APP_NUSA + `/course-schedule/update/${id}`, {
      class_id,
      course_id,
      day,
      start_time,
      end_time,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateDataSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function postJadwalMapel(
  setSts,
  path,
  class_id,
  course_id,
  day,
  start_time,
  end_time,
  created_by
) {
  axios
    .post(process.env.REACT_APP_NUSA + "/course-schedule/create", {
      class_id,
      course_id,
      day,
      start_time,
      end_time,
      created_by,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Guru Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Guru Gagal", "Coba Lagi", "error");
    });
}

export function deleteJadwalMapel(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/course-schedule/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getJadwalMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
