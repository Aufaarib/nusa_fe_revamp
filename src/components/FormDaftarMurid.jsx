import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import moment from "moment/moment";
import {
  DropdownDatePickers,
  DropdownListComponents,
  DropdownRadioInputBloodType,
  DropdownRadioInputGender,
} from "./Dropdown";
import TextInput from "./TextInput";
import { useStateContext } from "../contexts/ContextProvider";
import { getAdmissionRegistrationApplicant } from "../api/Registrasi";
import { dropdownData } from "../data/initData";
import Header from "./Header";
import {
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
  AlertUpdateStatusAktif,
} from "./ModalPopUp";

const FormDaftarMurid = ({ indexMurid }) => {
  const token = localStorage.getItem("TOKEN");
  const {
    students,
    setStudents,
    errMsg,
    setErrMsg,
    setSuccessMsg,
    openForm,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [admissionApplicantData, setAdmissionApplicant] = useState({});
  const [sts, setSts] = useState(false);
  const [student, setStudent] = useState({});
  // const [firstName, setFirstName] = useState("");
  // const [middleName, setMiddleName] = useState("");
  // const [religion, setReligion] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [childStatus, setChildStatus] = useState("");
  // const [childNumber, setChildNumber] = useState("");
  // const [height, setHeight] = useState("");
  // const [birthPlace, setBirthPlace] = useState("");
  // const [gender, setGender] = useState("");
  // const [bloodType, setBloodType] = useState("");
  // const [hobby, setHobby] = useState("");
  // const [weight, setweight] = useState("");
  // const [familyIdentityNumber, setFamilyIdentityNumber] = useState("");
  // const [distanceFromHome, setDistanceFromHome] = useState("");
  // const distanceFromHome = parseInt(student.distanceFromHome);
  // const transportation = student.transportation;
  // const schoolOriginClass = student.schoolOriginClass;
  // const schoolOriginName = student.schoolOriginName;
  // const characteristic = student.characteristic;
  // const healthRecord = student.healthRecord;
  // const identityNumber = student.identityNumber;
  const [isLoading, setIsLoading] = useState(false);
  const path = "/pmb/tahapan-pmb";
  const regNumber = localStorage.getItem("REG_NUMBER");

  const fetchAdmissonApplicant = async () => {
    getAdmissionRegistrationApplicant(setAdmissionApplicant, setSts);
  };

  useEffect(() => {
    fetchAdmissonApplicant();
    if (Object.keys(student).length == 0) {
      setStudent(students[indexMurid]);
    }
  }, [student]);

  const updateStudents = (e) => {
    const fieldName = e.target.id;
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
    console.log("STUDENT DATA === ", student);
  };

  const updateStudentCal = (e) => {
    const fieldName = e.element.id;
    // console.log("fieldName ===> ", e)
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.element.value,
    }));
  };

  const updateStudentDropDownCal = (e) => {
    const fieldName = e.element.id;
    // console.log("fieldName ===> ", e)
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.value,
    }));
  };

  const updateStudentRadio = (e) => {
    const fieldName = e.target.name;
    setStudent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const firstName = student.firstName;
    const middleName = student.middleName;
    const religion = student.religion;
    const lastName = student.lastName;
    const childStatus = student.childStatus;
    const childNumber = parseInt(student.childNumber);
    const height = parseInt(student.height);
    const birthPlace = student.birthPlace;
    const birthDate = student.birthDate;
    const gender = student.gender;
    const bloodType = student.bloodType;
    const hobby = student.hobby;
    const weight = parseInt(student.weight);
    const familyIdentityNumber = student.familyIdentityNumber;
    const distanceFromHome = parseInt(student.distanceFromHome);
    const transportation = student.transportation;
    const schoolOriginClass = student.schoolOriginClass;
    const schoolOriginName = student.schoolOriginName;
    const characteristic = student.characteristic;
    const healthRecord = student.healthRecord;
    const identityNumber = student.identityNumber;

    axios
      .post(
        process.env.REACT_APP_BASE_URL +
          `/admission/registration/${regNumber}/applicant`,
        {
          firstName,
          middleName,
          lastName,
          childStatus,
          childNumber,
          height,
          religion,
          birthPlace,
          birthDate,
          gender,
          bloodType,
          hobby,
          weight,
          familyIdentityNumber,
          distanceFromHome,
          transportation,
          schoolOriginClass,
          schoolOriginName,
          characteristic,
          healthRecord,
          identityNumber,
        },
        {
          headers: { authorization: token },
        }
      )
      .then(() => {
        setIsLoading(false);
        AlertStatusUpdateSuccess();
      })
      .catch(() => {
        setIsLoading(false);
        AlertStatusUpdateFailed();
      });
  };

  return (
    <article>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Pendaftaran Murid"
        title="Form Pendaftaran Murid"
      />
      <div style={{ maxWidth: "145vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "block", gap: "20px", padding: "20px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendaftaran Murid</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>
          {admissionApplicantData !== null ? (
            <section className="xs:col-span-3 lg:col-span-1 mt-5">
              <TextInput
                label="Nama Depan"
                type="text"
                id="firstName"
                // onChange={updateStudents}
                // value={student.firstName}
                placeholder={admissionApplicantData.firstName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Agama"
                type="text"
                id="religion"
                // onChange={updateStudents}
                // value={student.religion}
                placeholder={admissionApplicantData.religion}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nama Tengah"
                type="text"
                id="middleName"
                // onChange={updateStudents}
                // value={student.middleName}
                placeholder={admissionApplicantData.middleName}
                disable={true}
                required={false}
              />
              <TextInput
                label="Nama Belakang"
                type="text"
                id="lastName"
                // onChange={updateStudents}
                // value={student.lastName}
                placeholder={admissionApplicantData.lastName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Status Anak"
                type="text"
                id="childStatus"
                // onChange={updateStudents}
                // value={student.childStatus}
                placeholder={admissionApplicantData.childStatus}
                disable={true}
                required={true}
              />
              <TextInput
                label="Anak ke"
                type="number"
                id="childNumber"
                // onChange={updateStudents}
                // value={student.childNumber}
                placeholder={admissionApplicantData.childNumber}
                disable={true}
                required={true}
                min="1"
              />
              <TextInput
                label="Tinggi Badan Anak (cm)"
                type="number"
                id="height"
                // onChange={updateStudents}
                // value={student.height}
                placeholder={admissionApplicantData.height + " cm"}
                disable={true}
                required={true}
                min="1"
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                // onChange={updateStudents}
                // value={student.birthPlace}
                placeholder={admissionApplicantData.birthPlace}
                disable={true}
                required={true}
              />
              <TextInput
                label="Tanggal Lahir"
                type="text"
                id="birthDate"
                // onChange={updateStudents}
                // value={student.birthDate}
                placeholder={moment(admissionApplicantData.birthDate).format(
                  "DD-MM-YYYY"
                )}
                disable={true}
                required={true}
              />
              {admissionApplicantData.gender === "male" ? (
                <TextInput
                  label="Jenis Kelamin"
                  type="text"
                  id="gender"
                  // onChange={updateStudents}
                  // value={student.gender}
                  placeholder="Laki-Laki"
                  disable={true}
                  required={true}
                />
              ) : (
                <TextInput
                  label="Jenis Kelamin"
                  type="text"
                  id="gender"
                  // onChange={updateStudents}
                  // value={student.gender}
                  placeholder="Perempuan"
                  disable={true}
                  required={true}
                />
              )}
              <TextInput
                label="Golongan Darah"
                type="text"
                id="bloodType"
                // onChange={updateStudents}
                // value={student.bloodType}
                placeholder={admissionApplicantData.bloodType}
                disable={true}
                required={true}
              />
              <TextInput
                label="Hobi Anak"
                type="text"
                id="hobby"
                // onChange={updateStudents}
                // value={student.hobby}
                placeholder={admissionApplicantData.hobby}
                disable={true}
                required={true}
              />
              <TextInput
                label="Berat Badan Anak (Kg)"
                type="number"
                id="weight"
                // onChange={updateStudents}
                // value={student.weight}
                placeholder={admissionApplicantData.weight}
                disable={true}
                required={true}
                min="1"
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="text"
                id="familyIdentityNumber"
                // onChange={updateStudents}
                // value={student.familyIdentityNumber}
                placeholder={admissionApplicantData.familyIdentityNumber}
                disable={true}
                required={true}
              />
              <TextInput
                label="Jarak Rumah ke Sekolah (Km)"
                type="number"
                id="distanceFromHome"
                // onChange={updateStudents}
                // value={student.distanceFromHome}
                placeholder={admissionApplicantData.distanceFromHome + " Km"}
                disable={true}
                required={false}
                min="1"
              />
              <TextInput
                label="Transportasi ke Sekolah"
                type="text"
                id="transportation"
                // onChange={updateStudents}
                // value={student.transportation}
                placeholder={admissionApplicantData.transportation}
                disable={true}
                required={true}
              />
              <TextInput
                label="Kelas Pada Saat Mendaftar"
                type="number"
                id="schoolOriginClass"
                // onChange={updateStudents}
                // value={student.schoolOriginClass}
                placeholder={admissionApplicantData.schoolOriginClass}
                disable={true}
                required={true}
                min="1"
                max="6"
              />
              <TextInput
                label="Asal Sekolah"
                type="text"
                id="schoolOriginName"
                // onChange={updateStudents}
                // value={student.schoolOriginName}
                placeholder={admissionApplicantData.schoolOriginName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Sifat Dominan Anak"
                type="text"
                id="characteristic"
                // onChange={updateStudents}
                // value={student.characteristic}
                placeholder={admissionApplicantData.characteristic}
                disable={true}
                required={true}
              />
              <TextInput
                label="Penyakit Berat yang Pernah Diderita"
                type="text"
                id="healthRecord"
                // onChange={updateStudents}
                // value={student.healthRecord}
                placeholder={admissionApplicantData.healthRecord}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nomor Akta Lahir Anak"
                type="text"
                id="identityNumber"
                // onChange={updateStudents}
                // value={student.identityNumber}
                placeholder={admissionApplicantData.identityNumber}
                disable={true}
                required={true}
              />
            </section>
          ) : (
            <section className="xs:col-span-3 lg:col-span-1 mt-5">
              <TextInput
                label="Nama Depan"
                type="text"
                id="firstName"
                onChange={updateStudents}
                value={student.firstName}
                // placeholder={admissionApplicantData.firstName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Agama"
                type="text"
                id="religion"
                onChange={updateStudents}
                value={student.religion}
                // placeholder={admissionApplicantData.religion}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nama Tengah"
                type="text"
                id="middleName"
                onChange={updateStudents}
                value={student.middleName}
                // placeholder={admissionApplicantData.middleName}
                disable={false}
                required={false}
              />
              <TextInput
                label="Nama Belakang"
                type="text"
                id="lastName"
                onChange={updateStudents}
                value={student.lastName}
                // placeholder={admissionApplicantData.lastName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Status Anak"
                type="text"
                id="childStatus"
                onChange={updateStudents}
                value={student.childStatus}
                // placeholder={admissionApplicantData.childStatus}
                disable={false}
                required={true}
              />
              <TextInput
                label="Anak ke"
                type="number"
                id="childNumber"
                onChange={updateStudents}
                value={student.childNumber}
                // placeholder={admissionApplicantData.childNumber}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Tinggi Badan Anak (cm)"
                type="number"
                id="height"
                onChange={updateStudents}
                value={student.height}
                // placeholder={admissionApplicantData.height + " cm"}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={updateStudents}
                value={student.birthPlace}
                // placeholder={admissionApplicantData.birthPlace}
                disable={false}
                required={true}
              />
              <DropdownDatePickers
                label="Tanggal Lahir"
                id="birthDate"
                value={student.birthDate}
                change={updateStudentCal.bind(this)}
              />
              <DropdownRadioInputGender
                required={true}
                label="Jenis Kelamin"
                value1="female"
                value2="male"
                label2="Perempuan"
                label3="Laki-Laki"
                onChange={updateStudentRadio}
                // placeholder={admissionApplicantData.gender}
                checked={student.gender}
              />
              <DropdownRadioInputBloodType
                required={true}
                label="Golongan Darah"
                onChange={updateStudentRadio}
                // placeholder={admissionApplicantData.bloodType}
                checked={student.bloodType}
              />
              <TextInput
                label="Hobi Anak"
                type="text"
                id="hobby"
                onChange={updateStudents}
                value={student.hobby}
                // placeholder={admissionApplicantData.hobby}
                disable={false}
                required={true}
              />
              <TextInput
                label="Berat Badan Anak (Kg)"
                type="number"
                id="weight"
                onChange={updateStudents}
                value={student.weight}
                // placeholder={admissionApplicantData.weight}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="text"
                id="familyIdentityNumber"
                onChange={updateStudents}
                value={student.familyIdentityNumber}
                // placeholder={admissionApplicantData.familyIdentityNumber}
                disable={false}
                required={true}
              />
              <TextInput
                label="Jarak Rumah ke Sekolah (Km)"
                type="number"
                id="distanceFromHome"
                onChange={updateStudents}
                value={student.distanceFromHome}
                // placeholder={admissionApplicantData.distanceFromHome + " Km"}
                disable={false}
                required={false}
                min="1"
              />
              <DropdownListComponents
                required={true}
                label="Transportasi ke Sekolah"
                // placeholder={admissionApplicantData.transportation}
                disable={false}
                id="transportation"
                dataSource={dropdownData.transportasiSekolah}
                // fields={{ value: "text", text: "text" }}
                value={student.transportation}
                change={updateStudentDropDownCal.bind(this)}
                popupHeight="auto"
              />

              <TextInput
                label="Kelas Pada Saat Mendaftar"
                type="number"
                id="schoolOriginClass"
                onChange={updateStudents}
                value={student.schoolOriginClass}
                // placeholder={admissionApplicantData.schoolOriginClass}
                disable={false}
                required={true}
                min="1"
                max="6"
              />
              <TextInput
                label="Asal Sekolah"
                type="text"
                id="schoolOriginName"
                onChange={updateStudents}
                value={student.schoolOriginName}
                // placeholder={admissionApplicantData.schoolOriginName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Sifat Dominan Anak"
                type="text"
                id="characteristic"
                onChange={updateStudents}
                value={student.characteristic}
                // placeholder={admissionApplicantData.characteristic}
                disable={false}
                required={true}
              />
              <TextInput
                label="Penyakit Berat yang Pernah Diderita"
                type="text"
                id="healthRecord"
                onChange={updateStudents}
                value={student.healthRecord}
                // placeholder={admissionApplicantData.healthRecord}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Akta Lahir Anak"
                type="text"
                id="identityNumber"
                onChange={updateStudents}
                value={student.identityNumber}
                // placeholder={admissionApplicantData.identityNumber}
                disable={false}
                required={true}
              />
            </section>
          )}
        </form>
      </div>

      <section className="flex mt-12">
        {admissionApplicantData !== null && (
          <button type="button" className="w-auto btn-disabled">
            Data Sudah Tersimpan
          </button>
        )}
        {admissionApplicantData === null && (
          <button
            type="button"
            className="w-auto btn-merah"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <CgSpinner className="mr-2 text-xl animate-spin" />
            ) : (
              <AiOutlineSave className="mr-2 text-2xl" />
            )}
            Simpan
          </button>
        )}

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/tahapan-pmb"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali Ke
            Tahapan
          </Link>

          <Link
            to={"/pmb/form-data-orang-tua-ayah"}
            className={`${
              openForm == "form_murid" && "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap`}
          >
            Pendaftaran Ayah <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormDaftarMurid;
