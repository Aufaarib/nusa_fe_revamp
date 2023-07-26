import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusReVerified,
  AlertStatusReVerifiedFailed,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
  AlertStatusVerified,
  AlertStatusVerifiedFailed,
} from "../components/ModalPopUp";
import axios from "./axios";

export function validateEmail(setSts, otp, navigateLogin) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/user/verification",
      { otp },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      AlertStatusVerified(navigateLogin);
      setSts(res.code);
    })
    .catch((res) => {
      AlertStatusVerifiedFailed();
      setSts(res.code);
    });
}

// DAFTAR ULANG
export function daftarUlangAgreement() {
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
      AlertStatusUpdateSuccess();
    })
    .catch((error) => {
      AlertStatusUpdateFailed();
    });
}

export function revalidateEmail(setSts, otp) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/verification", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      // console.log("ADMISSION STATEMENT === ", otp);
      // setData(res.data.body);
      setSts({ type: "success" });
      AlertStatusReVerified();
    })
    .catch((error) => {
      // console.log("ADMISSION STATEMENT === ", otp);
      setSts({ type: "error", error });
      AlertStatusReVerifiedFailed();
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
    .get(process.env.REACT_APP_BASE_URL + "/admission/registration", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log(
        "ADMISSION REGISTRATION === ",
        res.data.body[0].user.fullname
      );
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getAdmissionRegistrationByRegNumber(setData, setSts) {
  const regNumber = localStorage.getItem("REG_NUMBER");
  axios
    .get(
      process.env.REACT_APP_BASE_URL + `/admission/registration/${regNumber}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      console.log(
        "ADMISSION REGISTRATION === ",
        res.data.body.admissionPhase.amount
      );
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

// export function getAdmissionRegistration(setData, setSts) {
//   axios
//     .get(process.env.REACT_APP_BASE_URL + "/admission/registration", {
//       headers: { authorization: localStorage.getItem("TOKEN") },
//     })
//     .then((res) => {
//       console.log("ADMISSION REGISTRATION === ", res.data.body);
//       setData(res.data.body);
//       setSts({ type: "success" });
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//     });
// }

export function getMyAdmission(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/admission", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      // console.log("My Admission === ", res.data.body);
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
      // console.log("My Admission === ", res.data.body);
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
  console.log("REGNUMMMM === ", regNumber);
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
        // setSts(res.data.code);
      }
    })
    .catch((res) => {
      // setSts(res.data.code);
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
            setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      setSts(error.data.code);
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

export function uploadHasilTest(setData, setSts, code) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${code}/aproved/registration`,
      {},
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      setData();
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function approvedRegistration(setData, setSts, code) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${code}/aproved/registration`,
      {},
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getAdmissionRegistration(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}
