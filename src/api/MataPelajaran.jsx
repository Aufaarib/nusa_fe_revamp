import {
  AlertMessage,
  AlertStatusSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getMapel(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/subject", {
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

export function updateStatusMapel(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_NUSA + `/course/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function updateMapel(setSts, code, path, name, description, type) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/subject/${code}`,
      {
        name,
        description,
        type,
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
        "Kembali Ke Halaman Mata Pelajaran",
        "success",
        "Ubah Mata Pelajaran Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage(
        "Gagal",
        "Ubah Mata Pelajaran Berhasil",
        "Coba Lagi",
        "error"
      );
    });
}

export function postMapel(setSts, path, name, description, type) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/subject",
      {
        name,
        description,
        type,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Mata Pelajaran",
        "success",
        "Tambah Mata Pelajaran Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage(
        "Gagal",
        "Tambah Mata Pelajaran Gagal",
        "Coba Lagi",
        "error"
      );
    });
}
