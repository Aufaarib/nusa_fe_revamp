import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMurid, getMuridbyAcademicId } from "../../../api/Murid";
import { getSppByStudent, postSpp } from "../../../api/Spp";
import { getSemester, getTahunAjaran } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DropdownMultiple, DropdownSiswa } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FileUpload } from "../../../components/FileUpload";
import { CircularProgress } from "@mui/material";

export default function TambahSpp() {
  const location = useLocation();
  const [academicYearData, setAcademicYearData] = useState([]);
  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [sppData, setSppData] = useState([]);
  const [amounts, setAmount] = useState("");
  const [taawunAmounts, setTaawunAmounts] = useState([]);
  const [months, setMonth] = useState([]);
  const [academicYearCode, setAcademicYearCode] = useState(
    location.state.academicYearCode
  );
  const [academicYearId, setAcademicYearId] = useState(
    location.state.academicYearId
  );
  const [periodeId, setPeriodeId] = useState("");
  const [studentId, setStudentId] = useState(location.state.id);
  const [studentCode, setStudentCode] = useState(location.state.studentCode);
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const path = "/admin/report-spp";

  // const fetchAcademicYear = () => {
  //   getTahunAjaran(setAcademicYearData, setSts, setIsLoading);
  // };

  // const fetchAcademicPeriode = (year) => {
  //   getSemester(setAcademicPeriodeData, setSts, setIsLoading, year);
  // };

  // const fetchStudents = (year) => {
  //   getMurid(setStudentsData, setSts, setIsLoading);
  // };

  const fetchSppByStudent = () => {
    getSppByStudent(
      setSppData,
      setSts,
      setIsLoading,
      studentCode,
      academicYearCode
    );
  };

  const navigateListSpp = () => {
    navigate(path, {
      state: {
        id: location.state.id,
        studentName: location.state.studentName,
        studentCode: location.state.studentCode,
        academicYearCode: location.state.academicYearCode,
        academicYearId: location.state.academicYearId,
        academicYearName: location.state.academicYearName,
        academicYear: location.state.academicYear,
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    // fetchAcademicYear();
    fetchSppByStudent();
    // fetchAcademicPeriode();
    // fetchStudents();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const invoice = filesData;
    const formData = new FormData();

    formData.append(`description`, description);
    formData.append(`studentId`, studentId);
    formData.append(`academicYearId`, academicYearId);

    months.forEach((item, index) => {
      formData.append(`payment.${index}.month`, item.value);
      formData.append(
        `payment.${index}.infaq`,
        parseInt(amounts.replace(/\./g, ""), 10)
      );
    });

    taawunAmounts.forEach((item, index) => {
      formData.append(
        `payment.${index}.taawun`,
        parseInt(item.replace(/\./g, ""), 10)
      );
      formData.append(`payment.${index}.other`, 0);
    });

    formData.append(`invoice`, invoice);

    if (
      academicYearId === "" ||
      amounts === "" ||
      months === "" ||
      studentCode === "" ||
      invoice == null
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      postSpp(setSts, navigateListSpp, formData, setIsLoading);
    }
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  const handleInputTaawunChange = (val, index) => {
    let inputVal = val.replace(/\D/g, "");
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const newFields = [...taawunAmounts];
    newFields[index] = inputVal;
    setTaawunAmounts(newFields);
  };

  // const academicYearOptions = academicYearData.map((c) => ({
  //   label: `Tahun Ajaran : ${c.name}`,
  //   value: c.code,
  //   id: c.id,
  // }));

  const filteredUnpaid = sppData.filter(
    (items) => items.description === "Belum Lunas"
  );

  const unpaidMonths = filteredUnpaid.map((data) => ({
    value: data.month,
    label: data.description,
  }));

  // const academicPeriodeOptions = academicPeriodeData?.map((c) => ({
  //   label: `Semester : ${c.increment}`,
  //   value: c.id,
  // }));

  const monthOptions = unpaidMonths.map((months) => ({
    value: months.value,
    label: `${
      months.value == 1
        ? "Januari"
        : months.value == 2
        ? "Februari"
        : months.value == 3
        ? "Maret"
        : months.value == 4
        ? "April"
        : months.value == 5
        ? "Mei"
        : months.value == 6
        ? "Juni"
        : months.value == 7
        ? "Juli"
        : months.value == 8
        ? "Agustus"
        : months.value == 9
        ? "September"
        : months.value == 10
        ? "Oktober"
        : months.value == 11
        ? "November"
        : months.value == 12
        ? "Desember"
        : ""
    }`,
  }));

  // const studentsOptions = studentsData?.map((c) => ({
  //   label: `${c.code} : ${c.firstName} ${c.middleName} ${c.lastName}`,
  //   id: c.id,
  //   value: c.code,
  // }));

  const handleSelectChange = (selectedValues) => {
    setMonth(selectedValues);
  };

  return (
    <div>
      <Header
        home="Admin Keuangan"
        prev="Data Pembayaran SPP"
        navPrev={path}
        at="Pembayaran Spp"
        title="Pembayaran Spp"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Pembayaran Spp
        </p>
        <article>
          {/* <DropdownSiswa
            label="Tahun Ajaran"
            required={true}
            defaultValue={academicYearCode}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => {
              fetchAcademicPeriode(e.value);
              setAcademicYearId(e.id);
              setAcademicYearCode(e.value);
            }}
          />
          <DropdownSiswa
            label="Murid"
            required={true}
            defaultValue={studentCode}
            isClearable={false}
            options={studentsOptions}
            isSearchable={true}
            onChange={(e) => {
              fetchSppByStudent(e.value);
              setStudentId(e.id);
              setStudentCode(e.value);
            }}
          /> */}
          <DropdownMultiple
            label="Bulan"
            required={true}
            defaultValue={months}
            isClearable={false}
            options={monthOptions}
            isSearchable={false}
            onChange={handleSelectChange}
          />
          <TextInput
            label="Jumlah Spp Yang Di Bayarkan"
            type="text"
            onChange={handleInputChange}
            value={amounts}
            required={true}
          />
          {months?.map((labels, index) => (
            <TextInput
              key={index}
              label={`Jumlah Ta'awun ${labels.label}`}
              type="text"
              onChange={(e) => handleInputTaawunChange(e.target.value, index)}
              value={taawunAmounts[index]}
              required={true}
            />
          ))}
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
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateListSpp}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
