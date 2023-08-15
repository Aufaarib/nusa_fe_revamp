import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMurid } from "../../../api/Murid";
import { Header } from "../../../components";
import {
  DropdownDatePickers,
  DropdownRadioInputBloodType,
  DropdownRadioInputGender,
} from "../../../components/Dropdown";
import { AlertEmpty } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahMurid() {
  const location = useLocation();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [middleName, setMiddleName] = useState(location.state.middleName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [gender, setGender] = useState(location.state.gender);
  const [religion, setReligion] = useState(location.state.religion);
  const [birthPlace, setBirthPlace] = useState(location.state.birthPlace);
  const [bloodType, setBloodType] = useState(location.state.bloodType);
  const [distanceFromHome, setDistanceFromHome] = useState(
    location.state.distanceFromHome
  );
  const [birthDate, setBirthDate] = useState(
    moment(location.state.birthDate).format("YYYY-MM-DD")
  );
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();

  const path = "/admin/list-murid";

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;

    // console.log(fullname);
    // console.log(gender);
    // console.log(religion);
    // console.log(birthPlace);
    // console.log(birthDate);

    if (
      firstName === "" ||
      middleName === "" ||
      lastName === "" ||
      gender === "" ||
      religion === "" ||
      birthPlace === "" ||
      birthDate === "" ||
      bloodType === "" ||
      distanceFromHome === ""
    ) {
      AlertEmpty();
    } else {
      updateMurid(
        setSts,
        path,
        code,
        religion,
        firstName,
        middleName,
        lastName,
        birthPlace,
        birthDate,
        gender,
        bloodType,
        distanceFromHome
      );
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
          prev="Murid"
          navePrev={path}
          at="Ubah Murid"
          title="Ubah Murid"
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
          Form Ubah Murid
        </p>
        <article>
          <TextInput
            label="Nama Depan"
            type="text"
            defaultValue={location.state.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama Tengah"
            type="text"
            defaultValue={location.state.middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            required={false}
          />
          <TextInput
            label="Nama Akhir"
            type="text"
            defaultValue={location.state.lastName}
            onChange={(e) => setLastName(e.target.value)}
            required={false}
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

          {/* <TextInput
            label="Religion"
            type="text"
            onChange={(e) => setReligion(e.target.value)}
            defaultValue={location.state.religion}
            required={true}
          /> */}

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
            required={true}
          />
          <br />
          <DropdownRadioInputBloodType
            required={true}
            label="Golongan Darah"
            onChange={(e) => setBloodType(e.target.value)}
            defaultValue={location.state.birthPlace}
            checked={bloodType}
          />
          <br />
          <TextInput
            label="Jarak Ke Sekolah"
            type="text"
            onChange={(e) => setDistanceFromHome(e.target.value)}
            defaultValue={location.state.birthPlace}
            required={true}
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
        </article>
      </div>
    </div>
  );
}
