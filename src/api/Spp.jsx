import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getSpp(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/spp", {
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
export function getUnpaidSpp(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/spp/unpaid", {
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

export function postSpp(setSts, navigate, formData, setIsLoading) {
  axios
    .post(process.env.REACT_APP_BASE_URL + "/spp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setIsLoading(false);
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
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

export function updateSpp(setSts, navigate, formData, id, setIsLoading) {
  axios
    .put(process.env.REACT_APP_BASE_URL + `/spp/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setIsLoading(false);
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
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
