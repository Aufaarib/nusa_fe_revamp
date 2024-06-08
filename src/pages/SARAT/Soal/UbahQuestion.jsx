import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateQuestion, updateSession } from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";
import { DropdownRadioInputBiological } from "../../../components/Dropdown";

export default function UbahQuestion() {
  const location = useLocation();
  const path = "/admin/list-soal";
  const [description, setDescription] = useState(location.state.description);
  const [is_publish, setPublish] = useState(location.state.is_publish);
  const [sts, setSts] = useState("");
  const [poin, setPoin] = useState(location.state.score);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  const navigateListResume = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const questions = [
      {
        id: location.state.question_id,
        question: description,
        question_type: `${location.state.question_type}`,
        flag: `${localStorage.getItem("FLAG")}`,
        sequence: 1,
        is_publish: is_publish,
        score: poin,
        question_lists: null,
      },
    ];

    if (description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      updateQuestion(
        location.state.question_id,
        setSts,
        navigateListResume,
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
          <TextInput
            label="Skor"
            type="number"
            onChange={(e) => setPoin(parseInt(e.target.value))}
            value={poin}
            required={true}
          />
          <DropdownRadioInputBiological
            required={true}
            label="Tampilkan Soal"
            value1={1}
            value2={0}
            label2="Ya"
            label3="Tidak"
            onChange={(e) => {
              setPublish(parseInt(e.target.value));
            }}
            checked={is_publish}
          />
          <br />

          <div className="btn-form mr-7 flex justify-center items-center">
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
