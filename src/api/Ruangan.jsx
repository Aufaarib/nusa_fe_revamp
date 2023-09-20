import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getRoom(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/room", {
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

export function updateRoom(setSts, path, code, name, description) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/room/${code}`,
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
        "Kembali Ke Halaman Ruangan",
        "success",
        "Ubah Ruangan Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Ruangan Gagal", "Coba Lagi", "error");
    });
}

export function postRoom(setSts, path, name, description) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/room",
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
        "Kembali Ke Halaman Ruangan",
        "success",
        "Tambah Ruangan Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Ruangan Gagal", "Coba Lagi", "error");
    });
}
