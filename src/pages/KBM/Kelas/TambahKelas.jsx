import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKelas } from "../../../api/Kelas";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahKelas() {
  const [grade, setGrade] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(undefined);
  // const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();
  const path = "/admin/list-kelas";

  const postData = (e) => {
    e.preventDefault();

    if (grade === "" || name === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postKelas(setStatus, navigateKelas, grade, name, description);
    }
  };

  const navigateKelas = () => {
    navigate(path);
  };

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Kelas"
        navPrev={path}
        at="Tambah Kelas"
        title="Tambah Kelas"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Kelas
        </p>
        <article>
          <TextInput
            label="Kelas"
            type="number"
            name="code"
            onChange={(e) => setGrade(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama Kelas"
            type="text"
            name="code"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            name="code"
            onChange={(e) => setDescription(e.target.value)}
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
              onClick={navigateKelas}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={status}
            navigate={navigateKelas}
          />

          <ModalEmpty
            isOpenEmpty={isOpenEmpty}
            closeModalEmpty={closeModalEmpty}
            onRequestCloseEmpty={closeModalEmpty}
          /> */}
        </article>
      </div>
    </div>
  );
}
