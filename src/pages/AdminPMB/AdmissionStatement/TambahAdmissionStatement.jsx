import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAdmissionStatement } from "../../../api/AdmissionStatement";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahAdmissionStatement() {
  const [sts, setSts] = useState(undefined);
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const path = "/admin/list-pertanyaan-pernyataan";

  const postData = (e) => {
    e.preventDefault();

    if (question === 0) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postAdmissionStatement(setSts, navigateDataPendaftaran, question);
    }
  };

  const navigateDataPendaftaran = () => {
    navigate(path);
  };

  return (
    <div>
      <Header
        home="Admin PMB"
        prev="Setup PMB"
        navePrev={path}
        at="Pertanyaan Pernyataan"
        title="Tambah Pertanyaan Pernyataan"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Pertanyaan Pernyataan
        </p>
        <article>
          <TextInput
            label="Pertanyaan"
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            required={true}
          />
          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Tambah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateDataPendaftaran}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
