import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateDetailQuestion, updateSession } from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { DropdownRadioInputBiological } from "../../../components/Dropdown";

export default function UbahDetailQuestion() {
  const location = useLocation();
  const path = "/admin/detail-soal";
  const [description, setDescription] = useState(location.state.description);
  const [correct_answer, setCorrectAnswer] = useState(
    location.state.correct_answer
  );
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  console.log("ds ", correct_answer);

  const navigateListSession = () => {
    navigate(path, {
      state: {
        question_id: location.state.question_id,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();

    if (description === "" || correct_answer === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateDetailQuestion(
        location.state.id,
        location.state.question_id,
        setSts,
        navigateListSession,
        description,
        correct_answer
      );
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Pilihan Jawaban"
        navePrev={path}
        at="Edit Pilihan Jawaban"
        title="Edit Pilihan Jawaban"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <p className="text-[24px] font-bold text-merah">
          Form Edit Pilihan Jawaban
        </p>
        <article>
          <br />
          <TextInput
            label="Jawaban"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required={true}
          />
          <DropdownRadioInputBiological
            required={true}
            label="Benar"
            value1={1}
            value2={0}
            label2="Ya"
            label3="Tidak"
            onChange={(e) => {
              setCorrectAnswer(parseInt(e.target.value));
            }}
            checked={correct_answer}
          />
          <br />
          <div className="btn-form mr-6">
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
