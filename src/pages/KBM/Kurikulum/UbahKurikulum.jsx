import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateKurikulum } from "../../../api/Kurikulum";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

export default function UbahKurikulum() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);
  const path = "/admin/list-kurikulum";

  const navigateKurikulum = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const code = location.state.code;

    updateKurikulum(
      setSts,
      navigateKurikulum,
      code,
      name,
      description,
      setIsLoading
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          home="Admin KBM"
          prev="Kurikulum"
          navPrev={path}
          at="Ubah Kurikulum"
          title="Ubah Kurikulum"
        />
      </div>
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Kurikulum
        </p>
        <article>
          <section>
            <TextInput
              label="Nama"
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
              required={true}
            />
          </section>
          <div className="btn-form flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
            <button
              type="button"
              className="w-20 btn-merah flex flex-row justify-center mb-5"
              onClick={postData}
            >
              Ubah
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
