import moment from "moment/moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAdmissionPhase } from "../../api/Gelombang";
import { Header } from "../../components";
import { DropdownDatePickers } from "../../components/Dropdown";
import { AlertMessage } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";

export default function UbahGelombang() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const [name, setName] = useState(location.state.name);
  const [startDate, setStartDate] = useState(
    moment(location.state.startDate).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(location.state.endDate).format("YYYY-MM-DD")
  );
  const [jumlah, setAmount] = useState(location.state.amount);
  const [increment, setIncrement] = useState(location.state.increment);
  const [sts, setSts] = useState(undefined);
  const id = location.state.id;
  const code = location.state.code;

  const postData = (e) => {
    e.preventDefault();

    const amount = parseInt(jumlah.replace(/\./g, ""), 10);

    if (
      name === "" ||
      increment === "" ||
      startDate === "" ||
      endDate === "" ||
      amount === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateAdmissionPhase(
        setSts,
        navigateAdmissionDetails,
        id,
        code,
        increment,
        name,
        startDate,
        endDate,
        amount
      );
    }
  };

  const navigateAdmissionDetails = () => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
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
        prev="Admission Details"
        navePrev={path}
        at="Gelombang"
        title="Ubah Gelombang"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Gelombang
        </p>
        <article>
          <TextInput
            label="Gelombang Ke"
            type="number"
            value={increment}
            onChange={handleIncrementChange}
            required={true}
          />

          <TextInput
            label="Nama"
            type="text"
            value={name}
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
            value={jumlah}
            onChange={handleInputChange}
            required={true}
          />

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
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
