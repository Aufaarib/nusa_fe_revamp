import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateClassRoom } from "../../../api/RuanganKelas";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { updateRoom } from "../../../api/Ruangan";

export default function UbahRuangan() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);

  const path = "/admin/list-ruangan";

  const navigateRuangKelas = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateRoom(setSts, path, location.state.code, name, description);
    }
  };

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Daftar Ruangan"
        navePrev={path}
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

          <div className="btn-form">
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
