import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKelompokMapel(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/subject/group", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function updateStatusKelompokMapel(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_BASE_URL + `/group-course/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getKelompokMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
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
  startTime,
  endTime
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/subject/group/${id}`,
      {
        academicPeriodeId,
        subjectId,
        roomClassId,
        day,
        startTime,
        endTime,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusUpdateDataSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function postKelompokMapel(
  setStatus,
  path,
  academicPeriodeId,
  subjectId,
  roomClassId,
  day,
  startTime,
  endTime
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/subject/group",
      {
        academicPeriodeId,
        subjectId,
        roomClassId,
        day,
        startTime,
        endTime,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertStatusTambahFailed();
    });
}

export function deleteKelompokMapel(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/group-course/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getKelompokMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
