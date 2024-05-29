import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMurid, getMuridbyAcademicId } from "../../../api/Murid";
import { postSpp } from "../../../api/Spp";
import { getSemester, getTahunAjaran } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DropdownMultiple, DropdownSiswa } from "../../../components/Dropdown";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FileUpload } from "../../../components/FileUpload";
import { CircularProgress } from "@mui/material";

export default function TambahSpp() {
  const [academicYearData, setAcademicYearData] = useState([]);
  const [academicPeriodeData, setAcademicPeriodeData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [amounts, setAmount] = useState("");
  const [months, setMonth] = useState([]);
  const [academicYearCode, setAcademicYearCode] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [periodeId, setPeriodeId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [description, setDescription] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const path = "/admin/list-spp";
  const uploaderRef = useRef(null);

  const fetchAcademicYear = () => {
    getTahunAjaran(setAcademicYearData, setSts, setIsLoading);
  };

  const fetchAcademicPeriode = (year) => {
    getSemester(setAcademicPeriodeData, setSts, setIsLoading, year);
  };

  const fetchStudents = (year) => {
    getMuridbyAcademicId(setStudentsData, setSts, setIsLoading, year);
  };

  const navigateListSpp = () => {
    navigate(path);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAcademicYear();
    // fetchAcademicPeriode();
    // fetchStudents();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const invoice = filesData;
    const amount = parseInt(amounts.replace(/\./g, ""), 10);

    const formData = new FormData();

    formData.append(`amount`, amount);
    formData.append(`description`, description);
    formData.append(`invoice`, invoice);
    formData.append(`academicPeriodeId`, periodeId);
    formData.append(`academicYearId`, academicYearId);
    formData.append(`studentCode`, studentCode);

    months.forEach((item, index) => {
      formData.append(`month`, item.value);
    });

    if (
      amounts === "" ||
      months === "" ||
      periodeId === "" ||
      studentCode === "" ||
      invoice == null
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      postSpp(setSts, navigateListSpp, formData, setIsLoading);
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

  const academicYearOptions = academicYearData.map((c) => ({
    label: `Tahun Ajaran : ${c.name}`,
    value: c.code,
    id: c.id,
  }));

  const academicPeriodeOptions = academicPeriodeData?.map((c) => ({
    label: `Semester : ${c.increment}`,
    value: c.id,
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

  const studentsOptions = studentsData?.map((c) => ({
    label: `${c.student.code} : ${c.student.firstName} ${c.student.middleName} ${c.student.lastName}`,
    value: c.student.code,
  }));

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
          <DropdownSiswa
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
              fetchStudents(e.id);
            }}
          />
          {academicYearId && (
            <>
              <DropdownSiswa
                label="Semester"
                required={true}
                defaultValue={periodeId}
                isClearable={false}
                options={academicPeriodeOptions}
                isSearchable={false}
                onChange={(e) => setPeriodeId(e.value)}
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
            </>
          )}
          <DropdownMultiple
            label="Spp Bulan"
            required={true}
            defaultValue={months}
            isClearable={false}
            options={monthOptions}
            isSearchable={false}
            onChange={handleSelectChange}
          />
          <TextInput
            label="Jumlah Yang Di Bayar"
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
