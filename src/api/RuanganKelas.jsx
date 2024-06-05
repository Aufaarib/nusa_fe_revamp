import {
  AlertMessage,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
} from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getClassRoom(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/classroom", {
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

export function getStudentListRoom(setData, setSts, id, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + `/classroom/${id}/student`, {
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

export function getKelompokMapelRoom(
  setData,
  setSts,
  roomClassesId,
  setIsLoading
) {
  const data = [];
  axios
    .get(process.env.REACT_APP_BASE_URL + "/subject/group", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      res.data.body.forEach((element) => {
        if (element.roomClasses.id === roomClassesId) {
          data.push(element);
          setIsLoading(false);
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

export function postClassRoom(
  setSts,
  navigate,
  academicYearId,
  classId,
  roomId,
  capacity,
  teacherId,
  setIsLoading
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/classroom`,
      {
        academicYearId,
        classId,
        roomId,
        capacity,
        teacherId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Ruangan Kelas Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function updateClassRoom(
  setSts,
  id,
  path,
  academicYearId,
  classId,
  roomId,
  capacity,
  teacherId,
  setIsLoading
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/classroom/${id}`,
      {
        academicYearId,
        classId,
        roomId,
        capacity,
        teacherId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Ruangan Kelas",
        "success",
        "Ubah Ruangan Kelas Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

export function moveStudentToClassRoom(path, students, id) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/classroom/${id}/student`,
      {
        students,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Pemindahan Murid Ke Kelas Lain Berhasil"
      );
    })
    .catch((error) => {
      ErrorHandling(error);
    });
}
