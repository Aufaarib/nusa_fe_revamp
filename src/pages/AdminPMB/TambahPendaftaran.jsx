import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAdmission } from "../../api/SetupPmb";
import { getTahunAjaran } from "../../api/TahunAjaran";
import { Header } from "../../components";
import { DropdownDatePickers, DropdownSiswa } from "../../components/Dropdown";
import { AlertMessage } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";

export default function TambahPendaftaran() {
  const [sts, setSts] = useState(undefined);
  const [formFields, setFormFields] = useState([
    {
      name: "",
      increment: 0,
      startDate: "",
      endDate: "",
      amount: 0,
    },
  ]);
  const [academicYearData, setAcademicYearData] = useState([]);
  const [academicYearId, setacAdemicYearId] = useState("");
  const [name, setName] = useState("");
  const [increment, setIncrement] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [testSchedule, setTestSchedule] = useState("");
  const [registrationAmount, setRegistrationAmount] = useState("");
  const [educationAmount, setEducationAmount] = useState("");
  const [description, setDescription] = useState("Detail Biaya Pendidikan");
  const { isLoading, setIsLoading } = useStateContext();

  const navigate = useNavigate();

  const fetchAcademicYear = () => {
    getTahunAjaran(setAcademicYearData, setSts, setIsLoading);
  };

  useEffect(() => {
    fetchAcademicYear();
  }, []);

  const academicYearOptions = academicYearData.map((c) => ({
    label: `${c.name} : ${c.curriculum.code}`,
    value: c.id,
  }));

  const path = "/admin/list-setup-pmb";

  const postData = (e) => {
    e.preventDefault();

    const gelombang_ke = parseInt(increment);
    const jumlahBiayaPendaftaran = parseInt(
      registrationAmount.replace(/\./g, ""),
      10
    );
    const jumlahBiayaPendidikan = parseInt(
      educationAmount.replace(/\./g, ""),
      10
    );

    if (
      academicYearId === 0 ||
      name === "" ||
      gelombang_ke === 0 ||
      startDate === "" ||
      endDate === "" ||
      testSchedule === "" ||
      description === "" ||
      jumlahBiayaPendaftaran === 0 ||
      jumlahBiayaPendidikan === 0
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postAdmission(
        setSts,
        navigateDataPendaftaran,
        academicYearId,
        name,
        gelombang_ke,
        startDate,
        endDate,
        testSchedule,
        jumlahBiayaPendaftaran,
        description,
        jumlahBiayaPendidikan
      );
    }
  };

  const navigateDataPendaftaran = () => {
    navigate(path);
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    setRegistrationAmount(inputVal);
  };

  const handleInputEduChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    setEducationAmount(inputVal);
  };

  return (
    <div>
      <Header
        home="Admin PMB"
        prev="Setup PMB"
        navPrev={path}
        at="Pendaftaran"
        title="Tambah Pendaftaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Pendaftaran
        </p>
        <article>
          <DropdownSiswa
            label="Tahun Ajaran"
            required={true}
            defaultValue={academicYearId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacAdemicYearId(e.value)}
          />
          <TextInput
            label="Gelombang Ke"
            type="number"
            onChange={(e) => setIncrement(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama Gelombang"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <DropdownDatePickers
            label="Tanggal Mulai"
            value={startDate}
            change={(e) => setStartDate(e.element.value)}
          />
          <DropdownDatePickers
            label="Tanggal Selesai"
            value={endDate}
            change={(e) => setEndDate(e.element.value)}
          />
          <DropdownDatePickers
            label="Tanggal Tes"
            value={testSchedule}
            change={(e) => setTestSchedule(e.element.value)}
          />
          <TextInput
            label="Nominal Biaya Pendaftaran"
            type="text"
            value={registrationAmount}
            onChange={handleInputChange}
            required={true}
          />
          <TextInput
            label="Nominal Biaya Pendidikan"
            type="text"
            value={educationAmount}
            onChange={handleInputEduChange}
            required={true}
          />
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
              onClick={navigateDataPendaftaran}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
