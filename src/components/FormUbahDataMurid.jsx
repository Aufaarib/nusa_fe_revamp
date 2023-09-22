import moment from "moment/moment";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { AlertEmpty, AlertMessage, AlertStatusSuccess } from "./ModalPopUp";
import { TextInput } from "./TextInput";

const FormUbahDataMurid = () => {
  const path = "/pmb/tahapan-pmb";
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const navigate = useNavigate();
  const location = useLocation();

  const reload = () => {
    navigate("/pmb/form-data-murid");
  };

  const [sts, setSts] = useState(false);
  const [namaDepan, setFirstName] = useState(location.state.firstName);
  const [namaTengah, setMiddleName] = useState(location.state.middleName);
  const [namaAkhir, setLastName] = useState(location.state.lastName);
  const [statusAnak, setChildStatus] = useState(location.state.childStatus);
  const [anakKe, setChildNumber] = useState(location.state.childNumber);
  const [tinggi, setHeight] = useState(location.state.height);
  const [tempatLahir, setBirthPlace] = useState(location.state.birthPlace);
  const [tanggalLahir, setBirthDate] = useState(location.state.birthDate);
  const [jenisKelamin, setGender] = useState(location.state.gender);
  const [golonganDarah, setBloodType] = useState(location.state.bloodType);
  const [hobi, setHobby] = useState(location.state.hobby);
  const [berat, setWeight] = useState(location.state.weight);
  const [noKK, setFamilyIdentityNumber] = useState(
    location.state.familyIdentityNumber
  );
  const [jarak, setDistanceFromHome] = useState(
    location.state.distanceFromHome
  );
  const [transportasi, setTransportation] = useState(
    location.state.transportation
  );
  const [kelasSaatMendaftar, setSchoolOriginClass] = useState(
    location.state.schoolOriginClass
  );
  const [asalSekolah, setSchoolOriginName] = useState(
    location.state.schoolOriginName
  );
  const [karakter, setCharacteristic] = useState(location.state.characteristic);
  const [kesehatan, setHealthRecord] = useState(location.state.healthRecord);
  const [noAktaLahir, setIdentityNumber] = useState(
    location.state.identityNumber
  );
  const [isLoading, setIsLoading] = useState(false);

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
      distanceFromHome == "" ||
      familyIdentityNumber === "" ||
      weight === "" ||
      hobby === "" ||
      bloodType === "" ||
      gender === "" ||
      birthDate === "" ||
      birthPlace === "" ||
      height === "" ||
      childNumber == "" ||
      childStatus === "" ||
      lastName === "" ||
      religion === "" ||
      middleName === "" ||
      firstName === ""
    ) {
      AlertMessage(
        "Tidak Sesuai",
        "Terdapat Data Yang Kosong Atau Tidak Sesuai, Mohon Melakukan Pengecekan Kembali",
        "Tutup Pesan",
        "warning"
      );
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
          AlertStatusSuccess(
            reload,
            "Berhasil",
            "Tutup",
            "success",
            "Data Anak Berhasil Diubah"
          );
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === "ERR_NETWORK") {
            AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
          } else {
            AlertMessage(
              "Tidak Sesuai",
              "Terdapat Data Yang Kosong Atau Tidak Sesuai, Mohon Melakukan Pengecekan Kembali",
              "Tutup Pesan",
              "warning"
            );
          }
        });
    }
  };

  return (
    <>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Ubah Data Anak"
        title="Form Ubah Data Anak"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          // onSubmit={handleSubmit}
          style={{ display: "block", gap: "20px", padding: "20px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pengubahan Data Anak</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
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
          </section>
        </div>
      </div>

      <button className="btn-merah" onClick={handleSubmitUpdate}>
        {isLoading ? (
          <CgSpinner className="mr-2 text-xl animate-spin" />
        ) : (
          <AiOutlineEdit className="mr-2 text-2xl" />
        )}
        Ubah
      </button>
      <section className="flex justify-start">
        <Link
          to={"/pmb/form-data-murid"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Kembali
        </Link>
      </section>
    </>
  );
};
export default FormUbahDataMurid;
