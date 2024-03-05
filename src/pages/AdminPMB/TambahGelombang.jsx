import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdmissionPhase } from "../../api/Gelombang";
import { Header } from "../../components";
import { DropdownDatePickers } from "../../components/Dropdown";
import { AlertMessage } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";

export default function TambahGelombang() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [testSchedule, setTestSchedule] = useState("");
  const [amount, setAmount] = useState();
  const [increment, setIncrement] = useState();
  const [sts, setSts] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const code = location.state.code;
  const status = location.state.status;
  const { isLoading, setIsLoading } = useStateContext();

  const navigateAdmissionDetail = () => {
    navigate("/admin/admission-detail", {
      state: {
        theresActive: location.state.theresActive,
        code: code,
        status: status,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();

    if (
      name.length === "" ||
      increment === "" ||
      startDate.length === "" ||
      endDate.length === "" ||
      testSchedule === "" ||
      amount === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      const jumlah = parseInt(amount.replace(/\./g, ""), 10);
      setIsLoading(true);
      postAdmissionPhase(
        setSts,
        navigateAdmissionDetail,
        code,
        increment,
        name,
        startDate,
        endDate,
        testSchedule,
        jumlah,
        setIsLoading
      );
    }
  };

  const navigateAdmissionDetails = () => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
        theresActive: location.state.theresActive,
      },
    });
  };

  const handleIncrementChange = (e) => {
    const value = parseInt(e.target.value);
    setIncrement(value);
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
        navPrev={path}
        at="Gelombang"
        title="Tambah Gelombang"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Gelombang
        </p>
        <article>
          <TextInput
            label="Gelombang Ke"
            type="number"
            onChange={handleIncrementChange}
            required={true}
          />
          <TextInput
            label="Nama"
            type="text"
            id="group"
            name="code"
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
            label="Jadwal Tes"
            value={testSchedule}
            change={(e) => setTestSchedule(e.element.value)}
          />
          <TextInput
            label="Nominal Biaya Pendaftaran"
            type="text"
            onChange={handleInputChange}
            value={amount}
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
              onClick={navigateAdmissionDetails}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
