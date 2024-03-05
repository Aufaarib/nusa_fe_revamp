import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postGuru } from "../../../api/Guru";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import {
  DropdownDatePickers,
  DropdownRadioInputGender,
} from "../../../components/Dropdown";

export default function TambahGuru() {
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const path = "/admin/list-guru";

  const postData = (e) => {
    e.preventDefault();

    if (
      fullname.length === 0 ||
      gender.length === 0 ||
      religion.length === 0 ||
      birthPlace.length === 0 ||
      birthDate.length === 0
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postGuru(
        setSts,
        navigateGuru,
        fullname,
        gender,
        religion,
        birthPlace,
        birthDate
      );
    }
  };

  const navigateGuru = () => {
    navigate(path);
  };

  return (
    <div>
      <Header
        home="Admin KBM"
        prev="List Guru"
        navPrev={path}
        at="Tambah Guru"
        title="Tambah Guru"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Guru
        </p>
        <article>
          <TextInput
            label="Nama Lengkap"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setFullname(e.target.value)}
            required={true}
          />
          <br />
          <DropdownRadioInputGender
            required={true}
            label="Jenis Kelamin"
            value1="female"
            value2="male"
            label2="Perempuan"
            label3="Laki-Laki"
            onChange={(e) => setGender(e.target.value)}
            checked={gender}
          />
          <br />

          <TextInput
            label="Religion"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setReligion(e.target.value)}
            required={true}
          />

          <TextInput
            label="Tempat Lahir"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setBirthPlace(e.target.value)}
            required={true}
          />

          <DropdownDatePickers
            label="Tanggal Lahir"
            id="birthDate"
            change={(e) => setBirthDate(e.element.value)}
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
              onClick={navigateGuru}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
