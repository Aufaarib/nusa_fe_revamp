import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMapel } from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { AlertEmpty } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { DropdownKurikulum } from "../../../components/Dropdown";

export default function TambahMataPelajaran() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  const path = "/admin/list-mata-pelajaran";

  const postData = (e) => {
    e.preventDefault();

    if (name.length === 0 || description.length === 0 || type.length === 0) {
      AlertEmpty();
    } else {
      postMapel(setSts, navigateMapel, name, description, type);
    }
  };

  const navigateMapel = () => {
    navigate(path);
  };

  const typeOptions = [
    {
      label: "Akademik",
      value: "academic",
    },
    {
      label: "Non-Akademik",
      value: "non-academic",
    },
    {
      label: "Akhlak",
      value: "personality",
    },
  ];

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Mata Pelajaran"
        navePrev={path}
        at="Tambah Mata Pelajaran"
        title="Tambah Mata Pelajaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Mata Pelajaran
        </p>
        <article>
          <TextInput
            label="Nama"
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
          <DropdownKurikulum
            label="Tipe"
            required={true}
            isClearable={true}
            defaultValue={type}
            isSearchable={false}
            options={typeOptions}
            onChange={(e) => setType(e.value)}
          />
          {/* <TextInput
            label="Tipe"
            type="text"
            onChange={(e) => setType(e.target.value)}
            required={true}
          /> */}

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
              onClick={navigateMapel}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
