import {
  AlertMessage,
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKurikulum(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/curriculum", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log(res.data.body);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function updateKurikulum(setSts, path, code, name, description) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/curriculum/${code}`,
      {
        name,
        description,
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
        "Ubah Kurikulum Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Kurikulum Gagal", "Coba Lagi", "error");
    });
}

export function updateStatusKurikulum(setSts, code, setData) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/curriculum/${code}/toggle-status`,
      null,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertMessage("Berhasil", "Ubah Status Berhasil", "Tutup", "success");
      getKurikulum(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Status Gagal", "Tutup", "error");
    });
}

export function postKurikulum(setSts, path, name, description) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/curriculum",
      {
        name,
        description,
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
        "Tambah Kurikulum Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Kurikulum Gagal", "Coba Lagi", "error");
    });
}

export function deleteKurikulum(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/curriculum/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getKurikulum(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
