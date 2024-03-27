import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdmissionRegistration,
  moveApplicantToStudent,
} from "../../api/Registrasi";
import { getTahunAjaran } from "../../api/TahunAjaran";
import { Header } from "../../components";
import { DataTablesRegistrations } from "../../components/DataTables";
import { AlertConfirmation } from "../../components/ModalPopUp";
import { useStateContext } from "../../contexts/ContextProvider";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [academicYeardata, setAcademicYeardata] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const year = moment().format("YYYY");
  const { isLoading, setIsLoading } = useStateContext();

  const [validationFilter, setValidationFilter] = useState(
    localStorage.getItem("ValidationFilter") == null
      ? "inreview"
      : localStorage.getItem("ValidationFilter")
  );
  const [academicYearFilter, setAcademicYearFilter] = useState(year);
  const [stepsFilter, setStepsFilter] = useState(
    localStorage.getItem("StepsFilter") == null
      ? "verification"
      : localStorage.getItem("StepsFilter")
  );
  const [filterValidation, SetFilterValidation] = useState(
    localStorage.getItem("FilterValidation") == null
      ? "false"
      : localStorage.getItem("FilterValidation")
  );
  const [filterAcademicYear, SetFilterAcademicYear] = useState(
    localStorage.getItem("FilterAcademicYear") == null
      ? "false"
      : localStorage.getItem("FilterAcademicYear")
  );
  const [filterSteps, SetFilterSteps] = useState(
    localStorage.getItem("FilterSteps") == null
      ? "false"
      : localStorage.getItem("FilterSteps")
  );

  localStorage.setItem("ValidationFilter", validationFilter);
  localStorage.setItem("StepsFilter", stepsFilter);
  localStorage.setItem("FilterValidation", filterValidation);
  localStorage.setItem("FilterAcademicYear", filterAcademicYear);
  localStorage.setItem("FilterSteps", filterSteps);

  useEffect(() => {
    setIsLoading(true);
    getAdmissionRegistration(setData, setSts, setIsLoading);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTahunAjaran(setAcademicYeardata, setSts, setIsLoading);
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

  // filter logics
  if (data !== null) {
    filteredItems = data.filter(
      (data) =>
        data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        data.childName.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filterAcademicYear === "true") {
      filteredAcademicYear = data.filter(
        (data) =>
          data.admissionPhase?.admission?.academicYear?.year ===
          academicYearFilter
      );
      filteredItems = filteredAcademicYear.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterValidation === "true") {
      filteredValidation = data.filter(
        (data) => data.status === validationFilter
      );
      filteredItems = filteredValidation.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterSteps === "true") {
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
          (data) => data.steps[data.steps.length - 1].status === "invalid"
        );
      }
      filteredItems = filteredSteps.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (
      filterAcademicYear === "true" &&
      filterValidation === "true" &&
      filterSteps === "true"
    ) {
      filteredValidation = filteredAcademicYear.filter(
        (data) => data.status === validationFilter
      );
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
      }
      filteredItems = filteredSteps.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filterAcademicYear === "true" && filterValidation === "true") {
      filteredValidation = filteredAcademicYear?.filter(
        (data) => data.status === validationFilter
      );
      filteredItems = filteredValidation.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filterAcademicYear === "true" && filterSteps === "true") {
      if (stepsFilter === "complete") {
        filteredSteps = filteredAcademicYear.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "5" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "verification") {
        filteredSteps = filteredAcademicYear.filter(
          (data) => data.steps[data.steps.length - 1].status === "inreview"
        );
      } else if (stepsFilter === "testResult") {
        filteredSteps = filteredAcademicYear.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "2" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "reReg") {
        filteredSteps = filteredAcademicYear.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "3" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "eduPayment") {
        filteredSteps = filteredAcademicYear.filter(
          (data) =>
            data.steps[data.steps.length - 1].step === "4" &&
            data.steps[data.steps.length - 1].status === "valid"
        );
      } else if (stepsFilter === "invalid") {
        filteredSteps = filteredAcademicYear.filter(
          (data) => data.steps[data.steps.length - 1].status === "invalid"
        );
      }
      filteredItems = filteredSteps.filter(
        (data) =>
          data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
          data.childName.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filterValidation === "true" && filterSteps === "true") {
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
      }
      filteredItems = filteredSteps.filter(
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
  const isAllRowsSelected = selectedRows.length === filteredItems?.length;

  const handleSelectAll = () => {
    if (selectedRows.length === filteredItems.length) {
      setSelectedRows([]);
    } else {
      const allRowIds = filteredItems.map((row) => row.regNumber);
      setSelectedRows(allRowIds);
    }
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
      width: "auto",
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

  const columnsCheckbox = [
    {
      name: (
        <input
          type="checkbox"
          checked={isAllRowsSelected}
          onChange={handleSelectAll}
        />
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
          filterSteps={filterSteps}
          SetFilterSteps={SetFilterSteps}
          data={filteredItems}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          filterAcademicYear={filterAcademicYear}
          SetFilterAcademicYear={SetFilterAcademicYear}
          onChangeAcademicYear={handleAcademicYearFilter}
          academicYeardata={academicYeardata}
          valueAcademicYear={academicYearFilter}
          onChangeValidation={handleValidationFilter}
          valueValidation={validationFilter}
          onChangeSteps={handleStepsFilter}
          valueSteps={stepsFilter}
          setData={setData}
          setSts={setSts}
          setSelected={handlePindah}
          selectedRows={selectedRows}
        />
      </div>
    </>
  );
};
export default DataRegistrasi;
