import {
  AlertMessage,
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getGuru(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/teacher", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });

  // axios
  //     .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank")
  //     .then((res) => {
  //     setData(res.data);
  //     setSts({ type: 'success' });
  //     })
  //     .catch((error) => {
  //     setSts({ type: 'error', error });
  //     });
}

export function updateGuru(
  setSts,
  path,
  code,
  Fullname,
  Gender,
  Religion,
  BirthPlace,
  BirthDate
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
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah Guru Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Guru Gagal", "Coba Lagi", "error");
    });
}

// export function updateStatusKurikulum(setSts, code, setData) {
//   axios
//     .put(
//       process.env.REACT_APP_BASE_URL + `/curriculum/${code}/toggle-status`,
//       null,
//       {
//         headers: { authorization: localStorage.getItem("TOKEN") },
//       }
//     )
//     .then(() => {
//       setSts({ type: "success" });
//       AlertStatusUpdateSuccess();
//       getKurikulum(setData, setSts);
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       AlertStatusUpdateFailed();
//     });
// }

export function postGuru(
  setSts,
  path,
  fullname,
  gender,
  religion,
  birthPlace,
  birthDate
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
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Guru Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Guru Gagal", "Coba Lagi", "error");
    });
}
