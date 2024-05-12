import { AlertMessage } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
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
      setPendaftaranData(data);
      setStatus({ type: "success" });
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      ErrorHandling(error);
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
      ErrorHandling(error);
    });
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
      AlertMessage(
        "Berhasil",
        "Penambahan Calon Siswa Berhasil, Silahkan Klik Tombol Lihat Untuk Memulai Proses PMB",
        "Tutup",
        "success"
      );
      getMyAdmission(setData, setSts);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (admissionPhaseId === "") {
        AlertMessage(
          "Tidak Dapat Mendaftar",
          "Belum Ada Gelombang Pendaftaran Yang Dibuka",
          "Tutup",
          "warning"
        );
      } else {
        ErrorHandling(error);
      }
    });
}
