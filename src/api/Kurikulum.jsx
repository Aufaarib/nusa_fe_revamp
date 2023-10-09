import {
  AlertMessage,
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKurikulum(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/curriculum", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          error.response.data.status.message,
          "Coba Lagi",
          "error"
        );
      }
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
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          error.response.data.status.message,
          "Coba Lagi",
          "error"
        );
      }
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
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          error.response.data.status.message,
          "Coba Lagi",
          "error"
        );
      }
    });
}

export function postKurikulum(path, name, description) {
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
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Kurikulum Berhasil"
      );
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        if (error.code === "ERR_NETWORK") {
          AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
        } else {
          AlertMessage(
            "Gagal",
            error.response.data.status.message,
            "Coba Lagi",
            "error"
          );
        }
      }
    });
}
