import {
  AlertMessage,
  AlertStatusFailed,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function ApproveEducationalPayment(id, setSts, setData) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .put(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/aproved/payment/${id}`,
      null,
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      AlertStatusUpdateSuccess();
      getRegistrationDetail(setSts, setData);
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Silahkan Coba Lagi", "Coba Lagi", "error");
      }
    });
}

export function validateOTP(setSts, otp, navigateLogin, directTo) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/user/verification",
      { otp },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      if (directTo === "Reset Password") {
        AlertStatusSuccess(
          navigateLogin,
          "Berhasil",
          "Reset Password",
          "success",
          "Silahkan Reset Password Anda"
        );
      } else if (directTo === "Login") {
        AlertStatusSuccess(
          navigateLogin,
          "Berhasil",
          "Kembali Ke Halaman Login",
          "success",
          "Silahkan Login"
        );
      }
      setSts(res.code);
    })
    .catch((error) => {
      setSts(error.code);
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Kode Verifikasi Tidak Sesuai. Coba Lagi, Atau Kirim Ulang Kode",
          "Coba Lagi",
          "error"
        );
      }
    });
}

// DAFTAR ULANG
export function daftarUlangAgreement(path) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .post(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/reregistraton`,
      null,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Persetujuan Pendaftaran Ulang Berhasil"
      );
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Persetujuan Pendaftaran Ulang Gagal",
          "Coba Lagi",
          "error"
        );
      }
    });
}

export function revalidateEmail(setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/verification", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setSts({ type: "success" });
      AlertMessage(
        "Kode Verifikasi Telah Terkirim",
        "Silahkan Cek Kembali Email Anda",
        "Tutup",
        "success"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Pengiriman Ulang Kode Verifikasi Gagal, Silahkan Coba Lagi",
          "Coba Lagi",
          "error"
        );
      }
    });
}

