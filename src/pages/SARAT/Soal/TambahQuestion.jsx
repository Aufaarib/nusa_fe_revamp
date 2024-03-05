import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postQuestion } from "../../../api/Sarat";
import { Header } from "../../../components";
import { DropdownRadioInputBiological } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput, { TextArea } from "../../../components/TextInput";

export default function TambahQuestion() {
  const location = useLocation();
  const questionSequence = location.state.questions;
  const path = "/admin/list-soal";
  const [q_fields, setQFields] = useState([
    {
      description: "",
      is_publish: { value: "" },
      a_fields: [{ description: "", correct_answer: { value: "" } }],
    },
  ]);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();
  const session_tittle = localStorage.getItem("SESSION_TITTLE");
  const session_id = localStorage.getItem("SESSION_ID");

  // console.log("q === ", q_fields);
  // console.log("a === ", q_fields[0].a_fields);

  const navigateListSession = () => {
    navigate(path, {
      state: {
        session_tittle: session_tittle,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();
    const sequence = questionSequence + 1;
    const session_detail_id = parseInt(session_id);

    console.log("q_fields === ", q_fields);

    if (sequence === "" || session_detail_id === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postQuestion(
        setSts,
        navigateListSession,
        session_detail_id,
        sequence,
        q_fields
      );
    }
  };

  const handleQFieldChange = (index, fieldName, value) => {
    const newFields = [...q_fields];
    newFields[index][fieldName] = value;
    setQFields(newFields);
  };

  // Function to add a new set of fields
  const addAField = (aindex) => {
    const newFields = [...q_fields];
    newFields[aindex].a_fields.push({
      description: "",
      correct_answer: { value: "" },
    });
    setQFields(newFields);
  };

  const removeAField = (qindex) => {
    const newFields = [...q_fields];
    newFields[qindex].a_fields.pop();
    setQFields(newFields);
  };

  const addQField = () => {
    setQFields([
      ...q_fields,
      {
        description: "",
        is_publish: { value: "" },
        a_fields: [{ description: "", correct_answer: { value: "" } }],
      },
    ]);
  };

  const removeQField = () => {
    const newFields = [...q_fields];
    newFields.pop();
    setQFields(newFields);
  };

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
        <article>
          {q_fields.map((qfield, qindex) => (
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
                    handleQFieldChange(qindex, "description", e.target.value)
                  }
                  value={qfield.description}
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
                {qfield.a_fields.map((afield, aindex) => (
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
                        value={afield.description}
                        required={true}
                        onChange={(e) => {
                          const newFields = [...q_fields];
                          newFields[qindex].a_fields[aindex].description =
                            e.target.value;
                          setQFields(newFields);
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
                          const newFields = [...q_fields];
                          newFields[qindex].a_fields[aindex].correct_answer =
                            parseInt(e.target.value);
                          setQFields(newFields);
                        }}
                        checked={afield.correct_answer}
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
          ))}
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
