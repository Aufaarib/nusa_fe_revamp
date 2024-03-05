import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DropdownSiswa } from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import { getActiveSession, postDonations, postNews } from "../../../api/Sarat";
import { AlertMessage } from "../../../components/ModalPopUp";
import { useEffect } from "react";

export default function TambahDonations() {
  //   const [data, setData] = useState([]);
  //   const [session_detail_id, setSessionDetailId] = useState("");
  const [totals, setTotal] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const path = "/admin/list-infaq";

  //   console.log("data === ", localStorage.getItem("SESSION_ID"));

  //   useEffect(() => {
  //     getActiveSession(setData, setSts);
  //   }, []);

  const navigateListDonations = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();

    const total = parseInt(totals.replace(/\./g, ""), 10);
    const session_detail_id = parseInt(localStorage.getItem("SESSION_ID"));

    if (total === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postDonations(setSts, navigateListDonations, session_detail_id, total);
    }
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setTotal(inputVal);
  };

  //   const activeSession = data.map((c) => ({
  //     label: `${c.title} : ${c.description}`,
  //     value: c.id,
  //   }));

  return (
    <div>
      <Header
        home="Admin SARAT"
        prev="Daftar Infaq"
        navPrev={path}
        at="Tambah Infaq"
        title="Tambah Infaq"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Infaq
        </p>
        <article>
          {/* <DropdownSiswa
            label="Sesi"
            required={true}
            defaultValue={session_detail_id}
            isClearable={false}
            options={activeSession}
            isSearchable={false}
            onChange={(e) => setSessionDetailId(e.value)}
          /> */}
          <TextInput
            label="Total"
            type="text"
            value={totals}
            onChange={(e) => handleInputChange(e)}
            required={true}
          />
          <br />
          <hr className="mr-10 " />
          <div className="btn-form mr-7">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateListDonations}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