export function getAdmissionStatement(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission/statement", {
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

export function getAdmissionAnswer(setData, setSts) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/statement`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setSts({ type: "success" });
      setData(res.data.body.statements);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionRegistration(setData, setSts, setIsLoading) {
  const data = [];
  axios
    .get(process.env.REACT_APP_BASE_URL + `/admission/registration`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      res.data.body.forEach((element) => {
        if (element.steps.length > 0 && element.isStudent != 1) {
          data.push(element);
        }
      });
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

// GET BIAYA PENDIDIKAN
export function getRegistrationDetail(setSts, setData) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/payment`,
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      setData(res.data.body);
      setSts(res.code);
    })
    .catch((error) => {
      setSts(error.code);
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionRegistrationByRegNumberUser(setData, setSts) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionRegistrationByRegNumberAdmin(
  setData,
  setGelombang,
  setEdu,
  setDataAnak,
  setDataAyah,
  setDataIbu,
  setDataWali,
  setDataStep1,
  setDataStep2,
  setDataStep3,
  setDataStep4,
  setDataStep5,
  setPaid,
  setTotalPaid,
  setIsLoading
) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setIsLoading(false);
      setDataAnak(res.data.body.applicant);
      setGelombang(res.data.body.admissionPhase);
      setData(res.data.body);
      const ayahData = res.data.body.user.parents.find(
        (item) => item.relationship === "ayah"
      );
      const ibuData = res.data.body.user.parents.find(
        (item) => item.relationship === "ibu"
      );
      const waliData = res.data.body.user.parents.find(
        (item) => item.relationship === "perwalian"
      );
      setDataAyah(ayahData);
      setDataIbu(ibuData);
      setDataWali(waliData);
      setEdu(res.data.body.admissionPhase.admission.details[0]?.amount);
      setPaid(res.data.body.payments);
      setTotalPaid(
        res.data.body.payments.reduce((total, num) => total + num.amount, 0)
      );
      // }
      for (const i of res.data.body.steps) {
        if (i.step === "1") {
          setDataStep1(i);
        } else if (i.step === "2") {
          setDataStep2(i);
        } else if (i.step === "3") {
          setDataStep3(i);
        } else if (i.step === "4") {
          setDataStep4(i);
        } else if (i.step === "5") {
          setDataStep5(i);
        }
      }
    })
    .catch((error) => {
      setIsLoading(false);
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getMyAdmission(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/admission", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdditionalFile(setData, setSts) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/additionalFile`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setData(res.data.body.additionalFiles);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionSteps(
  setDataStep1,
  setDataStep2,
  setDataStep3,
  setDataStep4,
  setDataStep5,
  setSts
) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/step`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body) {
        if (i.step === "1") {
          setDataStep1(i);
        } else if (i.step === "2") {
          setDataStep2(i);
        } else if (i.step === "3") {
          setDataStep3(i);
        } else if (i.step === "4") {
          setDataStep4(i);
        } else if (i.step === "5") {
          setDataStep5(i);
        }
      }
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error" });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function updateAdmissionSteps(setSts, code, step, status, note, path) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${code}/step`,
      { step, status, note },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusSuccess(
        path,
        "Berhasil",
        "Tutup",
        "success",
        "Update Status Tahapan Berhasil"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Ubah Tahapan Gagal", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionRegistrationApplicant(setData, setSts) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/applicant`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setData(res.data.body.applicant);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error" });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionRegistrationParentsAyah(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/parent", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      for (const i of res.data.body) {
        switch (i.relationship) {
          case "ayah":
            setData(i);
            setSts({ type: "success" });
        }
      }
    })
    .catch((error) => {
      setSts({ type: "error" });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function getAdmissionRegistrationParentsIbu(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/parent", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      for (const i of res.data.body) {
        switch (i.relationship) {
          case "ibu":
            setData(i);
            setSts({ type: "success" });
        }
      }
    })
    .catch((error) => {
      setSts({ type: "error" });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function getAdmissionRegistrationParentsWali(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/parent", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      for (const i of res.data.body) {
        switch (i.relationship) {
          case "perwalian":
            setData(i);
            setSts({ type: "success" });
        }
      }
    })
    .catch((error) => {
      setSts({ type: "error" });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}

export function postAdmissionAnswer(
  setSts,
  code,
  name,
  questionId,
  answer,
  amount
) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `registration/${regNumber}/statement`,
      {
        questionId,
        answer,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      // AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      // AlertStatusTambahFailed();
    });
}

export function postAdmissionRegistration(
  setSts,
  path,
  code,
  name,
  startDate,
  endDate,
  amount
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `admission/${code}/phase`,
      {
        name,
        startDate,
        endDate,
        amount,
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

export function getPaymentInvoice(setData, setSts, code) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${code}/payment`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body) {
        setData(i);
        setSts({ type: "success" });
      }
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function uploadHasilTest(isPassed, navigate) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .post(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/testResult`,
      { isPassed },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Upload Hasil Test Berhasil"
      );
      // setSts({ type: "success" });
    })
    .catch((error) => {
      // setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Upload Hasil Test Gagal", "Coba Lagi", "error");
      }
    });
}

export function approvedRegistration(code, status, onReload) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${code}/aprove`,
      { status },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      // setSts({ type: "success" });
      AlertMessage(
        "Berhasil",
        "Status Pendaftar Berhasil Diubah",
        "Tutup",
        "success"
      );
      onReload();
    })
    .catch((error) => {
      // setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Persetujuan Gagal, Silahkan Coba Lagi",
          "Coba Lagi",
          "error"
        );
      }
    });
}

export function moveApplicantToStudent(navigate, registrationNumbers) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/student`,
      { registrationNumbers },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Pendaftar Berhasil Dijadikan Menjadi Murid"
      );
      // setSts({ type: "success" });
      // setData();
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Pendaftar Gagal Dijadikan Menjadi Murid",
          "Coba Lagi",
          "error"
        );
      }
      // setSts({ type: "error", error });
    });
}
