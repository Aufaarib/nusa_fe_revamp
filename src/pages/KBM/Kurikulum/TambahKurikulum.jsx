import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKurikulum } from "../../../api/Kurikulum";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahKurikulum() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const path = "/admin/list-kurikulum";

  const postData = (e) => {
    e.preventDefault();

    if (name.length === 0 || description.length === 0) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postKurikulum(setSts, path, name, description);
    }
  };

  const navigateKurikulum = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin KBM"
          prev="Kurikulum"
          navePrev={path}
          at="Tambah Kurikulum"
          title="Tambah Kurikulum"
        />
      </div>
      <div style={{ padding: "44px 154px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Kurikulum
        </p>
        <article>
          <TextInput
            label="Nama"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            id="group"
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
              onClick={navigateKurikulum}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
