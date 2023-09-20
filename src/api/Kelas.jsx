import {
  AlertMessage,
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKelas(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/classes", {
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

export function updateKelas(setSts, path, grade, name, description, id) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/classes/${id}`,
      {
        grade,
        name,
        description,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Kelas",
        "success",
        "Ubah Kelas Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Kelas Gagal", "Coba Lagi", "error");
    });
}

export function postKelas(setSts, path, grade, name, description) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/classes",
      {
        grade,
        name,
        description,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Kelas",
        "success",
        "Tambah Kelas Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Kelas Gagal", "Coba Lagi", "error");
    });
}
