import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getPengeluaran(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/spending", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
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
      ErrorHandling(error);
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
      ErrorHandling(error);
    });
}
