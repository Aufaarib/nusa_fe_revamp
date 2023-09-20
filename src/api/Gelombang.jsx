import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function updateAdmissionPhase(
  setSts,
  navigate,
  id,
  code,
  increment,
  name,
  startDate,
  endDate,
  testSchedule,
  amount
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/admission/${code}/phase/${id}`,
      {
        increment,
        name,
        startDate,
        endDate,
        testSchedule,
        amount,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Kembali Ke Detail Pendaftaran",
        "success",
        "Ubah Gelombang Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Gelombang Gagal", "Coba Lagi", "error");
    });
}

export function postAdmissionPhase(
  setSts,
  navigate,
  code,
  increment,
  name,
  startDate,
  endDate,
  testSchedule,
  amount
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/admission/${code}/phase`,
      {
        increment,
        name,
        startDate,
        endDate,
        testSchedule,
        amount,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Gelombang Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Gelombang Gagal", "Coba Lagi", "error");
    });
}
