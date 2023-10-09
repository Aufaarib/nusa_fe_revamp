import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getGuru(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/teacher", {
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

export function updateGuru(
  setSts,
  path,
  code,
  Fullname,
  Gender,
  Religion,
  BirthPlace,
  BirthDate
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/teacher/${code}`,
      {
        Fullname,
        Gender,
        Religion,
        BirthPlace,
        BirthDate,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Guru",
        "success",
        "Ubah Guru Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Ubah Guru Gagal", "Coba Lagi", "error");
      }
    });
}

export function postGuru(
  setSts,
  path,
  fullname,
  gender,
  religion,
  birthPlace,
  birthDate
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/teacher",
      {
        fullname,
        gender,
        religion,
        birthPlace,
        birthDate,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Guru",
        "success",
        "Tambah Guru Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Tambah Guru Gagal", "Coba Lagi", "error");
      }
    });
}
