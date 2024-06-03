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
  const [lainLainAmount, setLainLainAmount] = useState("");
  const [months, setMonth] = useState([]);
  const [academicYearCode, setAcademicYearCode] = useState(
    location.state.academicYearCode
  );
  const [academicYearId, setAcademicYearId] = useState(
    location.state.academicYearId
  );
  const [namaPembayaran, setNamaPembayaran] = useState("");
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
        kelas: location.state.kelas,
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

  // console.log(parseInt(lainLainAmount[0].replace(/\./g, ""), 10));

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const invoice = filesData;
    const formData = new FormData();
    const lainLainAmounts = parseInt(lainLainAmount);

    formData.append(`description`, description);
    formData.append(`studentId`, studentId);
    formData.append(`academicYearId`, academicYearId);

    months.forEach((item, index) => {
      if (namaPembayaran) {
        formData.append(`payment.${index}.name`, namaPembayaran);
        formData.append(`payment.${index}.month`, 0);
        formData.append(`payment.${index}.infaq`, 0);
        formData.append(`payment.${index}.other`, lainLainAmounts);
      } else {
        formData.append(`payment.${index}.name`, item.label);
        formData.append(`payment.${index}.month`, item.value);
        formData.append(
          `payment.${index}.infaq`,
          parseInt(amounts.replace(/\./g, ""), 10)
        );
        formData.append(`payment.${index}.other`, 0);
      }
    });

    taawunAmounts.forEach((item, index) => {
      formData.append(
        `payment.${index}.taawun`,
        parseInt(item.replace(/\./g, ""), 10)
      );
    });

    formData.append(`invoice`, invoice);

    if (
      academicYearId === "" ||
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

  const handleInputLainLainChange = (val, index) => {
    let inputVal = val.replace(/\D/g, "");
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const newFields = [...taawunAmounts];
    newFields[index] = inputVal;
    setLainLainAmount(newFields);
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
        ? "Spp Januari"
        : months.value == 2
        ? "Spp Februari"
        : months.value == 3
        ? "Spp Maret"
        : months.value == 4
        ? "Spp April"
        : months.value == 5
        ? "Spp Mei"
        : months.value == 6
        ? "Spp Juni"
        : months.value == 7
        ? "Spp Juli"
        : months.value == 8
        ? "Spp Agustus"
        : months.value == 9
        ? "Spp September"
        : months.value == 10
        ? "Spp Oktober"
        : months.value == 11
        ? "Spp November"
        : months.value == 12
        ? "Spp Desember"
        : ""
    }`,
  }));

  const newMonthOption = {
    value: "lain-lain",
    label: "Lain-lain",
  };

  const updatedMonthOptions = [newMonthOption, ...monthOptions];

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
          <DropdownMultiple
            label="Jenis Pembayaran"
            required={true}
            defaultValue={months}
            isClearable={false}
            options={updatedMonthOptions}
            isSearchable={false}
            onChange={handleSelectChange}
          />
          {months
            ?.filter((items) => items.value === "lain-lain")
            .map((labels, index) => (
              <>
                <TextInput
                  label="Nama Pembayaran"
                  type="text"
                  value={namaPembayaran}
                  onChange={(e) => setNamaPembayaran(e.target.value)}
                />
                <TextInput
                  key={index}
                  label={`Jumlah ${labels.label}`}
                  type="text"
                  onChange={(e) =>
                    handleInputLainLainChange(e.target.value, index)
                  }
                  value={lainLainAmount[index]}
                  required={true}
                />
              </>
            ))}
          {months.some((option) => option.value !== "lain-lain") ? (
            <TextInput
              label="Jumlah Spp"
              type="text"
              onChange={handleInputChange}
              value={amounts}
              required={true}
            />
          ) : (
            ""
          )}
          {months
            ?.filter((items) => items.value !== "lain-lain")
            .map((labels, index) => (
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
