import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMapel } from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { DropdownKurikulum } from "../../../components/Dropdown";

export default function UbahMataPelajaran() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.course_name);
  const [types, setType] = useState({
    value: location.state.type,
    label: location.state.type,
  });
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);
  const path = "/admin/list-mata-pelajaran";

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;
    const type = types.value;

    if (name.length === 0 || description.length === 0 || type.length === 0) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateMapel(setSts, code, navigateMapel, name, description, type);
    }
  };

  const navigateMapel = () => {
    navigate(path);
  };

  const typeOptions = [
    { value: "academic", label: "Akademik" },
    { value: "non-academic", label: "Non-Akademik" },
    { value: "personality", label: "Akhlaq" },
  ];

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="Mata Pelajaran"
        navPrev={path}
        at="Ubah Mata Pelajaran"
        title="Ubah Mata Pelajaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Mata Pelajaran
        </p>
        <article>
          {/* COL 1 */}
          <section>
            <TextInput
              label="Name"
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
            <DropdownKurikulum
              label="Tipe"
              required={true}
              isClearable={true}
              defaultValue={types}
              isSearchable={false}
              options={typeOptions}
              onChange={setType}
            />
            {/* <TextInput
              label="Tipe"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required={true}
            /> */}
          </section>

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
