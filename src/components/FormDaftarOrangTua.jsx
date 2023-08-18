import moment from "moment/moment";
import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import TextInput, { TextInputModal } from "./TextInput";
import { getAdmissionRegistrationParentsAyah } from "../api/Registrasi";
import { useStateContext } from "../contexts/ContextProvider";
import {
  DropdownDatePickers,
  DropdownRadioInputBiological,
  DropdownRadioInputisOneHouse,
} from "./Dropdown";
import Header from "./Header";
import {
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
} from "./ModalPopUp";

const FormDaftarOrangTua = () => {
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();
  const path = "/pmb/tahapan-pmb";
  const { isLoading, setIsLoading } = useStateContext();
  const [admissionParentsData, setAdmissionParents] = useState(null);
  const [sts, setSts] = useState(false);
  const [parent, setParent] = useState({});

  const navigateUbah = () => {
    navigate("/pmb/form-ubah-data-orang-tua", {
      state: {
        code: admissionParentsData.code,
        fullName: admissionParentsData.fullName,
        religion: admissionParentsData.religion,
        familyIdentityNumber: admissionParentsData.familyIdentityNumber,
        identityNumber: admissionParentsData.identityNumber,
        gender: admissionParentsData.gender,
        relationship: admissionParentsData.relationship,
        isBiological: admissionParentsData.isBiological,
        isOneHouse: admissionParentsData.isOneHouse,
        phoneNumber1: admissionParentsData.phoneNumber_1,
        phoneNumber2: admissionParentsData.phoneNumber_2,
        province: admissionParentsData.province,
        city: admissionParentsData.city,
        subDistrict: admissionParentsData.subDistrict,
        village: admissionParentsData.village,
        address: admissionParentsData.address,
        postalCode: admissionParentsData.postalCode,
        birthPlace: admissionParentsData.birthPlace,
        birthDate: admissionParentsData.birthDate,
        lastEducation: admissionParentsData.lastEducation,
        occupation: admissionParentsData.occupation,
        incomeGrade: admissionParentsData.incomeGrade,
        placeOfWork: admissionParentsData.placeOfWork,
      },
    });
  };

  const fetchAdmissonParents = async () => {
    getAdmissionRegistrationParentsAyah(setAdmissionParents, setSts);
  };

  useEffect(() => {
    fetchAdmissonParents();
  }, []);

  const updateParents = (e) => {
    const fieldName = e.target.id;
    setParent((existingValues) => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }));
  };

  const updateParentsCal = (e) => {
    const fieldName = e.element.id;
    // console.log("fieldName ===> ", e)
    setParent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.element.value,
    }));
  };

  const updateParentsRadio = (e) => {
    const fieldName = e.target.name;
    setParent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fullName = parent.fullName;
    const religion = parent.religion;
    const familyIdentityNumber = parent.familyIdentityNumber;
    const identityNumber = parent.identityNumber;
    const gender = "male";
    const relationship = "ayah";
    const isBiological = parseInt(parent.isBiological);
    const isOneHouse = parseInt(parent.isOneHouse);
    const phoneNumber1 = parent.phoneNumber1;
    const phoneNumber2 = parent.phoneNumber2;
    const province = parent.province;
    const city = parent.city;
    const subDistrict = parent.subDistrict;
    const village = parent.village;
    const address = parent.address;
    const postalCode = parent.postalCode;
    const birthPlace = parent.birthPlace;
    const birthDate = parent.birthDate;
    const lastEducation = parent.lastEducation;
    const placeOfWork = parent.placeOfWork;
    const occupation = parent.occupation;
    const incomeGrade = parseInt(parent.incomeGrade);
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/user/parent",
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
        AlertStatusTambahSuccess("/pmb/form-data-orang-tua-ayah");
      })
      .catch(() => {
        setIsLoading(false);
        AlertStatusUpdateFailed();
      });
  };

  const [validPhone, setValidPhone] = useState(false);

  const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{4,12}$/;

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(parent.phoneNumber1));
  }, [parent.phoneNumber1]);

  return (
    <article>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Pendataan Ayah"
        title="Form Pendataan Orang Tua"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          // onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "10px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendataan Ayah</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>
          {admissionParentsData == null ? (
            <section className="xs:col-span-3 lg:col-span-1 mt-5">
              <TextInput
                label="Nama Lengkap"
                type="text"
                id="fullName"
                onChange={updateParents}
                value={parent.fullName}
                disable={true}
                required={true}
              />
              <TextInput
                label="Agama"
                type="text"
                id="religion"
                onChange={updateParents}
                value={parent.religion}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="number"
                id="familyIdentityNumber"
                onChange={updateParents}
                value={parent.familyIdentityNumber}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nomor Identitas"
                type="number"
                id="identityNumber"
                onChange={updateParents}
                value={parent.identityNumber}
                disable={true}
                required={true}
              />
              <br />
              <DropdownRadioInputBiological
                required={true}
                label="Hubungan Ayah"
                value1="1"
                value2="0"
                label2="Kandung"
                label3="Tiri"
                onChange={updateParentsRadio}
                checked={parent.isBiological}
              />
              <br />
              <DropdownRadioInputisOneHouse
                required={true}
                label="Tinggal Bersama"
                value1="1"
                value2="0"
                label2="Ya"
                label3="Tidak"
                onChange={updateParentsRadio}
                checked={parent.isOneHouse}
              />
              <br />
              <TextInput
                label="Nomor Ponsel 1"
                type="number"
                id="phoneNumber1"
                onChange={updateParents}
                value={parent.phoneNumber1}
                disable={true}
                required={true}
              />
              <TextInput
                label="Nomor Ponsel 2"
                type="numer"
                id="phoneNumber2"
                onChange={updateParents}
                value={parent.phoneNumber2}
                disable={true}
                required={true}
              />
              <TextInput
                label="Propinsi"
                type="text"
                id="province"
                onChange={updateParents}
                value={parent.province}
                disable={true}
                required={true}
              />
              <TextInput
                label="Kota"
                type="text"
                id="city"
                onChange={updateParents}
                value={parent.city}
                disable={true}
                required={true}
              />
              <TextInput
                label="Kecamatan"
                type="text"
                id="subDistrict"
                onChange={updateParents}
                value={parent.subDistrict}
                disable={true}
                required={true}
              />
              <TextInput
                label="Kelurahan"
                type="text"
                id="village"
                onChange={updateParents}
                value={parent.village}
                disable={true}
                required={true}
              />
              <TextInput
                label="Alamat"
                type="text"
                id="address"
                onChange={updateParents}
                value={parent.address}
                disable={true}
                required={true}
              />
              <TextInput
                label="Kode Pos"
                type="number"
                id="postalCode"
                onChange={updateParents}
                value={parent.postalCode}
                disable={true}
                required={true}
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={updateParents}
                value={parent.birthPlace}
                disable={true}
                required={true}
              />
              <DropdownDatePickers
                label="Ubah Tanggal Lahir"
                id="birthDate"
                value={parent.birthDate}
                change={updateParentsCal.bind(this)}
              />
              <TextInput
                label="Pendidikan Terakhir"
                type="text"
                id="lastEducation"
                onChange={updateParents}
                value={parent.lastEducation}
                disable={true}
                required={true}
              />
              <TextInput
                label="Perusahaan Tempat Bekerja"
                type="text"
                id="placeOfWork"
                onChange={updateParents}
                value={parent.placeOfWork}
                disable={true}
                required={true}
              />
              <TextInput
                label="Posisi/ Jabatan"
                type="text"
                id="occupation"
                onChange={updateParents}
                value={parent.occupation}
                disable={true}
                required={true}
              />
              <TextInput
                label="Penghasilan Tiap Bulan"
                type="number"
                id="incomeGrade"
                onChange={updateParents}
                value={parent.incomeGrade}
                disable={true}
                required={true}
                min="1"
              />
            </section>
          ) : (
            <div className="lg:flex lg:gap-7">
              <section>
                <TextInputModal
                  label="Nama Lengkap"
                  type="text"
                  value={admissionParentsData?.fullName}
                  disable={true}
                />
                <TextInputModal
                  label="Agama"
                  type="text"
                  value={admissionParentsData?.religion}
                  disable={true}
                />
                <TextInputModal
                  label="Nomor Kartu Keluarga"
                  type="number"
                  value={admissionParentsData?.familyIdentityNumber}
                  disable={true}
                />
                <TextInputModal
                  label="Nomor Identitas"
                  type="number"
                  value={admissionParentsData?.identityNumber}
                  disable={true}
                />
                <TextInputModal
                  label="Hubungan Ayah"
                  type="text"
                  value={
                    admissionParentsData?.isBiological == 1 ? "Kandung" : "Tiri"
                  }
                  disable={true}
                />
                <TextInputModal
                  label="Tinggal Bersama"
                  type="text"
                  value={admissionParentsData?.isOneHouse == 1 ? "Ya" : "Tidak"}
                  disable={true}
                />
              </section>
              <section>
                <TextInputModal
                  label="Nomor Ponsel 1"
                  type="number"
                  value={admissionParentsData?.phoneNumber_1}
                  disable={true}
                />
                <TextInputModal
                  label="Nomor Ponsel 2"
                  type="numer"
                  value={admissionParentsData?.phoneNumber_2}
                  disable={true}
                />
                <TextInputModal
                  label="Propinsi"
                  type="text"
                  value={admissionParentsData?.province}
                  disable={true}
                />
                <TextInputModal
                  label="Kota"
                  type="text"
                  value={admissionParentsData?.city}
                  disable={true}
                />

                <TextInputModal
                  label="Kecamatan"
                  type="text"
                  value={admissionParentsData?.subDistrict}
                  disable={true}
                />

                <TextInputModal
                  label="Kelurahan"
                  type="text"
                  value={admissionParentsData?.village}
                  disable={true}
                />
              </section>

              <section>
                <TextInputModal
                  label="Alamat"
                  type="text"
                  value={admissionParentsData?.address}
                  disable={true}
                />

                <TextInputModal
                  label="Kode Pos"
                  type="number"
                  value={admissionParentsData?.postalCode}
                  disable={true}
                />

                <TextInputModal
                  label="Tempat Lahir"
                  type="text"
                  value={admissionParentsData?.birthPlace}
                  disable={true}
                />

                <TextInputModal
                  label="Tanggal Lahir"
                  type="text"
                  value={moment(admissionParentsData?.birthDate).format(
                    "YYYY-MM-DD"
                  )}
                  disable={true}
                />

                <TextInputModal
                  label="Pendidikan Terakhir"
                  type="text"
                  value={admissionParentsData?.lastEducation}
                  disable={true}
                />

                <TextInputModal
                  label="Perusahaan Tempat Bekerja"
                  type="text"
                  value={admissionParentsData?.placeOfWork}
                  disable={true}
                />
              </section>
              <section>
                <TextInputModal
                  label="Posisi/ Jabatan"
                  type="text"
                  value={admissionParentsData?.occupation}
                  disable={true}
                />

                <TextInputModal
                  label="Penghasilan Tiap Bulan"
                  type="number"
                  value={admissionParentsData?.incomeGrade}
                  disable={true}
                />
              </section>
            </div>
          )}
        </form>
      </div>

      {admissionParentsData !== null && (
        <button className="btn-merah" onClick={navigateUbah}>
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineEdit className="mr-2 text-2xl" />
          )}
          Ubah
        </button>
      )}
      {admissionParentsData === null && (
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
          to={"/pmb/form-data-murid"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Halaman Pendataan
          Anak
        </Link>

        <Link
          to={"/pmb/form-data-orang-tua-ibu"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          Halaman Pendataan Ibu{" "}
          <BsChevronRight className="text-xl sm:ml-3 lg:ml-7 mt-0.5" />
        </Link>
      </section>
    </article>
  );
};
export default FormDaftarOrangTua;
