import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postQuestion } from "../../../api/Sarat";
import { Header } from "../../../components";
import {
  DropdownMultiple,
  DropdownRadioInputBiological,
  DropdownSiswa,
} from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput, { TextArea } from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

export default function TambahQuestion() {
  const location = useLocation();
  const questionSequence = location.state.questions;
  const path = "/admin/list-soal";
  const [q_fieldsPg, setQFieldsPg] = useState([
    {
      question: "",
      question_type: "PG",
      flag: `${localStorage.getItem("FLAG")}`,
      sequence: 1,
      is_publish: { value: "" },
      question_lists: [
        { answer_choice: "", is_correct: { value: "" }, sequence: 0 },
      ],
    },
  ]);
  const [q_fieldsEssay, setQFieldsEssay] = useState([
    {
      question: "",
      question_type: "ESSAY",
      flag: `${localStorage.getItem("FLAG")}`,
      sequence: 1,
      is_publish: { value: "" },
      question_lists: null,
    },
  ]);
  const [q_fieldsUpload, setQFieldsUpload] = useState([
    {
      question: "",
      question_type: "UPLOAD",
      flag: `${localStorage.getItem("FLAG")}`,
      sequence: 1,
      is_publish: { value: "" },
      question_lists: null,
    },
  ]);
  const [sts, setSts] = useState("");
  const [question_type, setQuestion_type] = useState("");
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const session_tittle = localStorage.getItem("SESSION_TITTLE");
  const session_id = localStorage.getItem("SESSION_ID");
  const navigateListSession = () => {
    navigate(path, {
      state: {
        session_tittle: session_tittle,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const sequence = questionSequence + 1;
    const session_detail_id = parseInt(session_id);

    if (sequence === "" || session_detail_id === "") {
      setIsLoading(false);
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      if (question_type === "PG") {
        postQuestion(
          setSts,
          navigateListSession,
          session_detail_id,
          q_fieldsPg,
          setIsLoading
        );
      } else if (question_type === "Essay") {
        postQuestion(
          setSts,
          navigateListSession,
          session_detail_id,
          q_fieldsEssay,
          setIsLoading
        );
      } else if (question_type === "Upload") {
        postQuestion(
          setSts,
          navigateListSession,
          session_detail_id,
          q_fieldsUpload,
          setIsLoading
        );
      }
    }
  };

  const handleQFieldChange = (index, fieldName, value) => {
    if (question_type === "PG") {
      const newFields = [...q_fieldsPg];
      newFields[index][fieldName] = value;
      setQFieldsPg(newFields);
    } else if (question_type === "Essay") {
      const newFields = [...q_fieldsEssay];
      newFields[index][fieldName] = value;
      setQFieldsEssay(newFields);
    } else if (question_type === "Upload") {
      const newFields = [...q_fieldsUpload];
      newFields[index][fieldName] = value;
      setQFieldsUpload(newFields);
    }
  };

  // Function to add a new set of fields kunci jawaban (PG)
  const addAField = (aindex) => {
    const newFields = [...q_fieldsPg];
    newFields[aindex].question_lists.push({
      answer_choice: "",
      is_correct: { value: "" },
      sequence: 1,
    });
    setQFieldsPg(newFields);
  };

  const removeAField = (qindex) => {
    const newFields = [...q_fieldsPg];
    newFields[qindex].question_lists.pop();
    setQFieldsPg(newFields);
  };

  // tambah pertanyaan soal
  const addQField = () => {
    if (question_type === "PG") {
      setQFieldsPg([
        ...q_fieldsPg,
        {
          question: "",
          question_type: "PG",
          flag: `${localStorage.getItem("FLAG")}`,
          sequence: 1,
          is_publish: { value: "" },
          question_lists: [
            { answer_choice: "", is_correct: { value: "" }, sequence: 0 },
          ],
        },
      ]);
    } else if (question_type === "Essay") {
      setQFieldsEssay([
        ...q_fieldsEssay,
        {
          question: "",
          question_type: "ESSAY",
          flag: `${localStorage.getItem("FLAG")}`,
          sequence: 1,
          is_publish: { value: "" },
          question_lists: null,
        },
      ]);
    } else if (question_type === "Upload") {
      setQFieldsEssay([
        ...q_fieldsEssay,
        {
          question: "",
          question_type: "UPLOAD",
          flag: `${localStorage.getItem("FLAG")}`,
          sequence: 1,
          is_publish: { value: "" },
          question_lists: null,
        },
      ]);
    }
  };

  const removeQField = () => {
    if (question_type === "PG") {
      const newFields = [...q_fieldsPg];
      newFields.pop();
      setQFieldsPg(newFields);
    } else if (question_type === "Essay") {
      const newFields = [...q_fieldsEssay];
      newFields.pop();
      setQFieldsEssay(newFields);
    } else if (question_type === "Upload") {
      const newFields = [...q_fieldsUpload];
      newFields.pop();
      setQFieldsUpload(newFields);
    }
  };

  const questionTypeOptions = [
    {
      value: "PG",
      label: "Pilihan Ganda",
    },
    {
      value: "Essay",
      label: "Essay",
    },
    {
      value: "Upload",
      label: "Upload",
    },
  ];

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="SARAT"
        navPrev={path}
        at="Tambah Soal"
        title="Tambah Soal"
      />

      <div style={{ padding: "5px 104px 0" }}>
        <article className="pt-5">
          <DropdownSiswa
            label="Jenis Soal"
            required={true}
            defaultValue={question_type.value}
            value={question_type.value}
            options={questionTypeOptions}
            onChange={(e) => setQuestion_type(e.value)}
          />
          {question_type === "PG"
            ? q_fieldsPg.map((qfield, qindex) => (
                <div key={qindex}>
                  <br />
                  <p className="text-[24px] font-bold text-merah">
                    Form Soal Ke {qindex + 1}
                  </p>
                  <br />
                  <hr className="mr-10" />
                  <br />
                  <div className="flex flex-col items-center gap-2 border-2 border-gray-300 p-2 rounded-lg">
                    <TextArea
                      label="Soal"
                      type="text"
                      onChange={(e) =>
                        handleQFieldChange(qindex, "question", e.target.value)
                      }
                      value={qfield.question}
                      required={true}
                    />
                    <DropdownRadioInputBiological
                      required={true}
                      label="Tampilkan Soal"
                      value1={1}
                      value2={0}
                      label2="Ya"
                      label3="Tidak"
                      onChange={(e) =>
                        handleQFieldChange(
                          qindex,
                          "is_publish",
                          parseInt(e.target.value)
                        )
                      }
                      checked={qfield.is_publish}
                    />
                  </div>
                  <br />
                  <p className="font-bold text-merah mr-8 mb-2 underline flex justify-center">
                    Kunci Jawaban
                  </p>
                  <div className="flex flex-col gap-1">
                    {qfield.question_lists.map((afield, aindex) => (
                      <div
                        key={aindex}
                        className="flex flex-row items-center gap-2 border-2 border-gray-300 p-2 rounded-lg"
                      >
                        <div className="mb-10 border border-merah p-2 px-3 rounded-full">
                          <p className="text-merah font-bold text-xs">
                            {aindex + 1}
                          </p>
                        </div>
                        <div>
                          <TextInput
                            label="Jawaban"
                            type="text"
                            value={afield.answer_choice}
                            required={true}
                            onChange={(e) => {
                              const newFields = [...q_fieldsPg];
                              newFields[qindex].question_lists[
                                aindex
                              ].answer_choice = e.target.value;
                              setQFieldsPg(newFields);
                            }}
                          />
                          <DropdownRadioInputBiological
                            required={true}
                            label="Benar"
                            value1={1}
                            value2={0}
                            label2="Ya"
                            label3="Tidak"
                            onChange={(e) => {
                              const newFields = [...q_fieldsPg];
                              newFields[qindex].question_lists[
                                aindex
                              ].is_correct = parseInt(e.target.value);
                              setQFieldsPg(newFields);
                            }}
                            checked={afield.is_correct}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mr-10 flex justify-end py-5 gap-2">
                    <button
                      className="btn-mrh w-auto flex items-center text-sm gap-1"
                      title="Kurangi Kolom"
                      onClick={() => removeAField(qindex)}
                    >
                      <i className="mt-1 fa fa-minus" /> Kurangi Kunci Jawaban
                    </button>
                    <button
                      className="btn-hijau w-auto flex items-center text-sm gap-1"
                      title="Tambah Kolom "
                      onClick={() => addAField(qindex)}
                    >
                      <i className="mt-1 fa fa-plus" /> Tambah Kunci Jawaban
                    </button>
                  </div>
                  <hr className="mr-10 " />
                </div>
              ))
            : question_type === "Essay"
            ? q_fieldsEssay.map((qfield, qindex) => (
                <div key={qindex}>
                  <br />
                  <p className="text-[24px] font-bold text-merah">
                    Form Soal Ke {qindex + 1}
                  </p>
                  <br />
                  <hr className="mr-10" />
                  <br />
                  <div className="flex flex-col items-center gap-2 border-2 border-gray-300 p-2 rounded-lg">
                    <TextArea
                      label="Soal"
                      type="text"
                      onChange={(e) =>
                        handleQFieldChange(qindex, "question", e.target.value)
                      }
                      value={qfield.question}
                      required={true}
                    />
                    <DropdownRadioInputBiological
                      required={true}
                      label="Tampilkan Soal"
                      value1={1}
                      value2={0}
                      label2="Ya"
                      label3="Tidak"
                      onChange={(e) =>
                        handleQFieldChange(
                          qindex,
                          "is_publish",
                          parseInt(e.target.value)
                        )
                      }
                      checked={qfield.is_publish}
                    />
                  </div>
                  <hr className="mr-10 " />
                </div>
              ))
            : question_type === "Upload"
            ? q_fieldsUpload.map((qfield, qindex) => (
                <div key={qindex}>
                  <br />
                  <p className="text-[24px] font-bold text-merah">
                    Form Soal Ke {qindex + 1}
                  </p>
                  <br />
                  <hr className="mr-10" />
                  <br />
                  <div className="flex flex-col items-center gap-2 border-2 border-gray-300 p-2 rounded-lg">
                    <TextArea
                      label="Soal"
                      type="text"
                      onChange={(e) =>
                        handleQFieldChange(qindex, "question", e.target.value)
                      }
                      value={qfield.question}
                      required={true}
                    />
                    <DropdownRadioInputBiological
                      required={true}
                      label="Tampilkan Soal"
                      value1={1}
                      value2={0}
                      label2="Ya"
                      label3="Tidak"
                      onChange={(e) =>
                        handleQFieldChange(
                          qindex,
                          "is_publish",
                          parseInt(e.target.value)
                        )
                      }
                      checked={qfield.is_publish}
                    />
                  </div>
                  <hr className="mr-10 " />
                </div>
              ))
            : ""}
          {question_type && (
            <div className="mr-10 flex justify-center py-5 gap-2">
              <button
                className="btn-mrh w-36 flex items-center text-sm gap-1"
                title="Kurangi Kolom"
                onClick={removeQField}
              >
                <i className="mt-1 fa fa-minus" /> Kurangi Soal
              </button>
              <button
                className="btn-hijau w-36 flex items-center text-sm gap-1"
                title="Tambah Kolom "
                onClick={addQField}
              >
                <i className="mt-1 fa fa-plus" /> Tambah Soal
              </button>
            </div>
          )}
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
