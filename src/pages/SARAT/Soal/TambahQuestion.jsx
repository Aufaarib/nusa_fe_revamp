import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postQuestion } from "../../../api/Sarat";
import { Header } from "../../../components";
import { DropdownRadioInputBiological } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import { TextArea } from "../../../components/TextInput";

export default function TambahQuestion() {
  const location = useLocation();
  const questions = location.state.questions;
  const path = "/admin/list-soal";
  const [description, setDescription] = useState("");
  const [isPublish, setIsPublish] = useState("");
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  console.log("resumeId === ", localStorage.getItem("RESUME_ID"));
  console.log("resumeName === ", localStorage.getItem("RESUME_NAME"));

  const navigateListSession = () => {
    navigate(path, {
      state: {
        session_tittle: location.state.session_tittle,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();
    const sequence = questions + 1;
    const is_publish = parseInt(isPublish);
    const session_detail_id = parseInt(localStorage.getItem("RESUME_ID"));

    if (description === "" || is_publish === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postQuestion(
        setSts,
        navigateListSession,
        session_detail_id,
        description,
        sequence,
        is_publish
      );
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        // prev="Bank"
        // navePrev={path}
        at="Tambah Soal"
        title="Tambah Soal"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <p className="text-[24px] font-bold text-merah">Form Soal</p>
        <article>
          <br />
          <TextArea
            label="Soal"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required={true}
          />
          <br />
          <DropdownRadioInputBiological
            required={true}
            label="Tampilkan Soal?"
            value1="1"
            value2="0"
            label2="Ya"
            label3="Tidak"
            onChange={(e) => setIsPublish(e.target.value)}
            checked={isPublish}
          />

          <div className="btn-form mr-7">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateListSession}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
