import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  updateDetailQuestion,
  updateQuestion,
  updateSession,
} from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { DropdownRadioInputBiological } from "../../../components/Dropdown";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

export default function UbahDetailQuestion() {
  const location = useLocation();
  const path = "/admin/detail-soal";
  const [description, setDescription] = useState(location.state.description);
  const [correct_answer, setCorrectAnswer] = useState(
    location.state.is_correct
  );
  const [sts, setSts] = useState("");
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  const navigateDetailQuestion = () => {
    navigate(path, {
      state: {
        id: location.state.id,
        sequence: location.state.detail_question_sequence,
        question_id: location.state.question_id,
        description: location.state.description,
        is_correct: location.state.is_correct,
        session_detail_id: location.state.session_detail_id,
        question: location.state.question,
        is_publish: location.state.is_publish,
      },
    });
  };

  console.log("last", location.state.sequence);

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const questions = [
      {
        id: location.state.question_id,
        question: location.state.question,
        question_type: "PG",
        flag: `${localStorage.getItem("FLAG")}`,
        sequence: location.state.detail_question_sequence,
        is_publish: location.state.is_publish,
        question_lists: [
          {
            id: location.state.id,
            answer_choice: description,
            is_correct: correct_answer,
            sequence: location.state.sequence,
          },
        ],
      },
    ];

    if (description === "" || correct_answer === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      updateQuestion(
        location.state.question_id,
        setSts,
        navigateDetailQuestion,
        location.state.session_detail_id,
        questions,
        setIsLoading
      );
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Pilihan Jawaban"
        navPrev={path}
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
          <div className="btn-form mr-6 flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
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
              onClick={navigateDetailQuestion}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
