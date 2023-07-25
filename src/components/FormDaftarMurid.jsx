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
  const [agama, setReligion] = useState("");
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
    const religion = agama;
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
                // onChange={(e) => setFirstName(e.value)}
                // value={firstName}
                placeholder={admissionApplicantData.firstName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Agama"
                type="text"
                id="religion"
                // onChange={(e) => setFirstName(e.value)}
                // value={religion}
                placeholder={admissionApplicantData.religion}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nama Tengah"
                type="text"
                id="middleName"
                // onChange={(e) => setFirstName(e.value)}
                // value={middleName}
                placeholder={admissionApplicantData.middleName}
                disable={true}
                required={false}
              />
              <TextInput
                label="Nama Belakang"
                type="text"
                id="lastName"
                // onChange={(e) => setFirstName(e.value)}
                // value={lastName}
                placeholder={admissionApplicantData.lastName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Status Anak"
                type="text"
                id="childStatus"
                // onChange={(e) => setFirstName(e.value)}
                // value={childStatus}
                placeholder={admissionApplicantData.childStatus}
                disable={true}
                required={true}
              />
              <TextInput
                label="Anak ke"
                type="number"
                id="childNumber"
                // onChange={(e) => setFirstName(e.value)}
                // value={childNumber}
                placeholder={admissionApplicantData.childNumber}
                disable={true}
                required={true}
                min="1"
              />
              <TextInput
                label="Tinggi Badan Anak (cm)"
                type="number"
                id="height"
                // onChange={(e) => setFirstName(e.value)}
                // value={height}
                placeholder={admissionApplicantData.height + " cm"}
                disable={true}
                required={true}
                min="1"
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                // onChange={(e) => setFirstName(e.value)}
                // value={birthPlace}
                placeholder={admissionApplicantData.birthPlace}
                disable={true}
                required={true}
              />
              <TextInput
                label="Tanggal Lahir"
                type="text"
                id="birthDate"
                // onChange={(e) => setFirstName(e.value)}
                // value={birthDate}
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
                  // onChange={(e) => setFirstName(e.value)}
                  // value={gender}
                  placeholder="Laki-Laki"
                  disable={true}
                  required={true}
                />
              ) : (
                <TextInput
                  label="Jenis Kelamin"
                  type="text"
                  id="gender"
                  // onChange={(e) => setFirstName(e.value)}
                  // value={gender}
                  placeholder="Perempuan"
                  disable={true}
                  required={true}
                />
              )}
              <TextInput
                label="Golongan Darah"
                type="text"
                id="bloodType"
                // onChange={(e) => setFirstName(e.value)}
                // value={bloodType}
                placeholder={admissionApplicantData.bloodType}
                disable={true}
                required={true}
              />
              <TextInput
                label="Hobi Anak"
                type="text"
                id="hobby"
                // onChange={(e) => setFirstName(e.value)}
                // value={hobby}
                placeholder={admissionApplicantData.hobby}
                disable={true}
                required={true}
              />
              <TextInput
                label="Berat Badan Anak (Kg)"
                type="number"
                id="weight"
                // onChange={(e) => setFirstName(e.value)}
                // value={weight}
                placeholder={admissionApplicantData.weight}
                disable={true}
                required={true}
                min="1"
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="text"
                id="familyIdentityNumber"
                // onChange={(e) => setFirstName(e.value)}
                // value={familyIdentityNumber}
                placeholder={admissionApplicantData.familyIdentityNumber}
                disable={true}
                required={true}
              />
              <TextInput
                label="Jarak Rumah ke Sekolah (Km)"
                type="number"
                id="distanceFromHome"
                // onChange={(e) => setFirstName(e.value)}
                // value={distanceFromHome}
                placeholder={admissionApplicantData.distanceFromHome + " Km"}
                disable={true}
                required={false}
                min="1"
              />
              <TextInput
                label="Transportasi ke Sekolah"
                type="text"
                id="transportation"
                // onChange={(e) => setFirstName(e.value)}
                // value={transportation}
                placeholder={admissionApplicantData.transportation}
                disable={true}
                required={true}
              />
              <TextInput
                label="Kelas Pada Saat Mendaftar"
                type="number"
                id="schoolOriginClass"
                // onChange={(e) => setFirstName(e.value)}
                // value={schoolOriginClass}
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
                // onChange={(e) => setFirstName(e.value)}
                // value={schoolOriginName}
                placeholder={admissionApplicantData.schoolOriginName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Sifat Dominan Anak"
                type="text"
                id="characteristic"
                // onChange={(e) => setFirstName(e.value)}
                // value={characteristic}
                placeholder={admissionApplicantData.characteristic}
                disable={true}
                required={true}
              />
              <TextInput
                label="Penyakit Berat yang Pernah Diderita"
                type="text"
                id="healthRecord"
                // onChange={(e) => setFirstName(e.value)}
                // value={healthRecord}
                placeholder={admissionApplicantData.healthRecord}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nomor Akta Lahir Anak"
                type="text"
                id="identityNumber"
                // onChange={(e) => setFirstName(e.value)}
                // value={identityNumber}
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
                onChange={(e) => setFirstName(e.target.value)}
                value={namaDepan}
                // placeholder={admissionApplicantData.firstName}
                disable={false}
                required={true}
              />
              <TextInput
                label="Agama"
                type="text"
                id="religion"
                onChange={(e) => setReligion(e.target.value)}
                value={agama}
                // placeholder={admissionApplicantData.religion}
                disable={false}
                required={true}
              />
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
              <TextInput
                label="Status Anak"
                type="text"
                id="childStatus"
                onChange={(e) => setChildStatus(e.target.value)}
                value={statusAnak}
                // placeholder={admissionApplicantData.childStatus}
                disable={false}
                required={true}
              />
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
              <DropdownRadioInputBloodType
                required={true}
                label="Golongan Darah"
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
