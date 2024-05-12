import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateClassRoom } from "../../../api/RuanganKelas";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { updateRoom } from "../../../api/Ruangan";
import { CircularProgress } from "@mui/material";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function UbahRuangan() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);
  const { isLoading, setIsLoading } = useStateContext();

  const path = "/admin/list-ruangan";

  const navigateRuangan = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      updateRoom(
        setSts,
        navigateRuangan,
        location.state.code,
        name,
        description,
        setIsLoading
      );
    }
  };

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Daftar Ruangan"
        navPrev={path}
        at="Ubah Ruangan"
        title="Ubah Ruangan"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Ruang Kelas
        </p>
        <article>
          <TextInput
            label="Nama Ruangan"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            require
          />

          <div className="btn-form flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
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
