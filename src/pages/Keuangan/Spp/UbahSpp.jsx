import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMurid } from "../../../api/Murid";
import { getSppByStudent, updateSpp } from "../../../api/Spp";
import { getSemester } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DropdownMultiple, DropdownSiswa } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FileUpload } from "../../../components/FileUpload";
import { CircularProgress } from "@mui/material";

export default function UbahSpp() {
  const navigate = useNavigate();
  const path = "/admin/report-spp";
  const uploaderRef = useRef(null);
  const location = useLocation();
  // const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [infaq, setInfaq] = useState(
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(location.state.infaq)
  );
  const [taawun, setTaawun] = useState(
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(location.state.taawun)
  );
  const [other, setOther] = useState(
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(location.state.other)
  );
  const [otherName, setOtherName] = useState(location.state.name);
  const [months, setMonth] = useState({
    label: location.state.name,
    value: location.state.month,
  });
  const [studentCodes, setStudentCode] = useState({
    label: location.state.studentName,
    value: location.state.code,
  });
  const [description, setDescription] = useState(location.state.description);
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const [sppData, setSppData] = useState([]);
  const { isLoading, setIsLoading } = useStateContext();

  const fetchStudents = () => {
    getMurid(setStudentsData, setSts, setIsLoading);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchStudents();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const invoice = filesData;
    const amount = parseInt(infaq.replace(/\./g, ""), 10);

    const formData = new FormData();

    formData.append(`amount`, amount);
    formData.append(`description`, description);
    // formData.append(`invoice`, invoice);
    // formData.append(`periodeId`, periodeIds.value);
    formData.append(`studentCode`, studentCodes.value);
    formData.append(`month`, months);

    if (
      infaq === "" ||
      months === "" ||
      studentCodes === "" ||
      description === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      updateSpp(
        setSts,
        navigateReportSpp,
        formData,
        location.state.sppId,
        setIsLoading
      );
    }
  };

  const navigateReportSpp = () => {
    navigate(path, {
      state: {
        id: location.state.id,
        studentName: location.state.studentName,
        studentCode: location.state.studentCode,
        academicYearCode: location.state.academicYearCode,
        academicYearId: location.state.academicYearId,
        academicYearName: location.state.academicYearName,
        academicYear: location.state.academicYear,
        kelas: location.state.kelas,
      },
    });
  };

  const handleInputInfaqChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setInfaq(inputVal);
  };

  const handleInputTaawunChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setTaawun(inputVal);
  };

  const handleInputOtherChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setTaawun(inputVal);
  };

  const studentsOptions = studentsData.map((c) => ({
    label: `${c.code} : ${c.firstName} ${c.middleName} ${c.lastName}`,
    value: c.code,
  }));

  const monthOptions = [
    {
      label: "SPP Januari",
      value: 1,
    },
    {
      label: "SPP Februari",
      value: 2,
    },
    {
      label: "SPP Maret",
      value: 3,
    },
    {
      label: "SPP April",
      value: 4,
    },
    {
      label: "SPP Mei",
      value: 5,
    },
    {
      label: "SPP Juni",
      value: 6,
    },
    {
      label: "SPP Juli",
      value: 7,
    },
    {
      label: "SPP Agustus",
      value: 8,
    },
    {
      label: "SPP September",
      value: 9,
    },
    {
      label: "SPP Oktober",
      value: 10,
    },
    {
      label: "SPP November",
      value: 11,
    },
    {
      label: "SPP Desember",
      value: 12,
    },
  ];

  return (
    <div>
      <Header
        home="Admin Keuangan"
        prev="List SPP Terbayar"
        navPrev={path}
        at="Ubah SPP"
        title="Ubah SPP"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah SPP
        </p>
        <article>
          {location.state.other === 0 ? (
            <>
              <DropdownSiswa
                label="Jenis Pembayaran"
                required={true}
                defaultValue={months}
                isClearable={false}
                options={monthOptions}
                isSearchable={false}
                onChange={(e) => setMonth(e.value)}
              />
              <TextInput
                label="Jumlah SPP"
                type="text"
                onChange={handleInputInfaqChange}
                value={infaq}
                required={true}
              />
              <TextInput
                label="Jumlah Taawun"
                type="text"
                onChange={handleInputTaawunChange}
                value={taawun}
                required={true}
              />
            </>
          ) : (
            <>
              <TextInput
                label="Jenis Pembayaran"
                type="text"
                onChange={(e) => setOtherName(e.target.value)}
                value={otherName}
                required={true}
              />
              <TextInput
                label="Jumlah Lain-lain"
                type="text"
                onChange={handleInputOtherChange}
                value={other}
                required={true}
              />
            </>
          )}
          <TextInput
            label="Keterangan"
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
            <FileUpload
              setFilesData={setFilesData}
              filesData={filesData}
              fileInputId={"fileInput1"}
            />
          </div>

          <div className="btn-form flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
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
              onClick={navigateReportSpp}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
