import { Checkbox } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdmissionRegistration,
  moveApplicantToStudent,
} from "../../api/Registrasi";
import { Header, UserProfile } from "../../components";
import { DataTablesRegistrations } from "../../components/DataTables";
import { AlertConfirmation } from "../../components/ModalPopUp";
import { getTahunAjaran } from "../../api/TahunAjaran";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [academicYeardata, setAcademicYeardata] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const year = moment().format("YYYY");

  const [validationFilter, setValidationFilter] = useState(
    localStorage.getItem("ValidationFilter")
  );
  const [academicYearFilter, setAcademicYearFilter] = useState(year);
  const [stepsFilter, setStepsFilter] = useState(
    localStorage.getItem("StepsFilter")
  );

  const [filterValidation, SetFilterValidation] = useState(
    localStorage.getItem("FilterValidation")
  );
  const [filterAcademicYear, SetFilterAcademicYear] = useState(
    localStorage.getItem("FilterAcademicYear")
  );
  const [filterSteps, SetFilterSteps] = useState(
    localStorage.getItem("FilterSteps")
  );

  localStorage.setItem("ValidationFilter", validationFilter);
  localStorage.setItem("StepsFilter", stepsFilter);

  localStorage.setItem("FilterValidation", filterValidation);
  localStorage.setItem("FilterAcademicYear", filterAcademicYear);
  localStorage.setItem("FilterSteps", filterSteps);

  useEffect(() => {
    getAdmissionRegistration(setData, setSts);
    getTahunAjaran(setAcademicYeardata, setSts);
  }, []);

  const handleAcademicYearFilter = (event) => {
    const val = event.target.value;
    setAcademicYearFilter(val);
  };
  const handleValidationFilter = (event) => {
    const val = event.target.value;
    setValidationFilter(val);
  };
  const handleStepsFilter = (event) => {
    setStepsFilter(event.target.value);
  };

  let filteredItems = data;
  let filteredSteps = null;
  let filteredValidation = null;
  let filteredAcademicYear = null;

  console.log("dwada === ", filteredItems);

  // filter logics
  if (data !== null) {
    // showing all data
    filteredItems = data.filter(
      (data) =>
        data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        data.childName.toLowerCase().includes(filterText.toLowerCase())
    );
    // if academic year filter button is on, this will filtering data by academic year
    if (filterAcademicYear === "true") {
      filteredAcademicYear = data.filter(
        (data) =>
          data.admissionPhase?.admission?.academicYear?.year ===
          academicYearFilter
      );
      // then set applicant status filtering by filtered data of academic year
      filteredValidation = filteredAcademicYear?.filter(
        (data) => data.status === validationFilter
      );
      // if academic year filter button is off, applicant status filtering will be set to default data
    } else if (filterAcademicYear === "false") {
      filteredValidation = data.filter(
        (data) => data.status === validationFilter
      );
    }
    // if applicant status filter button is on, this will filtering steps status by filtered applicant status
    if (filterValidation === "true") {
      // if (validationFilter === "inreview") {
      if (stepsFilter === "complete") {
        filteredSteps = filteredValidation.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "5" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "verification") {
        filteredSteps = filteredValidation.filter(
          (data) => data.steps[data.steps.length - 1].status === "inreview"
        );
      } else if (stepsFilter === "testResult") {
        filteredSteps = filteredValidation.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "2" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "reReg") {
        filteredSteps = filteredValidation.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "3" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "eduPayment") {
        filteredSteps = filteredValidation.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "4" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "invalid") {
        filteredSteps = filteredValidation.filter(
          (data) => data.steps[data.steps.length - 1].status === "invalid"
        );
      } else {
        filteredSteps = filteredValidation.filter(
          (data) => data.steps[data.steps.length - 1].status === "inreview"
        );
      }
      // }
      // if applicant status filter button is off, this will filtering steps status by default data
    } else if (filterValidation === "false") {
      // if (validationFilter === "inreview") {
      if (stepsFilter === "complete") {
        filteredSteps = data.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "5" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "verification") {
        filteredSteps = data.filter(
          (data) => data.steps[data.steps.length - 1].status === "inreview"
        );
      } else if (stepsFilter === "testResult") {
        filteredSteps = data.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "2" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "reReg") {
        filteredSteps = data.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "3" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "eduPayment") {
        filteredSteps = data.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "4" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "invalid") {
        filteredSteps = data.filter(
          (data) => data.steps[data.steps.length - 1].status === "invalid"
        );
      } else {
        filteredSteps = data.filter(
          (data) => data.steps[data.steps.length - 1].status === "inreview"
        );
      }
      // }
    }

    if (filterValidation === "true") {
      filteredItems = filteredValidation?.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
      if (filterSteps === "true") {
        // if (validationFilter === "inreview") {
        filteredItems = filteredSteps?.filter(
          (data) =>
            data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
            data.childName.toLowerCase().includes(filterText.toLowerCase())
        );
      }
    } else if (filterAcademicYear === "true") {
      filteredItems = filteredAcademicYear?.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
      if (filterSteps === "true") {
        // if (validationFilter === "inreview") {
        filteredItems = filteredSteps?.filter(
          (data) =>
            data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
            data.childName.toLowerCase().includes(filterText.toLowerCase())
        );
        // }
      }
    } else if (filterSteps === "true") {
      filteredItems = filteredSteps?.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }

  const navigateRegistrationDetails = (code) => {
    localStorage.setItem("REG_NUMBER", code);
    navigate("/admin/list-detail-data-registrasi");
  };

  const navigateListStudent = () => {
    navigate("/admin/list-murid");
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const isAllRowsSelected = selectedRows.length === filteredItems.length;

  const handleSelectAll = () => {
    if (selectedRows.length === filteredItems.length) {
      setSelectedRows([]);
    } else {
      const allRowIds = filteredItems.map((row) => row.regNumber);
      setSelectedRows(allRowIds);
    }
    //   const allRowIds = filteredItems.map((row) => row.regNumber);
    //   setSelectedRows(allRowIds);
    //   handleSubmit();
  };

  const handleRowSelect = (regNumber) => {
    if (selectedRows.includes(regNumber)) {
      setSelectedRows(selectedRows.filter((id) => id !== regNumber));
    } else {
      setSelectedRows([...selectedRows, regNumber]);
    }
  };

  const handlePindah = () => {
    AlertConfirmation(
      handleSubmit,
      "Jadikan Pendaftar Terpilih Sebagai Murid?",
      `Jumlah Total ${selectedRows.length} Pendaftar Terpilih`,
      "Jadikan Sebagai Murid",
      "question"
    );
  };

  const handleSubmit = () => {
    moveApplicantToStudent(navigateListStudent, selectedRows);
  };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nomor Registrasi</div>,
      selector: (data) => data.regNumber,
      cell: (data) => <div>{data.regNumber}</div>,
      width: "125px",
    },
    {
      name: <div>Nama Anak</div>,
      selector: (data) => data.childName,
      cell: (data) => <div>{data.childName}</div>,
      width: "140px",
    },
    {
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.admissionPhase.admission.academicYear.name,
      cell: (data) => (
        <div>{data.admissionPhase.admission.academicYear.name}</div>
      ),
      width: "110px",
    },
    {
      name: <div>Status Pendaftaran</div>,
      cell: (data) => (
        <div
          className={
            data.status === "valid"
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status === "valid" ? "Terverifikasi" : "Belum Terverifikasi"}
        </div>
      ),
      width: "160px",
    },
    {
      name: <div>Status Tahapan</div>,
      cell: (data) => (
        <div
          className={
            data.steps[data.steps.length - 1].status !== "valid"
              ? "capitalize text-kuning"
              : "capitalize text-hijau"
          }
        >
          {data.steps[data.steps.length - 1].step === "1" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Tahap 1 Terverifikasi"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 1"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 1 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "2" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Menunggu Hasil Tes"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 2"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 2 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "3" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Menunggu Persetujuan Daftar Ulang"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 3"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 3 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "4" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Menunggu Pembayaran Pendidikan"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 4"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 4 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "5" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Tahap Selesai"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 5"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 5 Tidak Sesuai"}
            </>
          )}
        </div>
      ),
      width: "150px",
    },
    {
      name: <div>Aktifitas Terakhir</div>,
      // selector: (data) => data.childName,
      cell: (data) =>
        moment(data.steps[data.steps.length - 1].updatedAt).format(
          "DD-MM-YYYY"
        ),
      width: "125px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          style={{ width: "auto", padding: "2px 10px" }}
          className="btn-biru"
          onClick={() => navigateRegistrationDetails(data.regNumber)}
        >
          <i className="fa fa-eye" /> Detail
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "130px",
    },
  ];

  console.log("makmdsdsad === ", selectedRows);

  const columnsCheckbox = [
    {
      name: (
        <input
          type="checkbox"
          checked={isAllRowsSelected}
          onChange={handleSelectAll}
        />
        // <div onClick={handleSelectAll}>
        //   {isAllRowsSelected ? "Deselect All" : "Select All"}
        // </div>
      ),
      selector: (data) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(data.regNumber)}
          onChange={() => handleRowSelect(data.regNumber)}
        />
      ),
      width: "60px",
    },
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "45px",
    },
    {
      name: <div>Nomor Registrasi</div>,
      selector: (data) => data.regNumber,
      cell: (data) => <div>{data.regNumber}</div>,
      width: "125px",
    },
    {
      name: <div>Nama Anak</div>,
      selector: (data) => data.childName,
      cell: (data) => <div>{data.childName}</div>,
      width: "130px",
    },
    {
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.admissionPhase.admission.academicYear.name,
      cell: (data) => (
        <div>{data.admissionPhase.admission.academicYear.name}</div>
      ),
      width: "110px",
    },
    {
      name: <div>Status Pendaftaran</div>,
      cell: (data) => (
        <div
          className={
            data.status === "valid"
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status === "valid" ? "Terverifikasi" : "Belum Terverifikasi"}
        </div>
      ),
      width: "160px",
    },
    {
      name: <div>Status Tahapan</div>,
      cell: (data) => (
        <div
          className={
            data.steps[data.steps.length - 1].status !== "valid"
              ? "capitalize text-kuning"
              : "capitalize text-hijau"
          }
        >
          {data.steps[data.steps.length - 1].step === "1" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Tahap 1 Terverifikasi"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 1"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 1 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "2" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Tahap 2 Terverifikasi"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 2"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 2 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "3" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Tahap 3 Terupload"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 3"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 3 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "4" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Menunggu Pembayaran Pendidikan"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 4"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 4 Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "5" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Tahap Selesai"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Tahap 5"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Tahap 5 Tidak Sesuai"}
            </>
          )}
        </div>
      ),
      width: "130px",
    },
    {
      name: <div>Aktifitas Terakhir</div>,
      // selector: (data) => data.childName,
      cell: (data) =>
        moment(data.steps[data.steps.length - 1].updatedAt).format(
          "DD-MM-YYYY"
        ),
      width: "125px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            onClick={() => navigateRegistrationDetails(data.regNumber)}
          >
            <i className="fa fa-eye" /> Detail
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "130px",
    },
  ];

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Data Registrasi"
        title="Data Registrasi"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesRegistrations
          columns={
            filterValidation === "true" && validationFilter === "valid"
              ? columnsCheckbox
              : columns
          }
          filterValidation={filterValidation}
          SetFilterValidation={SetFilterValidation}
          filterAcademicYear={filterAcademicYear}
          SetFilterAcademicYear={SetFilterAcademicYear}
          filterSteps={filterSteps}
          SetFilterSteps={SetFilterSteps}
          data={filteredItems}
          academicYeardata={academicYeardata}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          onChangeAcademicYear={handleAcademicYearFilter}
          valueAcademicYear={academicYearFilter}
          onChangeValidation={handleValidationFilter}
          valueValidation={validationFilter}
          onChangeSteps={handleStepsFilter}
          valueSteps={stepsFilter}
          setData={setData}
          setSts={setSts}
          // selectableRows
          // selectableRowsComponent={Checkbox}
          setSelected={handlePindah}
          // setAllSelected={handlePindahSemua}
          selectedRows={selectedRows}
        />
      </div>
    </>
  );
};
export default DataRegistrasi;
