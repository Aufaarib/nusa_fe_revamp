import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postGuru } from "../../../api/Guru";
import { Header } from "../../../components";
import { AlertEmpty } from "../../../components/ModalPopUp";
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

  const [semesterData, setSemesterData] = useState([]);

  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  // const created_by = localStorage.getItem("NAMA");

  const navigate = useNavigate();

  const path = "/admin/list-guru";

  //   const fetchSemester = async () => {
  //     getSemester(setSemesterData, setSts);
  //   };

  //   useEffect(() => {
  //     fetchSemester();
  //   }, []);

  const postData = (e) => {
    e.preventDefault();

    // const semester_id = parseInt(semester);
    // const status = statusVal.value;

    if (
      fullname.length === 0 ||
      gender.length === 0 ||
      religion.length === 0 ||
      birthPlace.length === 0 ||
      birthDate.length === 0
    ) {
      AlertEmpty();
    } else {
      postGuru(setSts, path, fullname, gender, religion, birthPlace, birthDate);
      //   setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   AlertEmpty();
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   setSts("");
  // };

  const navigateKurikulum = () => {
    navigate(path);
  };

  // const SemesterOptions = semesterData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin KBM"
          prev="List Guru"
          navePrev={path}
          at="Tambah Guru"
          title="Tambah Guru"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
            marginTop: "50px",
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
            // placeholder={admissionApplicantData.gender}
            checked={gender}
          />
          <br />
          {/* <TextInput
            label="Jenis Kelamin"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setGender(e.target.value)}
            required={true}
          /> */}

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
            onChange={(e) => setBirthPlace(e.element.value)}
            required={true}
          />

          <DropdownDatePickers
            label="Tanggal Lahir"
            id="birthDate"
            // value={parent.birthDate}
            change={(e) => setBirthDate(e.element.value)}
          />

          {/* <TextInput
            label="Tanggal Lahir"
            type="text"
            id="group"
            name="code"
            onChange={(e) => setBirthDate(e.target.value)}
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
