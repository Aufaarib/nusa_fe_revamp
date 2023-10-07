import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

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
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
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
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function getNewsDetail(id, setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/news/fetch/${id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body.images);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function getInstitution(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/institution/filter`, {
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
export function getDetailQuestion(question_id, setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/question/fetch/${question_id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body.question_details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function getQuestion(setData, setSts, session_id) {
  axios
    .get(
      process.env.REACT_APP_NUSA_SARAT +
        `/question/filter?session_detail=${session_id}`,
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
export function getSession(page, per_page, setData, setSts, setPagination) {
  axios
    .get(
      process.env.REACT_APP_NUSA_SARAT +
        `/session/filter?page=${page}&per_page=${per_page}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setPagination(res.data.meta);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function getActiveSession(setData, setSts, setAllData) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/session/active`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setAllData(res.data.body);
      localStorage.setItem("SESSION_ID", res.data.body.id);
      setData(res.data.body.details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function getDetailSession(id, setData, setDetailsData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA_SARAT + `/session/fetch/${id}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setDetailsData(res.data.body.details);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
}
export function postAnswers(setSts, navigate, question_id, fields) {
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
        setSts({ type: "error", error });
        if (error.code === "ERR_NETWORK") {
          AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
        } else {
          AlertMessage("Gagal", "Tambah Answer Gagal", "Coba Lagi", "error");
        }
      });
  }
}
export function postQuestion(
  setSts,
  navigate,
  session_detail_id,
  sequence,
  q_fields
) {
  for (const i of q_fields) {
    axios
      .post(
        process.env.REACT_APP_NUSA_SARAT + "/question/create",
        {
          session_detail_id,
          sequence,
          description: i.description,
          is_publish: i.is_publish,
        },
        {
          headers: {
            authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((res) => {
        const question_id = res.data.body.id;
        for (const a of i.a_fields) {
          axios
            .post(
              process.env.REACT_APP_NUSA_SARAT + "/question_detail/create",
              {
                question_id,
                description: a.description,
                correct_answer: a.correct_answer,
              },
              {
                headers: {
                  authorization: localStorage.getItem("TOKEN"),
                },
              }
            )
            .then(() => {
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
              setSts({ type: "error", error });
              AlertMessage(
                "Gagal",
                "Tambah Pilihan Jawaban Gagal",
                "Coba Lagi",
                "error"
              );
            });
        }
      })
      .catch((error) => {
        setSts({ type: "error", error });
        if (error.code === "ERR_NETWORK") {
          AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
        } else {
          AlertMessage("Gagal", "Tambah Soal Gagal", "Coba Lagi", "error");
        }
      });
  }
}
export function postSession(setSts, navigate, data) {
  axios
    .post(process.env.REACT_APP_NUSA_SARAT + "/session/create", data, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
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
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Tambah Sesi Gagal", "Coba Lagi", "error");
      }
    });
}
export function postNews(setSts, navigate, formData) {
  axios
    .post(process.env.REACT_APP_NUSA_SARAT + "/news/create", formData, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
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
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Tambah Berita Gagal", "Coba Lagi", "error");
      }
    });
}
export function updateSession(resume_id, setSts, navigate, data) {
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
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Edit Sesi Gagal", "Coba Lagi", "error");
      }
    });
}
export function updateQuestion(
  question_id,
  setSts,
  navigate,
  session_detail_id,
  sequence,
  description,
  is_publish
) {
  axios
    .put(
      process.env.REACT_APP_NUSA_SARAT + `/question/update/${question_id}`,
      { session_detail_id, sequence, description, is_publish },
      {
        headers: {
          authorization: localStorage.getItem("TOKEN"),
        },
      }
    )
    .then(() => {
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
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage("Gagal", "Edit Pertanyaan Gagal", "Coba Lagi", "error");
      }
    });
}
export function updateDetailQuestion(
  id,
  question_id,
  setSts,
  navigate,
  description,
  correct_answer
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
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Edit Pilihan Jawaban Gagal",
          "Coba Lagi",
          "error"
        );
      }
    });
}
export function updateNews(id, setSts, navigate, formData) {
  axios
    .put(process.env.REACT_APP_NUSA_SARAT + `/news/update/${id}`, formData, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
    .then(() => {
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
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      } else {
        AlertMessage(
          "Gagal",
          "Edit Pilihan Jawaban Gagal",
          "Coba Lagi",
          "error"
        );
      }
    });
}
