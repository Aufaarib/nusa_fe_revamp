import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAdmissionRegistrationApplicant } from "../api/Registrasi";
import axios from "../api/axios";
import { dropdownData } from "../data/initData";
import {
  DropdownDatePickers,
  DropdownListComponents,
  DropdownRadioInputBiological,
  DropdownRadioInputBloodType,
  DropdownRadioInputGender,
} from "./Dropdown";
import Header from "./Header";
import {
  AlertEmpty,
  AlertMessage,
  AlertStatusTambahFailed,
} from "./ModalPopUp";
import TextInput, { TextInputModal } from "./TextInput";
import moment from "moment/moment";

const FormDaftarMurid = () => {
  const path = "/pmb/tahapan-pmb";
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const navigate = useNavigate();
  const location = useLocation();

  const [admissionApplicantData, setAdmissionApplicant] = useState(null);

  const [sts, setSts] = useState(false);
  const [namaDepan, setFirstName] = useState("");
  const [namaTengah, setMiddleName] = useState("");
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

  const navigateUbah = () => {
    navigate("/pmb/form-ubah-data-murid", {
      state: {
        firstName: admissionApplicantData.firstName,
        middleName: admissionApplicantData.middleName,
        lastName: admissionApplicantData.lastName,
        childStatus: admissionApplicantData.childStatus,
        childNumber: admissionApplicantData.childNumber,
        height: admissionApplicantData.height,
        religion: admissionApplicantData.religion,
        birthPlace: admissionApplicantData.birthPlace,
        birthDate: admissionApplicantData.birthDate,
        gender: admissionApplicantData.gender,
        bloodType: admissionApplicantData.bloodType,
        hobby: admissionApplicantData.hobby,
        weight: admissionApplicantData.weight,
        familyIdentityNumber: admissionApplicantData.familyIdentityNumber,
        distanceFromHome: admissionApplicantData.distanceFromHome,
        transportation: admissionApplicantData.transportation,
        schoolOriginClass: admissionApplicantData.schoolOriginClass,
        schoolOriginName: admissionApplicantData.schoolOriginName,
        characteristic: admissionApplicantData.characteristic,
        healthRecord: admissionApplicantData.healthRecord,
        identityNumber: admissionApplicantData.identityNumber,
      },
    });
  };

  const fetchAdmissonApplicant = () => {
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
    const birthDate = moment(tanggalLahir).format("YYYY-MM-DD");
    const gender = jenisKelamin;
    const bloodType = golonganDarah;
    const hobby = hobi;
    const weight = parseInt(berat);
    const familyIdentityNumber = noKK;
    const distanceFromHome = parseInt(jarak);
    const transportation = transportasi;
    const schoolOriginClass = kelasSaatMendaftar;
    const schoolOriginName = asalSekolah;
    const characteristic = karakter;
    const healthRecord = kesehatan;
    const identityNumber = noAktaLahir;

    if (
      identityNumber === "" ||
      healthRecord === "" ||
      characteristic === "" ||
      schoolOriginName === "" ||
      schoolOriginClass === "" ||
      transportation === "" ||
      distanceFromHome === "" ||
      familyIdentityNumber === "" ||
      weight === "" ||
      hobby === "" ||
      bloodType === "" ||
      gender === "" ||
      birthDate === "" ||
      birthPlace === "" ||
      height === "" ||
      childNumber === "" ||
      childStatus === "" ||
      lastName === "" ||
      religion === "" ||
      middleName === "" ||
      firstName === ""
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
          AlertMessage(
            "Berhasil",
            "Data Anak Berhasil Tersimpan",
            "Tutup",
            "success"
          );
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
        at="Penndataan Anak"
        title="Form Pendataan Anak"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          // onSubmit={handleSubmit}
          style={{ display: "block", gap: "20px", padding: "20px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendataan Anak</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            {admissionApplicantData == null ? (
              <div>
                <section>
                  <TextInput
                    label="Nama Depan"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={namaDepan}
                    disable={false}
                    required={true}
                  />
                  <TextInput
                    label="Nama Tengah"
                    type="text"
                    onChange={(e) => setMiddleName(e.target.value)}
                    value={namaTengah}
                    disable={false}
                    required={false}
                  />
                  <TextInput
                    label="Nama Belakang"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={namaAkhir}
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
                    disable={false}
                    required={true}
                    min="1"
                  />
                </section>
                <section>
                  <TextInput
                    label="Tinggi Badan Anak (cm)"
                    type="number"
                    id="height"
                    onChange={(e) => setHeight(e.target.value)}
                    value={tinggi}
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
                    checked={jenisKelamin}
                  />
                  <br />
                  <DropdownRadioInputBloodType
                    required={true}
                    label="Golongan Darah"
                    onChange={(e) => setBloodType(e.target.value)}
                    checked={golonganDarah}
                  />
                </section>
                <section>
                  <br />
                  <TextInput
                    label="Hobi Anak"
                    type="text"
                    id="hobby"
                    onChange={(e) => setHobby(e.target.value)}
                    value={hobi}
                    disable={false}
                    required={true}
                  />
                  <TextInput
                    label="Berat Badan Anak (Kg)"
                    type="number"
                    id="weight"
                    onChange={(e) => setWeight(e.target.value)}
                    value={berat}
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
                    disable={false}
                    required={true}
                  />
                  <TextInput
                    label="Jarak Rumah ke Sekolah (Km)"
                    type="number"
                    id="distanceFromHome"
                    onChange={(e) => setDistanceFromHome(e.target.value)}
                    value={jarak}
                    disable={false}
                    required={false}
                    min="1"
                  />
                  <DropdownListComponents
                    required={true}
                    label="Transportasi ke Sekolah"
                    disable={false}
                    id="transportation"
                    dataSource={dropdownData.transportasiSekolah}
                    value={transportasi}
                    change={(e) => setTransportation(e.value)}
                    popupHeight="auto"
                  />
                </section>
                <section>
                  <TextInput
                    label="Kelas Pada Saat Mendaftar"
                    type="number"
                    id="schoolOriginClass"
                    onChange={(e) => setSchoolOriginClass(e.target.value)}
                    value={kelasSaatMendaftar}
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
                    disable={false}
                    required={true}
                  />
                  <TextInput
                    label="Sifat Dominan Anak"
                    type="text"
                    id="characteristic"
                    onChange={(e) => setCharacteristic(e.target.value)}
                    value={karakter}
                    disable={false}
                    required={true}
                  />
                  <TextInput
                    label="Penyakit Berat yang Pernah Diderita"
                    type="text"
                    id="healthRecord"
                    onChange={(e) => setHealthRecord(e.target.value)}
                    value={kesehatan}
                    disable={false}
                    required={true}
                  />
                  <TextInput
                    label="Nomor Akta Lahir Anak"
                    type="text"
                    id="identityNumber"
                    onChange={(e) => setIdentityNumber(e.target.value)}
                    value={noAktaLahir}
                    disable={false}
                    required={true}
                  />
                </section>
              </div>
            ) : (
              <div className="lg:flex lg:gap-7">
                <section>
                  <TextInputModal
                    label="Nama Depan"
                    type="text"
                    value={admissionApplicantData.firstName}
                    disable={true}
                  />
                  <TextInputModal
                    label="Nama Tengah"
                    type="text"
                    value={admissionApplicantData.middleName}
                    disable={true}
                  />
                  <TextInputModal
                    label="Nama Belakang"
                    type="text"
                    value={admissionApplicantData.lastName}
                    disable={true}
                  />
                  <TextInputModal
                    required={true}
                    label="Status Anak"
                    type="text"
                    value={admissionApplicantData.childStatus}
                    disable={true}
                  />
                  <TextInputModal
                    label="Anak ke"
                    type="text"
                    value={admissionApplicantData.childNumber}
                    disable={true}
                  />
                </section>
                <section>
                  <TextInputModal
                    label="Tinggi Badan Anak (cm)"
                    type="text"
                    value={admissionApplicantData.height}
                    disable={true}
                  />
                  <TextInputModal
                    label="Tempat Lahir"
                    type="text"
                    value={admissionApplicantData.birthPlace}
                    disable={true}
                  />
                  <TextInputModal
                    label="Tanggal Lahir"
                    type="text"
                    value={admissionApplicantData.birthDate}
                    disable={true}
                  />
                  <TextInputModal
                    label="Jenis Kelamin"
                    type="text"
                    value={admissionApplicantData.gender}
                    disable={true}
                  />
                  <TextInputModal
                    label="Golongan Darah"
                    type="text"
                    value={admissionApplicantData.bloodType}
                    disable={true}
                  />
                </section>
                <section>
                  <TextInputModal
                    label="Hobi Anak"
                    type="text"
                    value={admissionApplicantData.hobby}
                    disable={true}
                  />
                  <TextInputModal
                    label="Berat Badan Anak (Kg)"
                    type="text"
                    value={admissionApplicantData.weight}
                    disable={true}
                  />
                  <TextInputModal
                    label="Nomor Kartu Keluarga"
                    type="text"
                    value={admissionApplicantData.familyIdentityNumber}
                    disable={true}
                  />
                  <TextInputModal
                    label="Jarak Rumah ke Sekolah (Km)"
                    type="text"
                    value={admissionApplicantData.distanceFromHome}
                    disable={true}
                  />
                  <TextInputModal
                    label="Transportasi ke Sekolah"
                    type="text"
                    value={admissionApplicantData.transportation}
                    disable={true}
                  />
                </section>
                <section>
                  <TextInputModal
                    label="Kelas Pada Saat Mendaftar"
                    type="text"
                    value={admissionApplicantData.schoolOriginClass}
                    disable={true}
                  />
                  <TextInputModal
                    label="Asal Sekolah"
                    type="text"
                    value={admissionApplicantData.schoolOriginName}
                    disable={true}
                  />
                  <TextInputModal
                    label="Sifat Dominan Anak"
                    type="text"
                    value={admissionApplicantData.characteristic}
                    disable={true}
                  />
                  <TextInputModal
                    label="Penyakit Berat yang Pernah Diderita"
                    type="text"
                    value={admissionApplicantData.healthRecord}
                    disable={true}
                  />
                  <TextInputModal
                    label="Nomor Akta Lahir Anak"
                    type="text"
                    value={admissionApplicantData.identityNumber}
                    disable={true}
                  />
                </section>
              </div>
            )}
          </section>
        </form>
      </div>

      {admissionApplicantData !== null && (
        <button className="btn-merah" onClick={navigateUbah}>
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
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
          Kirim
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
