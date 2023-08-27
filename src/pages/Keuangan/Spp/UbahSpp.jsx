import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postSpp, updateSpp } from "../../../api/Spp";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useRef } from "react";
import { DropdownSiswa } from "../../../components/Dropdown";
import { useEffect } from "react";
import { getSemester } from "../../../api/TahunAjaran";
import { getMurid } from "../../../api/Murid";

export default function UbahSpp() {
  const navigate = useNavigate();
  const path = "/admin/list-spp";
  const uploaderRef = useRef(null);
  const location = useLocation();
  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [amounts, setAmount] = useState();
  const [month, setMonth] = useState(location.state.month);
  const [periodeIds, setPeriodeId] = useState({
    label: location.state.increment,
    value: location.state.periodeId,
  });
  const [studentCodes, setStudentCode] = useState({
    label: location.state.studentName,
    value: location.state.code,
  });
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const [fileInvoice, setFileInvoice] = useState(null);

  const fetchAcademicPeriode = () => {
    getSemester(setAcademicPeriodeData, setSts);
  };

  const fetchStudents = () => {
    getMurid(setStudentsData, setSts);
  };

  useEffect(() => {
    fetchAcademicPeriode();
    fetchStudents();
  }, []);

  console.log("kkakmwk === ", studentsData);

  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  const minFileSize = 0;
  const maxFileSize = 5000000;

  const onRemoveFile = (args) => {};

  const onFileUpload = (args) => {};

  const onSuccess = (args) => {
    console.log("File uploaded successfully!", args);
    setFilesData(args);
  };

  const postData = (e) => {
    const invoice = filesData.file.rawFile;
    const periodeId = periodeIds.value;
    const studentCode = studentCodes.value;
    const amount = parseInt(amounts.replace(/\./g, ""), 10);
    e.preventDefault();

    // if (amount.length === 0 || description.length === 0 || type.length === 0) {
    //   AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    // } else {
    updateSpp(
      setSts,
      path,
      amount,
      month,
      description,
      invoice,
      periodeId,
      studentCode,
      location.state.id
    );
    // }
  };

  const navigateSpp = () => {
    navigate(path);
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  const academicYearOptions = academicPeriodeData.map((c) => ({
    label: `Semester : ${c.increment}`,
    value: c.id,
  }));

  const studentsOptions = studentsData.map((c) => ({
    label: `${c.code} : ${c.firstName} ${c.middleName} ${c.lastName}`,
    value: c.code,
  }));

  return (
    <div>
      <Header
        home="Admin Keuangan"
        prev="List Spp Terbayar"
        navePrev={path}
        at="Ubah Spp"
        title="Ubah Spp"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Spp
        </p>
        <article>
          <DropdownSiswa
            label="Semester"
            required={true}
            defaultValue={periodeId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setPeriodeId(e.value)}
          />
          <TextInput
            label="Spp Bulan"
            type="text"
            onChange={(e) => setMonth(e.target.value)}
            required={true}
          />
          <DropdownSiswa
            label="Murid"
            required={true}
            defaultValue={studentCode}
            isClearable={false}
            options={studentsOptions}
            isSearchable={true}
            onChange={(e) => setStudentCode(e.value)}
          />
          <TextInput
            label="Jumlah"
            type="text"
            onChange={handleInputChange}
            value={amounts}
            required={true}
          />
          <TextInput
            label="Deskripsi"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: "20px",
              width: "auto",
            }}
          >
            <UploaderComponent
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png"
              accept=".png"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !fileInvoice ? "Unggah Bukti Transfer" : "Ganti Berkas",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png</i>
            </small>
          </div>

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
              onClick={navigateSpp}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
