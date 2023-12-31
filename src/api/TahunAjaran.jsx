import moment from "moment/moment";
import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

export function getSemester(setData, setSts) {
  const year = moment().format("YYYY");
  console.log(year);
  axios
    .get(process.env.REACT_APP_BASE_URL + `/academic/year/AC${year}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      // for (const i of res.data.body) {
      setData(res.data.body.periode);
      // }
      console.log(res.data.body.periode);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getTahunAjaran(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/academic/year", {
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

export function updateTahunAjaran(
  setSts,
  path,
  year,
  name,
  status,
  curriculumId,
  code
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
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Ubah Tahun Ajaran Gagal", "Coba Lagi", "error");
    });
}

export function postTahunAjaran(
  setSts,
  navigate,
  year,
  name,
  status,
  curriculumId
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
      setSts({ type: "error", error });
      AlertMessage("Gagal", "Tambah Tahun Ajaran Gagal", "Coba Lagi", "error");
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
