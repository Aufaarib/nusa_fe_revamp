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
import { updateGuru } from "../../../api/Guru";
import {
  DropdownDatePickers,
  DropdownRadioInputGender,
} from "../../../components/Dropdown";
import moment from "moment";

export default function UbahGuru() {
  const location = useLocation();
  const [fullname, setFullname] = useState(location.state.fullname);
  const [gender, setGender] = useState(location.state.gender);
  const [religion, setReligion] = useState(location.state.religion);
  const [birthPlace, setBirthPlace] = useState(location.state.birthPlace);
  const [birthDate, setBirthDate] = useState(
    moment(location.state.birthDate).format("YYYY-MM-DD")
  );
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  const path = "/admin/list-guru";

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;

    console.log(fullname);
    console.log(gender);
    console.log(religion);
    console.log(birthPlace);
    console.log(birthDate);

    if (
      fullname === "" ||
      gender === "" ||
      religion === "" ||
      birthPlace === "" ||
      birthDate === ""
    ) {
      AlertEmpty();
    } else {
      updateGuru(
        setSts,
        path,
        code,
        fullname,
        gender,
        religion,
        birthPlace,
        birthDate
      );
      // setisOpenStatus(true);
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
          prev="Guru"
          navePrev={path}
          at="Ubah Guru"
          title="Ubah Guru"
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
          Form Ubah Guru
        </p>
        <article>
          <TextInput
            label="Nama Lengkap"
            type="text"
            defaultValue={location.state.fullname}
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
            defaultValue={location.state.gender}
            checked={gender}
          />
          <br />

          <TextInput
            label="Religion"
            type="text"
            onChange={(e) => setReligion(e.target.value)}
            defaultValue={location.state.religion}
            required={true}
          />

          <TextInput
            label="Tempat Lahir"
            type="text"
            onChange={(e) => setBirthPlace(e.target.value)}
            defaultValue={location.state.birthPlace}
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
