import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getSpp(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/spp", {
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

export function postSpp(
  setSts,
  navigate,
  amount,
  month,
  description,
  invoice,
  periodeId,
  studentCode
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/spp",
      {
        amount,
        month,
        description,
        invoice,
        periodeId,
        studentCode,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah SPP Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah SPP Gagal", "Coba Lagi", "error");
    });
}

export function updateSpp(
  setSts,
  navigate,
  amount,
  month,
  description,
  invoice,
  periodeId,
  studentCode,
  id
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/spp/${id}`,
      {
        amount,
        month,
        description,
        invoice,
        periodeId,
        studentCode,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah SPP Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah SPP Gagal", "Coba Lagi", "error");
    });
}
