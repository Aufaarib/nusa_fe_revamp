import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postGuru } from "../../api/Guru";
import { Header } from "../../components";
import { AlertEmpty, AlertMessage } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { DropdownDatePickers, DropdownSiswa } from "../../components/Dropdown";
import { getTahunAjaran } from "../../api/TahunAjaran";
import { postAdmission } from "../../api/SetupPmb";
import { BsHandIndexThumbFill } from "react-icons/bs";

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
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const fetchAcademicYear = () => {
    getTahunAjaran(setAcademicYearData, setSts);
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
    const jumlah = parseInt(amount);

    if (
      academicYearId === 0 ||
      name === "" ||
      gelombang_ke === 0 ||
      startDate === "" ||
      endDate === "" ||
      jumlah === 0
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
        jumlah
      );
      //   setisOpenStatus(true);
    }
    // });
  };

  const navigateDataPendaftaran = () => {
    navigate(path);
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    setAmount(inputVal);
  };

  return (
    <div>
      <Header
        home="Admin PMB"
        prev="Setup PMB"
        navePrev={path}
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
          <TextInput
            label="Nominal"
            type="text"
            value={amount}
            onChange={handleInputChange}
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
