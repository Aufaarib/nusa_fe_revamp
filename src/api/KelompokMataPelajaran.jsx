import { AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getKelompokMapel(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/subject/group", {
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

export function updateKelompokMapel(
  setStatus,
  id,
  path,
  academicPeriodeId,
  subjectId,
  roomClassId,
  day,
  teacherId,
  startTime,
  endTime,
  setIsLoading
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/subject/group/${id}`,
      {
        academicPeriodeId,
        subjectId,
        roomClassId,
        day,
        teacherId,
        startTime,
        endTime,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setIsLoading(false);
      setStatus({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Kelompok Mata Pelajaran",
        "success",
        "Ubah Kelompok Mata Pelajaran Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setStatus({ type: "error", error });
      ErrorHandling(error);
    });
}

export function postKelompokMapel(
  setStatus,
  path,
  academicPeriodeId,
  subjectId,
  roomClassId,
  teacherId,
  day,
  startTime,
  endTime,
  setIsLoading
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/subject/group",
      {
        academicPeriodeId,
        subjectId,
        roomClassId,
        teacherId,
        day,
        startTime,
        endTime,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setIsLoading(false);
      setStatus({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Kembali Ke Halaman Kelompok Mata Pelajaran",
        "success",
        "Tambah Kelompok Mata Pelajaran Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setStatus({ type: "error", error });
      ErrorHandling(error);
    });
}
