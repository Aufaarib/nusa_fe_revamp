import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getMurid(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/student", {
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

export function getMuridNotRegisteredToClass(setData, setSts, setIsLoading) {
  const data = [];
  axios
    .get(process.env.REACT_APP_BASE_URL + "/student", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      res.data.body.forEach((element) => {
        if (element.inRoomClasses == 0) {
          data.push(element);
        }
      });
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
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
  // status,
  setIsLoading
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
        // status,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setIsLoading(false);
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah Murid Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
