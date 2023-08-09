import {
  AlertMessage,
  AlertStatusFailed,
  AlertStatusReVerified,
  AlertStatusReVerifiedFailed,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
  AlertStatusVerified,
  AlertStatusVerifiedFailed,
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
      // setSts(res.code);
    })
    .catch((res) => {
      AlertStatusUpdateFailed();
      // setSts(res.code);
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
          "Kode Reset Password Sesuai",
          "Reset Password"
        );
      } else if (directTo === "Login") {
        AlertStatusSuccess(
          navigateLogin,
          "Akun Berhasil Ter-Verifikasi",
          "Kembali Ke Halaman Login"
        );
      }
      setSts(res.code);
    })
    .catch((res) => {
      AlertStatusFailed("Verifikasi Akun Gagal", "Tutup");
      setSts(res.code);
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
        (window.location.href = path),
        "Persetujuan Pendaftaran Ulang Berhasil",
        "Tutup"
      );
    })
    .catch((error) => {
      AlertStatusUpdateFailed();
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
        "Tutup"
      );
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusFailed("Gagal", "Tutup");
    });
}

export function getAdmissionStatement(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission/statement", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      // console.log("ADMISSION STATEMENT === ", res.data.body);
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
      console.log("ADMISSION STATEMENT ANSWER === ", res.data.body);
      setData(res.data.body.statements);
      // setSts(res.data.code);
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}
export function getAdmissionRegistration(setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL + "/admission/registration?pageSize=100",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      let data = [];
      res.data.body.forEach((element) => {
        if (element.steps.length > 0) {
          data.push(element);
        }
      });

      console.log("DAFKAS === ", data);

      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
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
      // console.log("===", res.data.body[0].amount);
      setData(res.data.body);
      setSts(res.code);
    })
    .catch((res) => {
      setSts(res.code);
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
    });
}

export function getAdmissionRegistrationByRegNumberAdmin(
  setData,
  setAmount,
  setEdu,
  setDataAnak,
  setDataAyah,
  setDataIbu,
  setDataWali,
  setDataStep1,
  setDataStep2,
  setDataStep3,
  setDataStep5
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
      setDataAnak(res.data.body.applicant);
      setAmount(res.data.body.admissionPhase);
      setData(res.data.body);
      for (const i of res.data.body.user.parents) {
        switch (i.relationship) {
          case "ayah":
            setDataAyah(i);
          case "ibu":
            setDataIbu(i);
          case "perwalian":
            setDataWali(i);
          // setSts(res.data.code);
        }
      }
      for (const i of res.data.body.payments) {
        setEdu(i);
      }
      for (const i of res.data.body.steps) {
        if (i.step === "1") {
          setDataStep1(i);
        } else if (i.step === "2") {
          setDataStep2(i);
        } else if (i.step === "3") {
          setDataStep3(i);
        } else if (i.step === "5") {
          setDataStep5(i);
        }
      }
    })
    .catch((error) => {});
}

export function getAdmissionRegistrationByRegNumberAdminAnak(setDataAnak) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setDataAnak(res.data.body.applicant);
      console.log("ANAK === ", res.data.body.applicant);
    })
    .catch((error) => {});
}

export function getAdmissionRegistrationByRegNumberAdminAyah(setDataAyah) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body.user.parents) {
        switch (i.relationship) {
          case "ayah":
            setDataAyah(i);
          // setSts(res.data.code);
        }
      }
    })
    .catch((error) => {});
}
export function getAdmissionRegistrationByRegNumberAdminIbu(setDataIbu) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body.user.parents) {
        switch (i.relationship) {
          case "ibu":
            setDataIbu(i);
          // setSts(res.data.code);
        }
      }
    })
    .catch((error) => {});
}
export function getAdmissionRegistrationByRegNumberAdminWali(setDataWali) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body.user.parents) {
        switch (i.relationship) {
          case "perwalian":
            setDataWali(i);
          // setSts(res.data.code);
        }
      }
    })
    .catch((error) => {});
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
      // setSts(res.response.data.code);
    })
    .catch((res) => {
      // setSts(res.response.data.code);
    });
}

export function updateAdmissionSteps(setSts, code, step, status, note) {
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
      AlertStatusUpdateSuccess();
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
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
      console.log("REGISTRATION APLICANT === ", res.data.body.applicant);
      setData(res.data.body.applicant);
      setSts(res.data.code);
    });
  // .catch((res) => {
  //   setSts(res.data.code);
  // });
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
          // setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      // setSts(error.data.code);
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
            // console.log("REGISTRATION PARENTS IBU === ", i);
            setData(i);
            setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      setSts(error.data.code);
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
            // console.log("REGISTRATION PARENTS WALI === ", i);
            setData(i);
          // setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      // setSts(error.data.code);
    });
}

export function postAdmissionAnswer(
  setSts,
  // path,
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
        console.log("OAAAAAAA === ", i);
        setData(i);
        setSts({ type: "success" });
      }
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function uploadHasilTest(score, navigate) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .post(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${regNumber}/testResult`,
      { score },
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      AlertStatusSuccess(navigate, "Upload Hasil Test Berhasil", "Tutup");
      // setSts({ type: "success" });
      // setData();
    })
    .catch((error) => {
      // setSts({ type: "error", error });
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
      AlertMessage("Berhasil", "Status Pendaftar Berhasil Diubah", "Tutup");
      onReload();
    })
    .catch((error) => {
      // setSts({ type: "error", error });
      AlertStatusFailed("Gagal", "Tutup");
    });
}
