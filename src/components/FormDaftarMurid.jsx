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
  DropdownRadioInputBiological,
  DropdownRadioInputBloodType,
  DropdownRadioInputGender,
} from "./Dropdown";
import TextInput from "./TextInput";
import { useStateContext } from "../contexts/ContextProvider";
import { getAdmissionRegistrationApplicant } from "../api/Registrasi";
import { dropdownData } from "../data/initData";
import Header from "./Header";
import {
  AlertEmpty,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
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
  const [namaDepan, setFirstName] = useState("");
  const [namaTengah, setMiddleName] = useState("");
  // const [agama, setReligion] = useState("");
  const [namaAkhir, setLastName] = useState("");
  const [statusAnak, setChildStatus] = useState("");
  const [anakKe, setChildNumber] = useState("");
  const [tinggi, setHeight] = useState("");
  const [tempatLahir, setBirthPlace] = useState("");
  const [tanggalLahir, setBirthDate] = useState("");
  const [jenisKelamin, setGender] = useState("");
  const [golonganDarah, setBloodType] = useState("");
  const [hobi, setHobby] = useState("");
  const [berat, setWeight] = useState("");
  const [noKK, setFamilyIdentityNumber] = useState("");
  const [jarak, setDistanceFromHome] = useState("");
  const [transportasi, setTransportation] = useState("");
  const [kelasSaatMendaftar, setSchoolOriginClass] = useState("");
  const [asalSekolah, setSchoolOriginName] = useState("");
  const [karakter, setCharacteristic] = useState("");
  const [kesehatan, setHealthRecord] = useState("");
  const [noAktaLahir, setIdentityNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const path = "/pmb/tahapan-pmb";
  const regNumber = localStorage.getItem("REG_NUMBER");

  const fetchAdmissonApplicant = async () => {
    getAdmissionRegistrationApplicant(setAdmissionApplicant, setSts);
  };

  useEffect(() => {
    fetchAdmissonApplicant();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const firstName = namaDepan;
    const middleName = namaTengah;
    const religion = "Islam";
    const lastName = namaAkhir;
    const childStatus = statusAnak;
    const childNumber = parseInt(anakKe);
    const height = parseInt(tinggi);
    const birthPlace = tempatLahir;
    const birthDate = tanggalLahir;
    const gender = jenisKelamin;
    const bloodType = golonganDarah;
    const hobby = hobi;
    const weight = parseInt(berat);
    const familyIdentityNumber = noAktaLahir;
    const distanceFromHome = parseInt(jarak);
    const transportation = transportasi;
    const schoolOriginClass = kelasSaatMendaftar;
    const schoolOriginName = asalSekolah;
    const characteristic = karakter;
    const healthRecord = kesehatan;
    const identityNumber = noAktaLahir;

    if (
      identityNumber == "" ||
      healthRecord == "" ||
      characteristic == "" ||
      schoolOriginName == "" ||
      schoolOriginClass == "" ||
      transportation == "" ||
      distanceFromHome === 0 ||
      familyIdentityNumber == "" ||
      weight === 0 ||
      hobby == "" ||
      bloodType == "" ||
      gender == "" ||
      birthDate == "" ||
      birthPlace == "" ||
      height === 0 ||
      childNumber === 0 ||
      childStatus == "" ||
      lastName == "" ||
      religion == "" ||
      middleName == "" ||
      firstName == ""
    ) {
      setIsLoading(false);
      AlertEmpty();
    } else {
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
          AlertStatusTambahSuccess("/pmb/form-data-murid");
        })
        .catch(() => {
          setIsLoading(false);
          AlertStatusTambahFailed();
        });
    }
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const firstName = namaDepan;
    const middleName = namaTengah;
    const religion = "Islam";
    const lastName = namaAkhir;
    const childStatus = statusAnak;
    const childNumber = parseInt(anakKe);
    const height = parseInt(tinggi);
    const birthPlace = tempatLahir;
    const birthDate = tanggalLahir;
    const gender = jenisKelamin;
    const bloodType = golonganDarah;
    const hobby = hobi;
    const weight = parseInt(berat);
    const familyIdentityNumber = noAktaLahir;
    const distanceFromHome = parseInt(jarak);
    const transportation = transportasi;
    const schoolOriginClass = kelasSaatMendaftar;
    const schoolOriginName = asalSekolah;
    const characteristic = karakter;
    const healthRecord = kesehatan;
    const identityNumber = noAktaLahir;

    if (
      identityNumber == "" ||
      healthRecord == "" ||
      characteristic == "" ||
      schoolOriginName == "" ||
      schoolOriginClass == "" ||
      transportation == "" ||
      distanceFromHome == 0 ||
      familyIdentityNumber == "" ||
      weight === 0 ||
      hobby == "" ||
      bloodType == "" ||
      gender == "" ||
      birthDate == "" ||
      birthPlace == "" ||
      height == 0 ||
      childNumber == 0 ||
      childStatus == "" ||
      lastName == "" ||
      religion == "" ||
      middleName == "" ||
      firstName == ""
    ) {
      AlertEmpty();
      setIsLoading(false);
    } else {
      axios
        .put(
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
          AlertStatusTambahSuccess("/pmb/form-data-murid");
        })
        .catch(() => {
          setIsLoading(false);
          AlertStatusTambahFailed();
        });
    }
  };

  return (
    <>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Pendaftaran Murid"
        title="Form Pendaftaran Murid"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          // onSubmit={handleSubmit}
          style={{ display: "block", gap: "20px", padding: "20px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendataan Murid</h1>
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
                onChange={(e) => setFirstName(e.target.value)}
                value={namaDepan}
                // defaultValue={admissionApplicantData.firstName}
                placeholder={admissionApplicantData.firstName}
                disable={false}
                required={true}
              />
              {/* <TextInput
                label="Agama"
                type="text"
                id="religion"
                onChange={(e) => setReligion(e.target.value)}
                value={agama}
                placeholder={admissionApplicantData.religion}
                // defaultValue={admissionApplicantData.religion}
                disable={false}
                required={true}
              /> */}
              <TextInput
                label="Nama Tengah"
                type="text"
                id="middleName"
                onChange={(e) => setMiddleName(e.target.value)}
                value={namaDepan}
                placeholder={admissionApplicantData.middleName}
                // defaultValue={admissionApplicantData.middleName}
                disable={false}
                required={false}
              />
              <TextInput
                label="Nama Belakang"
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={namaAkhir}
                placeholder={admissionApplicantData.lastName}
                // defaultValue={admissionApplicantData.lastName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Status Anak"
                type="text"
                id="childStatus"
                onChange={(e) => setChildStatus(e.target.value)}
                value={statusAnak}
                placeholder={admissionApplicantData.childStatus}
                // defaultValue={admissionApplicantData.childStatus}
                disable={false}
                required={true}
              />
              <TextInput
                label="Anak ke"
                type="number"
                id="childNumber"
                onChange={(e) => setChildNumber(e.target.value)}
                value={anakKe}
                placeholder={admissionApplicantData.childNumber}
                // defaultValue={admissionApplicantData.childNumber}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Tinggi Badan Anak (cm)"
                type="number"
                id="height"
                onChange={(e) => setHeight(e.target.value)}
                value={tinggi}
                placeholder={admissionApplicantData.height + " cm"}
                // defaultValue={admissionApplicantData.height}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={(e) => setBirthPlace(e.target.value)}
                value={tempatLahir}
                placeholder={admissionApplicantData.birthPlace}
                // defaultValue={admissionApplicantData.birthPlace}
                disable={false}
                required={true}
              />
              <TextInput
                label="Tanggal Lahir"
                type="text"
                id="birthPlace"
                placeholder={moment(admissionApplicantData.birthDate).format(
                  "DD-MM-YYYY"
                )}
                disable={false}
                required={true}
              />
              <DropdownDatePickers
                label="Ubah Tanggal Lahir"
                id="birthDate"
                value={tanggalLahir}
                defaultValue={admissionApplicantData.birthDate}
                change={(e) => setBirthDate(e.element.value)}
              />
              {admissionApplicantData.gender === "male" ? (
                <TextInput
                  label="Jenis Kelamin"
                  type="text"
                  id="gender"
                  // onChange={(e) => setGender(e.target.value)}
                  // value={jenisKelamin}
                  placeholder="Laki-Laki"
                  // defaultValue={admissionApplicantData.gender}
                  disable={false}
                  required={true}
                />
              ) : (
                <TextInput
                  label="Jenis Kelamin"
                  type="text"
                  id="gender"
                  // onChange={(e) => setGender(e.target.value)}
                  // value={jenisKelamin}
                  placeholder="Perempuan"
                  // defaultValue={admissionApplicantData.gender}
                  disable={false}
                  required={true}
                />
              )}
              <br />
              <DropdownRadioInputGender
                required={true}
                label="Ubah Jenis Kelamin"
                value1="female"
                value2="male"
                label2="Perempuan"
                label3="Laki-Laki"
                onChange={(e) => setGender(e.target.value)}
                // placeholder={admissionApplicantData.gender}
                checked={jenisKelamin}
              />
              <br />
              <TextInput
                label="Golongan Darah"
                type="text"
                id="bloodType"
                // onChange={(e) => setBloodType(e.target.value)}
                // value={golonganDarah}
                placeholder={admissionApplicantData.bloodType}
                // defaultValue={admissionApplicantData.bloodType}
                disable={false}
                required={true}
              />
              <br />
              <DropdownRadioInputBloodType
                required={true}
                label="Ubah Golongan Darah"
                onChange={(e) => setBloodType(e.target.value)}
                // placeholder={admissionApplicantData.bloodType}
                checked={golonganDarah}
              />
              <TextInput
                label="Hobi Anak"
                type="text"
                id="hobby"
                onChange={(e) => setHobby(e.target.value)}
                value={hobi}
                placeholder={admissionApplicantData.hobby}
                // defaultValue={admissionApplicantData.hobby}
                disable={false}
                required={true}
              />
              <TextInput
                label="Berat Badan Anak (Kg)"
                type="number"
                id="weight"
                onChange={(e) => setWeight(e.target.value)}
                value={berat}
                placeholder={admissionApplicantData.weight}
                // defaultValue={admissionApplicantData.weight}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="text"
                id="familyIdentityNumber"
                onChange={(e) => setFamilyIdentityNumber(e.target.value)}
                value={noKK}
                placeholder={admissionApplicantData.familyIdentityNumber}
                // defaultValue={admissionApplicantData.familyIdentityNumber}
                disable={false}
                required={true}
              />
              <TextInput
                label="Jarak Rumah ke Sekolah (Km)"
                type="number"
                id="distanceFromHome"
                onChange={(e) => setDistanceFromHome(e.target.value)}
                value={jarak}
                placeholder={admissionApplicantData.distanceFromHome + " Km"}
                // defaultValue={admissionApplicantData.distanceFromHome}
                disable={false}
                required={false}
                min="1"
              />
              <br />
              <DropdownListComponents
                required={true}
                label="Transportasi ke Sekolah"
                disable={false}
                id="transportation"
                dataSource={dropdownData.transportasiSekolah}
                placeholder={admissionApplicantData.transportation}
                value={transportasi}
                change={(e) => setTransportation(e.value)}
                popupHeight="auto"
              />
              <br />
              <TextInput
                label="Kelas Pada Saat Mendaftar"
                type="number"
                id="schoolOriginClass"
                onChange={(e) => setSchoolOriginClass(e.target.value)}
                value={kelasSaatMendaftar}
                placeholder={admissionApplicantData.schoolOriginClass}
                // defaultValue={admissionApplicantData.schoolOriginClass}
                disable={false}
                required={true}
                min="1"
                max="6"
              />
              <TextInput
                label="Asal Sekolah"
                type="text"
                id="schoolOriginName"
                onChange={(e) => setSchoolOriginName(e.target.value)}
                value={asalSekolah}
                placeholder={admissionApplicantData.schoolOriginName}
                // defaultValue={admissionApplicantData.firstName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Sifat Dominan Anak"
                type="text"
                id="characteristic"
                onChange={(e) => setCharacteristic(e.target.value)}
                value={karakter}
                placeholder={admissionApplicantData.characteristic}
                // defaultValue={admissionApplicantData.characteristic}
                disable={false}
                required={true}
              />
              <TextInput
                label="Penyakit Berat yang Pernah Diderita"
                type="text"
                id="healthRecord"
                onChange={(e) => setHealthRecord(e.target.value)}
                value={kesehatan}
                placeholder={admissionApplicantData.healthRecord}
                // defaultValue={admissionApplicantData.healthRecord}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Akta Lahir Anak"
                type="text"
                id="identityNumber"
                onChange={(e) => setIdentityNumber(e.target.value)}
                value={noAktaLahir}
                placeholder={admissionApplicantData.identityNumber}
                // defaultValue={admissionApplicantData.identityNumber}
                disable={false}
                required={true}
              />
            </section>
          ) : (
            <section className="xs:col-span-3 lg:col-span-1 mt-5">
              <TextInput
                label="Nama Depan"
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={namaDepan}
                // placeholder={admissionApplicantData.firstName}
                disable={false}
                required={true}
              />
              {/* <TextInput
                label="Agama"
                type="text"
                id="religion"
                onChange={(e) => setReligion(e.target.value)}
                value={agama}
                // placeholder={admissionApplicantData.religion}
                disable={false}
                required={true}
              /> */}
              <TextInput
                label="Nama Tengah"
                type="text"
                id="middleName"
                onChange={(e) => setMiddleName(e.target.value)}
                value={namaTengah}
                // placeholder={admissionApplicantData.middleName}
                disable={false}
                required={false}
              />
              <TextInput
                label="Nama Belakang"
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={namaAkhir}
                // placeholder={admissionApplicantData.lastName}
                disable={false}
                required={true}
              />
              <br />
              <DropdownRadioInputBiological
                required={true}
                label="Status Anak"
                value1="Kandung"
                value2="Tiri"
                label2="Kandung"
                label3="Tiri"
                onChange={(e) => setChildStatus(e.target.value)}
                checked={statusAnak}
              />
              <br />
              <TextInput
                label="Anak ke"
                type="number"
                id="childNumber"
                onChange={(e) => setChildNumber(e.target.value)}
                value={anakKe}
                // placeholder={admissionApplicantData.childNumber}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Tinggi Badan Anak (cm)"
                type="number"
                id="height"
                onChange={(e) => setHeight(e.target.value)}
                value={tinggi}
                // placeholder={admissionApplicantData.height + " cm"}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={(e) => setBirthPlace(e.target.value)}
                value={tempatLahir}
                // placeholder={admissionApplicantData.birthPlace}
                disable={false}
                required={true}
              />
              <DropdownDatePickers
                label="Tanggal Lahir"
                id="birthDate"
                value={tanggalLahir}
                change={(e) => setBirthDate(e.element.value)}
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
                checked={jenisKelamin}
              />
              <br />
              <DropdownRadioInputBloodType
                required={true}
                label="Golongan Darah"
                onChange={(e) => setBloodType(e.target.value)}
                // placeholder={admissionApplicantData.bloodType}
                checked={golonganDarah}
              />
              <br />
              <TextInput
                label="Hobi Anak"
                type="text"
                id="hobby"
                onChange={(e) => setHobby(e.target.value)}
                value={hobi}
                // placeholder={admissionApplicantData.hobby}
                disable={false}
                required={true}
              />
              <TextInput
                label="Berat Badan Anak (Kg)"
                type="number"
                id="weight"
                onChange={(e) => setWeight(e.target.value)}
                value={berat}
                // placeholder={admissionApplicantData.weight}
                disable={false}
                required={true}
                min="1"
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="text"
                id="familyIdentityNumber"
                onChange={(e) => setFamilyIdentityNumber(e.target.value)}
                value={noKK}
                // placeholder={admissionApplicantData.familyIdentityNumber}
                disable={false}
                required={true}
              />
              <TextInput
                label="Jarak Rumah ke Sekolah (Km)"
                type="number"
                id="distanceFromHome"
                onChange={(e) => setDistanceFromHome(e.target.value)}
                value={jarak}
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
                value={transportasi}
                change={(e) => setTransportation(e.value)}
                popupHeight="auto"
              />

              <TextInput
                label="Kelas Pada Saat Mendaftar"
                type="number"
                id="schoolOriginClass"
                onChange={(e) => setSchoolOriginClass(e.target.value)}
                value={kelasSaatMendaftar}
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
                onChange={(e) => setSchoolOriginName(e.target.value)}
                value={asalSekolah}
                // placeholder={admissionApplicantData.schoolOriginName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Sifat Dominan Anak"
                type="text"
                id="characteristic"
                onChange={(e) => setCharacteristic(e.target.value)}
                value={karakter}
                // placeholder={admissionApplicantData.characteristic}
                disable={false}
                required={true}
              />
              <TextInput
                label="Penyakit Berat yang Pernah Diderita"
                type="text"
                id="healthRecord"
                onChange={(e) => setHealthRecord(e.target.value)}
                value={kesehatan}
                // placeholder={admissionApplicantData.healthRecord}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Akta Lahir Anak"
                type="text"
                id="identityNumber"
                onChange={(e) => setIdentityNumber(e.target.value)}
                value={noAktaLahir}
                // placeholder={admissionApplicantData.identityNumber}
                disable={false}
                required={true}
              />
            </section>
          )}
        </form>
      </div>

      {admissionApplicantData !== null && (
        <button className="btn-merah" onClick={handleSubmitUpdate}>
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineEdit className="mr-2 text-2xl" />
          )}
          Ubah
        </button>
      )}
      {admissionApplicantData === null && (
        <button className="btn-merah" onClick={handleSubmit}>
          Simpan
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
        </button>
      )}
      <section className="flex mt-1 gap-5 justify-center">
        <Link
          to={"/pmb/tahapan-pmb"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Halaman Tahapan PMB
        </Link>

        <Link
          to={"/pmb/form-data-orang-tua-ayah"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          Halaman Pendataan Ayah{" "}
          <BsChevronRight className="text-xl sm:ml-3 lg:ml-7 mt-0.5" />
        </Link>
      </section>
    </>
  );
};
export default FormDaftarMurid;
