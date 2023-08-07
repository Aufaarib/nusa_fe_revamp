import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import TextInput from "./TextInput";
import moment from "moment/moment";

import { dropdownData } from "../data/initData";
import { useStateContext } from "../contexts/ContextProvider";

import {
  DropdownDatePickers,
  DropdownListComponents,
  DropdownRadioInputBiological,
  DropdownRadioInputGender,
  DropdownRadioInputisOneHouse,
} from "./Dropdown";
import Header from "./Header";
import { getAdmissionRegistrationParentsWali } from "../api/Registrasi";
import {
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "./ModalPopUp";

// const PARENTS_URL = "/api/pmb/parent";

const FormDaftarOrangTuaWali = ({ indexOrtu }) => {
  const token = localStorage.getItem("TOKEN");
  const {
    isLoading,
    setIsLoading,
    errMsg,
    setErrMsg,
    parents,
    setParents,
    setSuccessMsg,
    openForm,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [admissionParentsData, setAdmissionParents] = useState([]);
  const [sts, setSts] = useState(false);
  const [parent, setParent] = useState({});
  const [duplicateData, setDuplicateData] = useState(false);

  const navigate = useNavigate();
  const path = "/pmb/tahapan-pmb";

  const fetchAdmissonParents = async () => {
    getAdmissionRegistrationParentsWali(setAdmissionParents, setSts);
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
    console.log("PARENTS DATA === ", parent);
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

  const updateParentsDropDownCal = (e) => {
    const fieldName = e.element.id;
    setParent((existingValues) => ({
      // Retain the existing values
      ...existingValues,
      // update the current field
      [fieldName]: e.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fullName = parent.fullName;
    const familyIdentityNumber = parent.familyIdentityNumber;
    const identityNumber = parent.identityNumber;
    const gender = parent.gender;
    const relationship = "perwalian";
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

    console.log("PARENT === ", parent);

    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/user/parent",
        {
          fullName,
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
        AlertStatusTambahSuccess("/pmb/form-data-orang-tua-wali");
      })
      .catch(() => {
        setIsLoading(false);
        AlertStatusTambahFailed();
      });
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const code = admissionParentsData.code;
    const fullName = parent.fullName;
    const familyIdentityNumber = parent.familyIdentityNumber;
    const identityNumber = parent.identityNumber;
    const gender = parent.gender;
    const relationship = "perwalian";
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

    console.log("PARENT === ", parent);

    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/user/parent/${code}`,
        {
          fullName,
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
        AlertStatusTambahSuccess("/pmb/form-data-orang-tua-wali");
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
        at="Pendataan Wali"
        title="Form Pendataan Orang Tua"
      />
      <div style={{ maxWidth: "140vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "10px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pendaftaran Wali</h1>
            <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p>
          </section>

          {/* COL 2 */}
          {admissionParentsData.length !== 0 ? (
            <section className="xs:col-span-3 lg:col-span-1 mt-5">
              <TextInput
                label="Nama Lengkap"
                type="text"
                id="fullName"
                onChange={updateParents}
                value={parent.fullName}
                placeholder={admissionParentsData.fullName}
                disable={false}
                required={true}
              />{" "}
              <br />
              <DropdownRadioInputGender
                required={true}
                label="Ubah Jenis Kelamin"
                value1="female"
                value2="male"
                label2="Perempuan"
                label3="Laki-Laki"
                onChange={updateParentsRadio}
                // placeholder={admissionApplicantData.gender}
                checked={parent.gender}
              />
              <br />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="number"
                id="familyIdentityNumber"
                onChange={updateParents}
                value={parent.familyIdentityNumber}
                placeholder={admissionParentsData.familyIdentityNumber}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Identitas"
                type="number"
                id="identityNumber"
                onChange={updateParents}
                value={parent.identityNumber}
                placeholder={admissionParentsData.identityNumber}
                disable={false}
                required={true}
              />
              <br />
              <DropdownRadioInputBiological
                required={true}
                label="Hubungan Wali"
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
                placeholder={admissionParentsData.phoneNumber_1}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Ponsel 2"
                type="numer"
                id="phoneNumber2"
                onChange={updateParents}
                value={parent.phoneNumber2}
                placeholder={admissionParentsData.phoneNumber_2}
                disable={false}
                required={true}
              />
              <TextInput
                label="Propinsi"
                type="text"
                id="province"
                onChange={updateParents}
                value={parent.province}
                placeholder={admissionParentsData.province}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kota"
                type="text"
                id="city"
                onChange={updateParents}
                value={parent.city}
                placeholder={admissionParentsData.city}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kecamatan"
                type="text"
                id="subDistrict"
                onChange={updateParents}
                value={parent.subDistrict}
                placeholder={admissionParentsData.subDistrict}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kelurahan"
                type="text"
                id="village"
                onChange={updateParents}
                value={parent.village}
                placeholder={admissionParentsData.village}
                disable={false}
                required={true}
              />
              <TextInput
                label="Alamat"
                type="text"
                id="address"
                onChange={updateParents}
                value={parent.address}
                placeholder={admissionParentsData.address}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kode Pos"
                type="number"
                id="postalCode"
                onChange={updateParents}
                value={parent.postalCode}
                placeholder={admissionParentsData.postalCode}
                disable={false}
                required={true}
              />
              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={updateParents}
                value={parent.birthPlace}
                placeholder={admissionParentsData.birthPlace}
                disable={false}
                required={true}
              />
              <TextInput
                label="Tanggal Lahir"
                type="text"
                id="birthDate"
                // onChange={updateParents}
                // value={parent.birthDate}
                placeholder={moment(admissionParentsData.birthDate).format(
                  "DD-MM-YYYY"
                )}
                disable={false}
                required={true}
              />
              <DropdownDatePickers
                label="Ubah Tanggal Lahir"
                id="birthDate"
                value={parent.birthDate}
                change={updateParentsCal.bind(this)}
              />
              {admissionParentsData.gender === "male" ? (
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
                onChange={updateParentsRadio}
                // placeholder={admissionApplicantData.gender}
                checked={parent.gender}
              />
              <br />
              <TextInput
                label="Pendidikan Terakhir"
                type="text"
                id="lastEducation"
                onChange={updateParents}
                value={parent.lastEducation}
                placeholder={admissionParentsData.lastEducation}
                disable={false}
                required={true}
              />
              <TextInput
                label="Perusahaan Tempat Bekerja"
                type="text"
                id="placeOfWork"
                onChange={updateParents}
                value={parent.placeOfWork}
                placeholder={admissionParentsData.placeOfWork}
                disable={false}
                required={true}
              />
              <TextInput
                label="Posisi/ Jabatan"
                type="text"
                id="occupation"
                onChange={updateParents}
                value={parent.occupation}
                placeholder={admissionParentsData.occupation}
                disable={false}
                required={true}
              />
              <TextInput
                label="Penghasilan Tiap Bulan"
                type="number"
                id="incomeGrade"
                onChange={updateParents}
                value={parent.incomeGrade}
                placeholder={admissionParentsData.incomeGrade}
                disable={false}
                required={true}
                min="1"
              />
            </section>
          ) : (
            <section className="xs:col-span-3 lg:col-span-1 mt-5">
              <TextInput
                label="Nama Lengkap"
                type="text"
                id="fullName"
                onChange={updateParents}
                value={parent.fullName}
                // placeholder={admissionParentsData.fullName}
                disable={false}
                required={true}
              />
              <br />
              <DropdownRadioInputGender
                required={true}
                label="Ubah Jenis Kelamin"
                value1="female"
                value2="male"
                label2="Perempuan"
                label3="Laki-Laki"
                onChange={updateParentsRadio}
                // placeholder={admissionApplicantData.gender}
                checked={parent.gender}
              />
              <br />
              <TextInput
                label="Nomor Kartu Keluarga"
                type="number"
                id="familyIdentityNumber"
                onChange={updateParents}
                value={parent.familyIdentityNumber}
                // placeholder={admissionParentsData.familyIdentityNumber}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Identitas "
                type="number"
                id="identityNumber"
                onChange={updateParents}
                value={parent.identityNumber}
                // placeholder={admissionParentsData.identityNumber}
                disable={false}
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
                placeholder={admissionParentsData.phoneNumber_1}
                disable={false}
                required={true}
              />
              <TextInput
                label="Nomor Ponsel 2"
                type="numer"
                id="phoneNumber2"
                onChange={updateParents}
                value={parent.phoneNumber2}
                // placeholder={admissionParentsData.phoneNumber_2}
                disable={false}
                required={true}
              />
              <TextInput
                label="Propinsi"
                type="text"
                id="province"
                onChange={updateParents}
                value={parent.province}
                // placeholder={admissionParentsData.province}
                disable={false}
                required={true}
              />
              <TextInput
                label="Kota"
                type="text"
                id="city"
                onChange={updateParents}
                value={parent.city}
                // placeholder={admissionParentsData.city}
                disable={false}
                required={true}
              />

              <TextInput
                label="Kecamatan"
                type="text"
                id="subDistrict"
                onChange={updateParents}
                value={parent.subDistrict}
                // placeholder={admissionParentsData.subDistrict}
                disable={false}
                required={true}
              />

              <TextInput
                label="Kelurahan"
                type="text"
                id="village"
                onChange={updateParents}
                value={parent.village}
                // placeholder={admissionParentsData.village}
                disable={false}
                required={true}
              />

              <TextInput
                label="Alamat"
                type="text"
                id="address"
                onChange={updateParents}
                value={parent.address}
                // placeholder={admissionParentsData.address}
                disable={false}
                required={true}
              />

              <TextInput
                label="Kode Pos"
                type="number"
                id="postalCode"
                onChange={updateParents}
                value={parent.postalCode}
                // placeholder={admissionParentsData.postalCode}
                disable={false}
                required={true}
              />

              <TextInput
                label="Tempat Lahir"
                type="text"
                id="birthPlace"
                onChange={updateParents}
                value={parent.birthPlace}
                // placeholder={admissionParentsData.birthPlace}
                disable={false}
                required={true}
              />

              <DropdownDatePickers
                label="Tanggal Lahir"
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
                // placeholder={admissionParentsData.lastEducation}
                disable={false}
                required={true}
              />

              <TextInput
                label="Perusahaan Tempat Bekerja"
                type="text"
                id="placeOfWork"
                onChange={updateParents}
                value={parent.placeOfWork}
                // placeholder={admissionParentsData.placeOfWork}
                disable={false}
                required={true}
              />

              <TextInput
                label="Posisi/ Jabatan"
                type="text"
                id="occupation"
                onChange={updateParents}
                value={parent.occupation}
                // placeholder={admissionParentsData.occupation}
                disable={false}
                required={true}
              />

              <TextInput
                label="Penghasilan Tiap Bulan"
                type="number"
                id="incomeGrade"
                onChange={updateParents}
                value={parent.incomeGrade}
                // placeholder={admissionParentsData.incomeGrade}
                disable={false}
                required={true}
                min="1"
              />
            </section>
          )}
        </form>
      </div>

      <section className="flex mt-12">
        {admissionParentsData.length !== 0 && (
          <button
            type="button"
            className="w-auto btn-merah"
            onClick={handleSubmitUpdate}
          >
            {isLoading ? (
              <CgSpinner className="mr-2 text-xl animate-spin" />
            ) : (
              <AiOutlineEdit className="mr-2 text-2xl" />
            )}
            Edit
          </button>
        )}
        {admissionParentsData.length === 0 && (
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
            to={"/pmb/form-data-orang-tua-ibu"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Pendaftaran
            Ibu
          </Link>

          <Link
            to={"/pmb/form-pernyataan"}
            className={`${
              openForm == "form_ortu_identitas" &&
              "pointer-events-none text-gray-300"
            } w-auto pr-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap`}
          >
            Form Pernyataan <BsChevronRight className="text-xl ml-2 mt-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
};
export default FormDaftarOrangTuaWali;
