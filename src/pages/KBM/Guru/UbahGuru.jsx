import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateGuru } from "../../../api/Guru";
import { Header } from "../../../components";
import {
  DropdownDatePickers,
  DropdownRadioInputGender,
} from "../../../components/Dropdown";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahGuru() {
  const location = useLocation();
  const [fullname, setFullname] = useState(location.state.fullname);
  const [gender, setGender] = useState(location.state.gender);
  const [religion, setReligion] = useState(location.state.religion);
  const [birthPlace, setBirthPlace] = useState(location.state.birthPlace);
  const [birthDate, setBirthDate] = useState(
    moment(location.state.birthDate).format("YYYY-MM-DD")
  );
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const path = "/admin/list-guru";

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;
    if (
      fullname === "" ||
      gender === "" ||
      religion === "" ||
      birthPlace === "" ||
      birthDate === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateGuru(
        setSts,
        navigateGuru,
        code,
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
        prev="Guru"
        navPrev={path}
        at="Ubah Guru"
        title="Ubah Guru"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Guru
        </p>
        <article>
          <TextInput
            label="Nama Lengkap"
            type="text"
            value={fullname}
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
            // value={gender}
            checked={gender}
          />
          <br />

          <TextInput
            label="Religion"
            type="text"
            onChange={(e) => setReligion(e.target.value)}
            value={religion}
            required={true}
          />

          <TextInput
            label="Tempat Lahir"
            type="text"
            onChange={(e) => setBirthPlace(e.target.value)}
            value={birthPlace}
            required={true}
          />

          <DropdownDatePickers
            label="Tanggal Lahir"
            id="birthDate"
            change={(e) => setBirthDate(e.element.value)}
            value={moment(location.state.birthDate).format("YYYY-MM-DD")}
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
