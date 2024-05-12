import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

// export function getAdmissionStatement(setData, setSts) {
//   axios
//     .get(process.env.REACT_APP_BASE_URL + "/admission/statement", {
//       headers: { authorization: localStorage.getItem("TOKEN") },
//     })
//     .then((res) => {
//       setData(res.data.body);
//       setSts({ type: "success" });
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       if (error.code === "ERR_NETWORK") {
//         AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
//       }
//     });
// }

export function updateAdmissionStatement(setSts, navigate, id, question) {
  axios
    .put(
      process.env.REACT_APP_NUSA + `/admission/statement/${id}`,
      {
        question,
      },
      {
        headers: {
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
        "Tambah Pilihan Jawaban Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function postAdmissionStatement(setSts, navigate, question) {
  axios
    .post(
      process.env.REACT_APP_NUSA + "/admission/statement",
      {
        question,
      },
      {
        headers: {
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
        "Tambah Pertanyaan Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
