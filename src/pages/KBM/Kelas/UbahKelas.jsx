import React from "react";
import TextInput from "../../../components/TextInput";
import { updateKelas } from "../../../api/Kelas";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../../components";

export default function UbahKelas() {
  const [grade, setGrade] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  const path = "/admin/list-kelas";

  const postData = (e) => {
    e.preventDefault();
    const id = location.state.id;

    if (grade === "" || name === "" || description === "") {
      AlertEmpty();
    } else {
      updateKelas(setSts, path, grade, name, description, id);
    }
  };

  const navigateKelas = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin KBM"
          prev="Kelas"
          navePrev={path}
          at="Ubah Kelas"
          title="Ubah Kelas"
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
          Form Ubah Kelas
        </p>
        <article>
          {/* COL 1 */}
          <section>
            <TextInput
              label="Kelas"
              type="text"
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

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
            navigate={navigateKelas}
          />

          <ModalEmpty
            isOpenEmpty={isOpenEmpty}
            closeModalEmpty={closeModalEmpty}
            onRequestCloseEmpty={closeModalEmpty}
          /> */}
        </article>
      </div>
    </div>
  );
}
