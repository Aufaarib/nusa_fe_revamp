import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
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
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah Murid Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Murid Gagal", "Coba Lagi", "error");
    });
}
