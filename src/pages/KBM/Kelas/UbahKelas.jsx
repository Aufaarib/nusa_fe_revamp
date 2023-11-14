import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateKelas } from "../../../api/Kelas";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahKelas() {
  const location = useLocation();
  const navigate = useNavigate();
  const [grade, setGrade] = useState(location.state.grade);
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);

  const path = "/admin/list-kelas";

  const postData = (e) => {
    e.preventDefault();
    const id = location.state.id;

    if (grade === "" || name === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateKelas(setSts, navigateKelas, grade, name, description, id);
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
        navePrev={path}
        at="Ubah Kelas"
        title="Ubah Kelas"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Kelas
        </p>
        <article>
          {/* COL 1 */}
          <section>
            <TextInput
              label="Kelas"
              type="number"
              defaultValue={location.state.grade}
              onChange={(e) => setGrade(e.target.value)}
              required={true}
            />
            <TextInput
              label="Nama Kelas"
              type="text"
              defaultValue={location.state.name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <TextInput
              label="Deskripsi"
              type="text"
              defaultValue={location.state.description}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
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
