import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRoom } from "../../../api/Ruangan";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahRuangan() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  const path = "/admin/list-ruangan";

  const navigateRuangKelas = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postRoom(setSts, path, name, description);
    }
  };

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Daftar Ruangan"
        navePrev={path}
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
              onClick={navigateRuangKelas}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
