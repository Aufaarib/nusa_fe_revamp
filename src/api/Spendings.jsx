import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getPengeluaran(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/spending", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function postPengeluaran(setSts, navigate, formData) {
  axios
    .post(process.env.REACT_APP_BASE_URL + "/spending", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Pendaftaran Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Tambah Pendaftaran Gagal", "Coba Lagi", "error");
      }
    });
}

export function updatePengeluaran(setSts, navigate, formData, id) {
  axios
    .put(process.env.REACT_APP_BASE_URL + `/spending/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah Pendaftaran Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Ubah Pendaftaran Gagal", "Coba Lagi", "error");
      }
    });
}
