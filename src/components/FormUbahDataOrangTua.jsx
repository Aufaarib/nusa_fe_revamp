import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useStateContext } from "../contexts/ContextProvider";
import {
  DropdownDatePickers,
  DropdownRadioInputBiological,
  DropdownRadioInputGender,
  DropdownRadioInputisOneHouse,
} from "./Dropdown";
import Header from "./Header";
import {
  AlertMessage,
  AlertStatusSuccess,
  AlertStatusUpdateFailed,
} from "./ModalPopUp";
import TextInput from "./TextInput";
import moment from "moment/moment";

const FormUbahDataOrangTua = () => {
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();
  const location = useLocation();
  const path = "/pmb/tahapan-pmb";

  const { isLoading, setIsLoading } = useStateContext();
  const [sts, setSts] = useState(false);
  const [fullName, setFullname] = useState(location.state.fullName);
  const [religion, setReligion] = useState(location.state.religion);
  const [familyIdentityNumber, setFamilyIdentityNumber] = useState(
    location.state.familyIdentityNumber
  );
  const [identityNumber, setIdentityNumber] = useState(
    location.state.identityNumber
  );
  const [gender, setGender] = useState(location.state.gender);
  const [relationship, setRelationship] = useState(location.state.relationship);
  const [isBiologicals, setIsBiological] = useState(
    location.state.isBiological
  );
  const [isOneHouses, setIsOneHouse] = useState(location.state.isOneHouse);
  const [phoneNumber1, setPhoneNumber_1] = useState(
    location.state.phoneNumber1
  );
  const [phoneNumber2, setPhoneNumber_2] = useState(
    location.state.phoneNumber2
  );
  const [province, setProvince] = useState(location.state.province);
  const [city, setCity] = useState(location.state.city);
  const [subDistrict, setSubDistrict] = useState(location.state.subDistrict);
  const [village, setVillage] = useState(location.state.village);
  const [address, setAddress] = useState(location.state.address);
  const [postalCode, setPostalCode] = useState(location.state.postalCode);
  const [birthPlace, setBirthPlace] = useState(location.state.birthPlace);
  const [birthDates, setBirthDate] = useState(location.state.birthDate);
  const [lastEducation, setLastEducation] = useState(
    location.state.lastEducation
  );
  const [placeOfWork, setPlaceOfWork] = useState(location.state.placeOfWork);
  const [occupation, setOccupation] = useState(location.state.occupation);
  const [incomeGrades, setIncomeGrade] = useState(location.state.incomeGrade);
  const [parent, setParent] = useState({});

  const navigateParentsData = () => {
    if (relationship === "perwalian") {
      navigate("/pmb/form-data-orang-tua-wali");
    } else if (relationship === "ayah") {
      navigate("/pmb/form-data-orang-tua-ayah");
    } else if (relationship === "ibu") {
      navigate("/pmb/form-data-orang-tua-ibu");
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const code = location.state.code;
    const isBiological = parseInt(isBiologicals);
    const birthDate = moment(birthDates).format("YYYY-MM-DD");
    const isOneHouse = parseInt(isOneHouses);
    const incomeGrade = parseInt(incomeGrades);

    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/user/parent/${code}`,
        {
          fullName,
          religion,
          familyIdentityNumber,
          identityNumber,
          gender,
          relationship,
          isBiological,
          isOneHouse,
          phoneNumber1,
          phoneNumber2,
          province,
          city,
          subDistrict,
          village,
          address,
          postalCode,
          birthPlace,
          birthDate,
          lastEducation,
          occupation,
          incomeGrade,
          placeOfWork,
        },
        {
          headers: { authorization: token },
        }
      )
      .then(() => {
        setIsLoading(false);
        AlertStatusSuccess(
          navigateParentsData,
          "Berhasil",
          `Kembali Ke Halaman Data ${
            location.state.relationship === "perwalian"
              ? "wali"
              : location.state.relationship
          }`,
          "success",
          `Ubah Data ${
            location.state.relationship === "perwalian"
              ? "wali"
              : location.state.relationship
          } Berhasil`
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
  };

  const [validPhone1, setValidPhone1] = useState(false);
  const [validPhone2, setValidPhone2] = useState(false);

  const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{4,12}$/;

  useEffect(() => {
    setValidPhone1(PHONE_REGEX.test(phoneNumber1));
    setValidPhone2(PHONE_REGEX.test(phoneNumber2));
  }, [phoneNumber1, phoneNumber2]);

  return (
    <article>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at={`Ubah Data ${location.state.relationship}`}
        title="Form Ubah Data Orang Tua"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "block", gap: "22px", padding: "10px" }}>
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah capitalize">
              Ubah Data {location.state.relationship}
            </h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            <section>
              <TextInput
                label="Nama Lengkap"
                type="text"
                id="fullName"
                onChange={(e) => setFullname(e.target.value)}
                value={fullName}
                disable={false}
                required={true}
              />
              {relationship === "perwalian" && (
                <>
                  <br />
                  <DropdownRadioInputGender
                    required={true}
                    label="Jenis Kelamin"
                    value1="male"
                    value2="female"
                    label2="Laki-Laki"
                    label3="Perempuan"
                    onChange={(e) => setGender(e.element.value)}
                    checked={gender}
                  />
                  <br />
                </>
              )}
              <TextInput
                label="Agama"
                type="text"
                id="religion"
                onChange={(e) => setReligion(e.target.value)}
                value={religion}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="number"
                id="familyIdentityNumber"
                onChange={(e) => setFamilyIdentityNumber(e.target.value)}
                value={familyIdentityNumber}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Identitas"
                type="number"
                id="identityNumber"
                onChange={(e) => setIdentityNumber(e.target.value)}
                value={identityNumber}
                disable={false}
                required={true}
              />
              <br />
              <DropdownRadioInputBiological
                required={true}
                label={`Hubungan ${relationship}`}
                value1="1"
                value2="0"
                label2="Kandung"
                label3="Tiri"
                onChange={(e) => setIsBiological(e.target.value)}
                checked={isBiologicals.toString()}
              />
            </section>
            <section>
              <br />
              <DropdownRadioInputisOneHouse
                required={true}
                label="Tinggal Bersama"
                value1="1"
                value2="0"
                label2="Ya"
                label3="Tidak"
                onChange={(e) => setIsOneHouse(e.target.value)}
                checked={isOneHouses.toString()}
              />
              <br />
              <TextInput
                label="Nomor Ponsel 1"
                type="number"
                id="phoneNumber1"
                onChange={(e) => setPhoneNumber_1(e.target.value)}
                value={phoneNumber1}
                disable={false}
                required={true}
                placeholder={"Contoh: 081234567892"}
                validationMsg={
                  "Diawali 08 atau 62, Minimal 7 dan maksimal 15 angka"
                }
                validation={validPhone1}
              />
              <TextInput
                label="Nomor Ponsel 2"
                type="number"
                id="phoneNumber2"
                onChange={(e) => setPhoneNumber_1(e.target.value)}
                value={phoneNumber2}
                disable={false}
                required={false}
                placeholder={"Contoh: 081234567892"}
                validationMsg={
                  "Diawali 08 atau 62, Minimal 7 dan maksimal 15 angka"
                }
                validation={validPhone2}
              />
              <TextInput
                label="Propinsi"
                type="text"
                id="province"
                onChange={(e) => setProvince(e.target.value)}
                value={province}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kota"
                type="text"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                disable={false}
                required={true}
              />
            </section>
            <section>
              <TextInput
                label="Kecamatan"
                type="text"
                id="subDistrict"
                onChange={(e) => setSubDistrict(e.target.value)}
                value={subDistrict}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kelurahan"
                type="text"
                id="village"
                onChange={(e) => setVillage(e.target.value)}
                value={village}
                disable={false}
                required={true}
              />
              <TextInput
                label="Alamat"
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kode Pos"
                type="number"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
                disable={false}
                required={true}
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={(e) => setBirthPlace(e.target.value)}
                value={birthPlace}
                disable={false}
                required={true}
              />
            </section>
            <section>
              <DropdownDatePickers
                label="Tanggal Lahir"
                id="birthDate"
                value={birthDates}
                change={(e) => setBirthDate(e.element.value)}
              />
              <TextInput
                label="Pendidikan Terakhir"
                type="text"
                id="lastEducation"
                onChange={(e) => setLastEducation(e.target.value)}
                value={lastEducation}
                disable={false}
                required={true}
              />
              <TextInput
                label="Perusahaan Tempat Bekerja"
                type="text"
                id="placeOfWork"
                onChange={(e) => setPlaceOfWork(e.target.value)}
                value={placeOfWork}
                disable={false}
                required={true}
              />
              <TextInput
                label="Posisi/ Jabatan"
                type="text"
                id="occupation"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation}
                disable={false}
                required={true}
              />
              <TextInput
                label="Penghasilan Tiap Bulan"
                type="number"
                id="incomeGrade"
                onChange={(e) => setIncomeGrade(e.target.value)}
                value={incomeGrades}
                disable={false}
                required={true}
                min="1"
              />
            </section>
          </section>
        </div>
      </div>

      <button className="btn-merah" onClick={handleSubmitUpdate}>
        {isLoading ? (
          <CgSpinner className="mr-2 text-xl animate-spin" />
        ) : (
          <AiOutlineEdit className="mr-2 text-2xl" />
        )}
        Kirim
      </button>
      <section className="flex justify-start">
        <Link
          to={`/pmb/form-data-orang-tua-${
            location.state.relationship === "perwalian"
              ? "wali"
              : location.state.relationship
          }`}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Kembali
        </Link>
      </section>
    </article>
  );
};
export default FormUbahDataOrangTua;
