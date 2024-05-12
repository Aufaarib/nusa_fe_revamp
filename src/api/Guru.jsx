import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getGuru(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/teacher", {
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

export function updateGuru(
  setSts,
  path,
  code,
  Fullname,
  Gender,
  Religion,
  BirthPlace,
  BirthDate,
  setIsLoading
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
      setIsLoading(false);
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
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

export function postGuru(
  setSts,
  path,
  fullname,
  gender,
  religion,
  birthPlace,
  birthDate,
  setIsLoading
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
      setIsLoading(false);
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
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
