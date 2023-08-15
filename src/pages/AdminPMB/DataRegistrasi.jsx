import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdmissionRegistration,
  moveApplicantToStudent,
} from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesPMBWithoutButton } from "../../components/DataTables";
import { Checkbox } from "@mui/material";
import { AlertConfirmation } from "../../components/ModalPopUp";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const [validationFilter, setValidationFilter] = useState("inreview");
  const [stepsFilter, setStepsFilter] = useState("inreview");

  useEffect(() => {
    getAdmissionRegistration(setData, setSts);
  }, []);

  const handleValidationFilter = (event) => {
    const val = event.target.value;
    setValidationFilter(val);
    if (val === "valid") {
      setStepsFilter("");
    } else {
      setStepsFilter("inreview");
    }
  };

  const handleStepsFilter = (event) => {
    setStepsFilter(event.target.value);
  };

  let filteredItems = null;
  let filteredStatus = null;

  if (data !== null) {
    const filteredValidation = data.filter((data) =>
      data.status.includes(validationFilter)
    );

    const filteredStep5 = filteredValidation.filter((data) =>
      data.steps[data.steps.length - 1].step.includes("5")
    );

    if (stepsFilter === "valid") {
      filteredStatus = filteredStep5.filter(
        (data) => data.steps[data.steps.length - 1].status === stepsFilter
      );
    } else {
      filteredStatus = filteredValidation.filter((data) =>
        data.steps[data.steps.length - 1].status.includes(stepsFilter)
      );
    }

    filteredItems = filteredStatus.filter(
      (data) =>
        data.regNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        data.childName.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const navigateRegistrationDetails = (code) => {
    localStorage.setItem("REG_NUMBER", code);
    navigate("/admin/list-detail-data-registrasi");
  };

  const navigateListStudent = () => {
    navigate("/admin/list-murid");
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const isAllRowsSelected = selectedRows.length === data.length;

  const handleSelectAll = () => {
    const allRowIds = data.map((row) => row.regNumber);
    setSelectedRows(allRowIds);
    handleSubmit();
  };

  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handlePindahSemua = () => {
    AlertConfirmation(
      handleSelectAll,
      "Pindahkan Semua Pendaftar?",
      "Pindahkan"
    );
  };

  const handleSubmit = () => {
    moveApplicantToStudent(navigateListStudent, selectedRows);
  };

  console.log("SELECTED === ", selectedRows);

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
                "Tahap 4 Tersetujui"}
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
          className="btn-action-merah"
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
      selector: (data) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(data.regNumber)}
          onChange={() => handleRowSelect(data.regNumber)}
        />
      ),
      width: "50px",
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
                "Tahap 4 Tersetujui"}
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
        <button
          style={{ width: "auto", padding: "2px 10px" }}
          className="btn-action-merah"
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
        <DataTablesPMBWithoutButton
          columns={validationFilter === "valid" ? columnsCheckbox : columns}
          data={filteredItems}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          onChangeValidation={handleValidationFilter}
          valueValidation={validationFilter}
          onChangeSteps={handleStepsFilter}
          valueSteps={stepsFilter}
          setData={setData}
          setSts={setSts}
          selectableRows
          selectableRowsComponent={Checkbox}
          setSelected={handleSubmit}
          setAllSelected={handlePindahSemua}
          selectedRows={selectedRows}
        />
      </div>
    </>
  );
};
export default DataRegistrasi;
