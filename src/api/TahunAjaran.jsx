import moment from "moment/moment";
import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";
import { ErrorHandling } from "./ErrorHandling";

export function getSemester(setData, setSts, setIsLoading, year) {
  axios
    .get(process.env.REACT_APP_BASE_URL + `/academic/year/${year}/periode`, {
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

export function getTahunAjaran(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/academic/year", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
      setIsLoading(false);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      ErrorHandling(error);
      setIsLoading(false);
    });
}

export function updateTahunAjaran(
  setSts,
  path,
  year,
  name,
  status,
  curriculumId,
  code,
  setIsLoading
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/academic/year/${code}`,
      {
        year,
        name,
        status,
        curriculumId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Ubah Tahun Ajaran Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

export function postTahunAjaran(
  setSts,
  navigate,
  year,
  name,
  status,
  curriculumId,
  setIsLoading
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/academic/year",
      {
        year,
        name,
        status,
        curriculumId,
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
        "Tambah Tahun Ajaran Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
