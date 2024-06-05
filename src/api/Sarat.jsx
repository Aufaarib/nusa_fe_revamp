import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function updateConfig(navigate, data, setIsLoading) {
  axios
    .put(process.env.REACT_APP_NUSA_SARAT + `/config/update/1`, data, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setIsLoading(false);
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Edit Sesi Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      ErrorHandling(error);
    });
}

export function getConfig(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/config/filter`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      let data = [];
      data.push(res.data.body);
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

export function getDonations(session_id, setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/donation/fetch/${session_id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

export function getNews(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/news/filter`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getNewsDetail(id, setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/news/fetch/${id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      setData(res.data.body.images);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getInstitution(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/institution/filter`, {
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
export function getDetailQuestion(question_id, setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/question/fetch/${question_id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      setData(res.data.body.question_details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getQuestion(setData, setSts, session_id, setIsLoading, flag) {
  axios
    .get(
      process.env.REACT_APP_NUSA_SARAT +
        `/question/filter?session_detail=${session_id}&flag=${flag}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
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
export function getSession(
  page,
  per_page,
  setData,
  setSts,
  setPagination,
  setIsLoading
) {
  axios
    .get(
      process.env.REACT_APP_NUSA_SARAT +
        `/session/filter?page=${page}&per_page=${per_page}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setIsLoading(false);
      setData(res.data.body);
      setPagination(res.data.meta);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getSessionReport(
  page,
  per_page,
  setData,
  setSts,
  setPagination,
  setIsLoading,
  session_id,
  session_detail_id,
  parentName,
  flag
) {
  axios
    .get(
      process.env.REACT_APP_NUSA_SARAT +
        `/session/report?session_id=${session_id}&session_detail_id=${session_detail_id}&parent=${parentName}&flag=${flag}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setIsLoading(false);
      setData(res.data.body);
      setPagination(res.data.meta);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getSessionReportDetail(
  id,
  setData,
  setQuestion,
  setSts,
  setIsLoading
) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/session/report/${id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      let data = [];
      data.push(res.data.body);
      setQuestion(res.data.body.answer_result);
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getActiveSession(setData, setSts, setIsLoading) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/session/active`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      // setAllData(res.data.body);
      setData(res.data.body.details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function getDetailSession(
  id,
  setData,
  setDetailsData,
  setSts,
  setIsLoading
) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/session/fetch/${id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setIsLoading(false);
      setData(res.data.body);
      setDetailsData(res.data.body.details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function postDonations(
  setSts,
  navigate,
  session_detail_id,
  total,
  setIsLoading
) {
  axios
    .post(
      process.env.REACT_APP_NUSA_SARAT + "/donation/create",
      {
        session_detail_id,
        total,
      },
      {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Infaq Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function postAnswers(
  setSts,
  navigate,
  question_id,
  fields,
  setIsLoading
) {
  for (const i of fields) {
    axios
      .post(
        process.env.REACT_APP_NUSA_SARAT + "/question_detail/create",
        {
          question_id,
          description: i.description,
          correct_answer: i.correct_answer,
        },
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        setSts({ type: "success" });
        AlertStatusSuccess(
          navigate,
          "Berhasil",
          "Tutup",
          "success",
          "Tambah Pilihan Jawaban Berhasil"
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setSts({ type: "error", error });
        ErrorHandling(error);
      });
  }
}

export function postQuestion(
  setSts,
  navigate,
  session_detail_id,
  question,
  setIsLoading
) {
  axios
    .post(
      process.env.REACT_APP_NUSA_SARAT + "/question/create",
      {
        session_detail_id,
        questions: question,
      },
      {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then((res) => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Soal Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}

// export function postQuestion(
//   setSts,
//   navigate,
//   session_detail_id,
//   sequence,
//   q_fields,
//   setIsLoading
// ) {
//   for (const i of q_fields) {
//     axios
//       .post(
//         process.env.REACT_APP_NUSA_SARAT + "/question/create",
//         {
//           session_detail_id,
//           sequence,
//           description: i.description,
//           is_publish: i.is_publish,
//         },
//         {
//           headers: {
//             authorization: localStorage.getItem("TOKEN"),
//           },
//         }
//       )
//       .then((res) => {
//         const question_id = res.data.body.id;
//         for (const a of i.a_fields) {
//           axios
//             .post(
//               process.env.REACT_APP_NUSA_SARAT + "/question_detail/create",
//               {
//                 question_id,
//                 description: a.description,
//                 correct_answer: a.correct_answer,
//               },
//               {
//                 headers: {
//                   authorization: localStorage.getItem("TOKEN"),
//                 },
//               }
//             )
//             .then(() => {
//               setIsLoading(false);
//               setSts({ type: "success" });
//               AlertStatusSuccess(
//                 navigate,
//                 "Berhasil",
//                 "Tutup",
//                 "success",
//                 "Tambah Soal Berhasil"
//               );
//             })
//             .catch((error) => {
//               setIsLoading(false);
//               setSts({ type: "error", error });
//               ErrorHandling(error);
//             });
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setSts({ type: "error", error });
//         ErrorHandling(error);
//       });
//   }
// }
export function postSession(setSts, navigate, data, setIsLoading) {
  axios
    .post(process.env.REACT_APP_NUSA_SARAT + "/session/create", data, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Sesi Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function postNews(setSts, navigate, formData, setIsLoading) {
  axios
    .post(process.env.REACT_APP_NUSA_SARAT + "/news/create", formData, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Tambah Berita Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function updateSession(resume_id, setSts, navigate, data, setIsLoading) {
  axios
    .put(
      process.env.REACT_APP_NUSA_SARAT + `/session/update/${resume_id}`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Edit Sesi Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function updateQuestion(
  question_id,
  setSts,
  navigate,
  session_detail_id,
  question,
  setIsLoading
) {
  axios
    .put(
      process.env.REACT_APP_NUSA_SARAT + `/question/update/${question_id}`,
      { session_detail_id, questions: question },
      {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Edit Pertanyaan Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function updateDetailQuestion(
  id,
  question_id,
  setSts,
  navigate,
  description,
  correct_answer,
  setIsLoading
) {
  axios
    .put(
      process.env.REACT_APP_NUSA_SARAT + `/question_detail/update/${id}`,
      { question_id, description, correct_answer },
      {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Edit Pilihan Jawaban Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
export function updateNews(id, setSts, navigate, formData, setIsLoading) {
  axios
    .put(process.env.REACT_APP_NUSA_SARAT + `/news/update/${id}`, formData, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
      setIsLoading(false);
      setSts({ type: "success" });
      AlertStatusSuccess(
        navigate,
        "Berhasil",
        "Tutup",
        "success",
        "Edit Berita Berhasil"
      );
    })
    .catch((error) => {
      setIsLoading(false);
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
