import { AlertMessage, AlertStatusSuccess } from "../components/ModalPopUp";
import axios from "./axios";

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

export function postQuestion(
  setSts,
  navigate,
  session_detail_id,
  description,
  sequence,
  is_publish
) {
  axios
    .post(
      process.env.REACT_APP_NUSA_SARAT + "/question/create",
      {
        session_detail_id,
        description,
        sequence,
        is_publish,
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

export function getDetailQuestion(id, setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_NUSA_SARAT +
        `/question/filter?session_detail=${id}`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body) {
        setData(i.question_details);
      }
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      if (error.code === "ERR_NETWORK") {
        AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
      }
    });
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
