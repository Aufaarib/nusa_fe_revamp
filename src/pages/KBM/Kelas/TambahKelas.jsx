import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKelas } from "../../../api/Kelas";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

export default function TambahKelas() {
  const [grade, setGrade] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(undefined);
  // const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();
  const path = "/admin/list-kelas";

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (grade === "" || name === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      postKelas(
        setStatus,
        navigateKelas,
        grade,
        name,
        description,
        setIsLoading
      );
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

          <div className="btn-form flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
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
        </article>
      </div>
    </div>
  );
}
