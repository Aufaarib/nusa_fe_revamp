import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getAdmission(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission", {
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
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionDetails(
  setDataPhases,
  setData,
  setSts,
  code,
  setIsLoading
) {
  axios
    .get(process.env.REACT_APP_BASE_URL + `/admission/${code}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      setDataPhases(res.data.body.phases);
      setData(res.data.body.details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function updateStatusAdmission(setSts, code, navigate) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/admission/${code}/toggle-status`,
      null,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      // setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Kembali Ke Setup PMB",
        "success",
        "Ubah Status Pendaftar Berhasil"
      );
    })
    .catch((error) => {
      // setIsLoading(false);
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Gagal Ubah Status Pendaftar", "Tutup", "error");
      }
    });
}

export function postAdmission(
  setSts,
  path,
  academicYearId,
  name,
  increment,
  startDate,
  endDate,
  testSchedule,
  registrationAmount,
  description,
  educationAmount
  // setIsLoading
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/admission",
      {
        academicYearId: academicYearId,
        phases: [
          {
            increment: increment,
            name: name,
            startDate: startDate,
            endDate: endDate,
            amount: registrationAmount,
            testSchedule: testSchedule,
          },
        ],
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      const sequence = 1;
      axios
        .post(
          process.env.REACT_APP_BASE_URL +
            `/admission/${res.data.body.code}/detail`,
          {
            description,
            amount: educationAmount,
            sequence,
          },
          { headers: { authorization: localStorage.getItem("TOKEN") } }
        )
        .then(() => {
          // setIsLoading(false);
          setSts({ type: "success" });
          AlertStatusSuccess(
            path,
            "Berhasil",
            "Tutup",
            "success",
            "Tambah Pendaftaran Berhasil"
          );
        })
        .catch((error) => {
          // setIsLoading(false);
          setSts({ type: "error", error });
          if (error.code === "ERR_NETWORK") {
            AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
          } else {
            AlertMessage(
              "Gagal",
              "Tambah Biaya Pendidikan Gagal",
              "Coba Lagi",
              "error"
            );
          }
        });
    });
  // .catch((error) => {
  //   // setIsLoading(false);
  //   setSts({ type: "error", error });
  //   if (error.code === "ERR_NETWORK") {
  //     AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
  //   } else {
  //     AlertMessage("Gagal", "Tambah Pendaftaran Gagal", "Coba Lagi", "error");
  //   }
  // });
}
