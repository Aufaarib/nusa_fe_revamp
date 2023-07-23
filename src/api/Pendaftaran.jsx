import {
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import { getMyAdmission } from "./Registrasi";
import axios from "./axios";

export function getPendaftaran(setPendaftaranData, setStatus) {
  axios
    .get(process.env.REACT_APP_NUSA + "/pendaftaran/fetch")
    .then((res) => {
      const data = res.data.data.filter((e) => e.nama_lengkap_anak !== "");
      const kelas = res.data.data.filter(
        (e) => e.kelas_pada_saat_mendaftar !== ""
      );
      console.log(kelas);
      setPendaftaranData(data);
      setStatus({ type: "success" });
    })
    .catch((error) => {
      setStatus({ type: "error", error });
    });
}

export function getActiveAdmission(setData, setStatus) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission/active", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      for (const i of res.data.body.phases) {
        setData(i.id);
        setStatus({ type: "success" });
      }
    })
    .catch((error) => {
      setStatus({ type: "error", error });
    });

  // axios
  // .get("https://63dcbb592308e3e319eca644.mockapi.io/nusa-pendaftaran")
  // .then((res) => {
  //     const data = res.data.filter(
  //         (e) => e.nama_lengkap_anak !== ""
  //         );
  //     setPendaftaranData(data);
  //     setStatus({ type: 'success' });
  // })
  // .catch((error) => {
  //     setStatus({ type: 'error', error });
  // });
}

export function postCalonSiswa(setData, setSts, admissionPhaseId, childName) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/admission/registration`,
      {
        admissionPhaseId,
        childName,
      },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      AlertStatusUpdateSuccess();
      getMyAdmission(setData, setSts);
      setSts({ type: "success" });
    })
    .catch((error) => {
      AlertStatusUpdateFailed();
      setSts({ type: "error", error });
    });
}
