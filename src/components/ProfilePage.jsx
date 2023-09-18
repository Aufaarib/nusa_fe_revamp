import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { getAdmissionRegistrationApplicant } from "../api/Registrasi";
import { useStateContext } from "../contexts/ContextProvider";
import Header from "./Header";
import TextInput from "./TextInput";

const ProfilepPage = () => {
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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     setIsLoading(true);
  //   };

  return (
    <article>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Pendaftaran Murid"
        title="Profile"
      />
      <div style={{ maxWidth: "145vh", overflow: "auto" }}>
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
          <TextInput
            label="Agama"
            type="text"
            id="religion"
            onChange={(e) => setReligion(e.target.value)}
            value={agama}
            placeholder={admissionApplicantData.religion}
            // defaultValue={admissionApplicantData.religion}
            disable={false}
            required={true}
          />
        </section>
      </div>

      <section className="flex mt-12">
        {admissionApplicantData !== null && (
          <button
            type="button"
            className="w-auto btn-merah"
            // onClick={handleSubmitUpdate}
          >
            {isLoading ? (
              <CgSpinner className="mr-2 text-xl animate-spin" />
            ) : (
              <AiOutlineEdit className="mr-2 text-2xl" />
            )}
            Edit
          </button>
        )}
        {admissionApplicantData === null && (
          <button
            type="button"
            className="w-auto btn-merah"
            // onClick={handleSubmit}
          >
            {isLoading ? (
              <CgSpinner className="mr-2 text-xl animate-spin" />
            ) : (
              <AiOutlineSave className="mr-2 text-2xl" />
            )}
            Simpan
          </button>
        )}

        {/* <div className="flex justify-end w-full">
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
        </div> */}
      </section>
    </article>
  );
};
export default ProfilepPage;
