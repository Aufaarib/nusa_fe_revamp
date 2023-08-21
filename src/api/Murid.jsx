import {
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getMurid(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/student", {
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

export function getMuridNotRegisteredToClass(setData, setSts) {
  const data = [];
  axios
    .get(process.env.REACT_APP_BASE_URL + "/student", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      res.data.body.forEach((element) => {
        if (element.inRoomClasses == 0) {
          data.push(element);
        }
      });
      // setData(data);
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function updateMurid(
  setSts,
  path,
  code,
  religion,
  firstName,
  middleName,
  lastName,
  birthPlace,
  birthDate,
  gender,
  bloodType,
  distanceFromHome,
  status
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/student/${code}`,
      {
        religion,
        firstName,
        middleName,
        lastName,
        birthPlace,
        birthDate,
        gender,
        bloodType,
        distanceFromHome,
        status,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateDataSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
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
  const code = localStorage.getItem("CODE");
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
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusTambahFailed();
    });
}

// export function deleteKurikulum(setSts, deleteId, setData) {
//   axios
//     .delete(process.env.REACT_APP_NUSA + `/curriculum/delete/${deleteId}`)
//     .then(() => {
//       setSts({ type: "success" });
//       AlertStatusHapusSuccess();
//       getKurikulum(setData, setSts);
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       AlertStatusHapusFailed();
//     });
// }
