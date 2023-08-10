import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmissionRegistration } from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesPMBWithoutButton } from "../../components/DataTables";
import moment from "moment";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const [validationFilter, setValidationFilter] = useState("inreview");
  const [stepsFilter, setStepsFilter] = useState("inreview");

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

  useEffect(() => {
    getAdmissionRegistration(setData, setSts);
  }, []);

  const navigateRegistrationDetails = (code) => {
    localStorage.setItem("REG_NUMBER", code);
    navigate("/admin/list-detail-data-registrasi");
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
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.admissionPhase.admission.academicYear.name,
      cell: (data) => (
        <div>{data.admissionPhase.admission.academicYear.name}</div>
      ),
      width: "115px",
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
                "Pembayaran Pendaftaran Terverifikasi"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Pembayaran Pendaftaran"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Pembayaran Pendaftaran Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "2" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Berkas Pendaftaran Terverifikasi"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Berkas Pendaftaran"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Berkas Pendaftaran Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "3" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Hasil Tes Terupload"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Hasil Tes"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Hasil Tes Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "4" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Pendaftaran Ulang Tersetujui"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Pendaftaran Ulang"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Pendaftaran Ulang Tidak Sesuai"}
            </>
          )}
          {data.steps[data.steps.length - 1].step === "5" && (
            <>
              {data.steps[data.steps.length - 1].status === "valid" &&
                "Data Sudah Lengkap"}
              {data.steps[data.steps.length - 1].status === "inreview" &&
                "Verifikasi Pembayaran Pendidikan"}
              {data.steps[data.steps.length - 1].status === "invalid" &&
                "Pembayaran Pendidikan Tidak Sesuai"}
            </>
          )}
        </div>
      ),
      width: "250px",
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
      width: "180px",
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
          columns={columns}
          data={filteredItems}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          onChangeValidation={handleValidationFilter}
          valueValidation={validationFilter}
          onChangeSteps={handleStepsFilter}
          valueSteps={stepsFilter}
        />
      </div>
    </>
  );
};
export default DataRegistrasi;
