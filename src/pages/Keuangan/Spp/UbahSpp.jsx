import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMurid } from "../../../api/Murid";
import { updateSpp } from "../../../api/Spp";
import { getSemester } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DropdownMultiple, DropdownSiswa } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahSpp() {
  const navigate = useNavigate();
  const path = "/admin/list-spp";
  const uploaderRef = useRef(null);
  const location = useLocation();
  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [amounts, setAmount] = useState(location.state.amount);
  const [months, setMonth] = useState({
    value: location.state.month,
  });
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

  console.log(months);

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
    const invoice = filesData?.file?.rawFile;
    const amount = parseInt(amounts.replace(/\./g, ""), 10);
    e.preventDefault();

    const formData = new FormData();

    formData.append(`amount`, amount);
    formData.append(`description`, description);
    formData.append(`invoice`, invoice);
    formData.append(`periodeId`, periodeIds.value);
    formData.append(`studentCode`, studentCodes.value);
    formData.append(`month`, months);

    if (
      amounts === "" ||
      months === "" ||
      periodeIds === "" ||
      studentCodes === "" ||
      description === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateSpp(setSts, navigateSpp, formData, location.state.id);
    }
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

  const monthOptions = [
    {
      label: "Januari",
      value: 1,
    },
    {
      label: "Februari",
      value: 2,
    },
    {
      label: "Maret",
      value: 3,
    },
    {
      label: "April",
      value: 4,
    },
    {
      label: "Mei",
      value: 5,
    },
    {
      label: "Juni",
      value: 6,
    },
    {
      label: "Juli",
      value: 7,
    },
    {
      label: "Agustus",
      value: 8,
    },
    {
      label: "September",
      value: 9,
    },
    {
      label: "Oktober",
      value: 10,
    },
    {
      label: "November",
      value: 11,
    },
    {
      label: "Desember",
      value: 12,
    },
  ];

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
            defaultValue={periodeIds}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setPeriodeId(e.value)}
          />
          <DropdownSiswa
            label="Spp Bulan"
            required={true}
            defaultValue={months}
            isClearable={false}
            options={monthOptions}
            isSearchable={false}
            onChange={(e) => setMonth(e.value)}
          />
          <DropdownSiswa
            label="Murid"
            required={true}
            defaultValue={studentCodes}
            isClearable={false}
            options={studentsOptions}
            isSearchable={true}
            onChange={(e) => setStudentCode(e)}
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
            value={description}
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
            <label htmlFor="invoice" className="block mt-4 mb-1">
              Upload Bukti Pembayaran{" "}
            </label>
            <UploaderComponent
              id="invoice"
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !filesData ? "Pilih File" : "Ganti File",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png / .jpg</i>
            </small>
          </div>

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
