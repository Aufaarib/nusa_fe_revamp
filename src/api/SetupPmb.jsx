import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getAdmission(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission", {
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

export function getAdmissionDetails(setDataPhases, setData, setSts, code) {
  axios
    .get(process.env.REACT_APP_BASE_URL + `/admission/${code}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setDataPhases(res.data.body.phases);
      setData(res.data.body.details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
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
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Gagal Ubah Status Pendaftar", "Tutup", "error");
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
  registrationAmount,
  description,
  educationAmount
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
          },
        ],
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      // setSts({ type: "success" });
      // AlertStatusSuccess(
      //   path,
      //   "Berhasil",
      //   "Tutup",
      //   "success",
      //   "Tambah Pendaftaran Berhasil"
      // );
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
          setSts({ type: "error", error });
          AlertMessage(
            "Gagal",
            "Tambah Biaya Pendidikan Gagal",
            "Coba Lagi",
            "error"
          );
        });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Pendaftaran Gagal", "Coba Lagi", "error");
    });
}

// export function postAdmissionDetail(
//   setSts,
//   path,
//   academicYearId,
//   name,
//   increment,
//   startDate,
//   endDate,
//   amount,
//   code
// ) {
//   axios
//     .post(
//       process.env.REACT_APP_BASE_URL + `/admission/${code}/detail`,
//       {
//         academicYearId: academicYearId,
//         phases: [
//           {
//             increment: increment,
//             name: name,
//             startDate: startDate,
//             endDate: endDate,
//             amount: amount,
//           },
//         ],
//       },
//       { headers: { authorization: localStorage.getItem("TOKEN") } }
//     )
//     .then(() => {
//       setSts({ type: "success" });
//       AlertStatusSuccess(
//         path,
//         "Berhasil",
//         "Tutup",
//         "success",
//         "Tambah Pendaftaran Berhasil"
//       );
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       AlertMessage("Gagal", "Tambah Pendaftaran Gagal", "Coba Lagi", "error");
//     });
// }
