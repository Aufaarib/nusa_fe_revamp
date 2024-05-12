import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRoom } from "../../../api/Ruangan";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

export default function TambahRuangan() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();

  const path = "/admin/list-ruangan";

  const navigateRuangan = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "" || description === "") {
      setIsLoading(false);
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postRoom(setSts, navigateRuangan, name, description, setIsLoading);
    }
  };

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Daftar Ruangan"
        navPrev={path}
        at="Tambah Ruangan"
        title="Tambah Ruangan "
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Ruangan
        </p>
        <article>
          <TextInput
            label="Nama Ruangan"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
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
              onClick={navigateRuangan}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
