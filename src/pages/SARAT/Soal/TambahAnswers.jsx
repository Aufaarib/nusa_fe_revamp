import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAnswers, postQuestion } from "../../../api/Sarat";
import { Header } from "../../../components";
import { DropdownRadioInputBiological } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput, { TextArea } from "../../../components/TextInput";

export default function TambahAnswers() {
  const location = useLocation();
  const path = "/admin/detail-soal";
  const [fields, setFields] = useState([
    {
      description: "",
      correct_answer: { value: "" },
    },
  ]);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  const navigateListSession = () => {
    navigate(path, {
      state: {
        question_id: location.state.question_id,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();

    console.log("fields === ", fields);

    if (fields.description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postAnswers(
        setSts,
        navigateListSession,
        location.state.question_id,
        fields
      );
    }
  };

  const handleFieldChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  const addQField = () => {
    setFields([
      ...fields,
      {
        description: "",
        correct_answer: { value: "" },
      },
    ]);
  };

  const removeQField = () => {
    const newFields = [...fields];
    newFields.pop();
    setFields(newFields);
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Jawaban"
        navPrev={path}
        at="Tambah Pilihan Jawaban"
        title="Tambah Pilihan Jawaban"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <article>
          <br />
          <p className="font-bold text-merah mr-8">
            Form Tambah Pilihan Jawaban
          </p>
          {fields.map((field, index) => (
            <div key={index}>
              <br />
              <TextInput
                label="Jawaban"
                type="text"
                value={field.description}
                required={true}
                onChange={(e) => {
                  handleFieldChange(index, "description", e.target.value);
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
                  handleFieldChange(
                    index,
                    "correct_answer",
                    parseInt(e.target.value)
                  );
                }}
                checked={field.correct_answer}
              />
              <br />
            </div>
          ))}
          <div className="mr-10 flex justify-end py-5 gap-2">
            <button
              className="btn-mrh w-auto flex items-center text-sm gap-1"
              title="Kurangi Kolom"
              onClick={removeQField}
            >
              <i className="mt-1 fa fa-minus" /> Kurangi
            </button>
            <button
              className="btn-hijau w-auto flex items-center text-sm gap-1"
              title="Tambah Kolom "
              onClick={addQField}
            >
              <i className="mt-1 fa fa-plus" /> Tambah
            </button>
          </div>
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
