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
  amount,
  educationAmount,
  description,
  eduId
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
      const sequence = 1;
      axios
        .put(
          process.env.REACT_APP_BASE_URL + `/admission/${code}/detail/${eduId}`,
          {
            description,
            amount: educationAmount,
            sequence,
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
          if (error.code === "ERR_NETWORK") {
            AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
          } else {
            AlertMessage(
              "Gagal",
              "Ubah Gelombang Gagal, Silahkan Coba Lagi",
              "Coba Lagi",
              "error"
            );
          }
        });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Ubah Gelombang Gagal, Silahkan Coba Lagi",
          "Coba Lagi",
          "error"
        );
      }
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
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Tambah Gelombang Gagal", "Coba Lagi", "error");
      }
    });
}
