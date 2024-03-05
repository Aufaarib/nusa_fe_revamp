import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateQuestion, updateSession } from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahQuestion() {
  const location = useLocation();
  const path = "/admin/list-soal";
  const [description, setDescription] = useState(location.state.description);
  const [is_publish, setPublish] = useState(location.state.is_publish);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  const navigateListResume = () => {
    navigate(path);
  };

  console.log("desc === ", description);
  console.log("pub === ", is_publish);
  console.log("seq === ", location.state.sequence);

  const postData = (e) => {
    e.preventDefault();

    if (description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateQuestion(
        location.state.question_id,
        setSts,
        navigateListResume,
        location.state.session_detail_id,
        location.state.sequence,
        description,
        is_publish
      );
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Resume"
        navPrev={path}
        at="Edit Pertanyaan"
        title="Edit Pertanyaan"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <p className="text-[24px] font-bold text-merah">Form Edit Pertanyaan</p>
        <article>
          <br />
          <TextInput
            label="Pertanyaan"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required={true}
          />
          <br />

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
              onClick={navigateListResume}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
