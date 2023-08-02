import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBank } from "../../api/Bank";
import { Header } from "../../components";
import {
  DataTablesPMB,
  DataTablesPMBWithoutButton,
} from "../../components/DataTables";
import {
  ApprovedRegistration,
  approvedRegistration,
  getAdmissionRegistration,
  getPaymentInvoice,
} from "../../api/Registrasi";
import { AlertValidateRegistration } from "../../components/ModalPopUp";

const DataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  // const path = "/admin/admission/registration";
  let filteredItems = data;

  // console.log("KAKAAAAA === ", data);
  // const domain = process.env.REACT_APP_BASE_STATIC_FILE;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.regNumber.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const ApproveRegistrasi = (code) => {
    // getPaymentInvoice(setDataInvoice, setSts, code);
    AlertValidateRegistration(code, onValidate);
  };

  const onValidate = (code) => {
    approvedRegistration(setData, setSts, code);
  };

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
      width: "auto",
    },
    {
      name: <div>Nama Anak</div>,
      selector: (data) => data.childName,
      cell: (data) => <div className="capitalize">{data.childName}</div>,
      width: "auto",
    },
    {
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.admissionPhase.admission.academicYear.name,
      cell: (data) => (
        <div>{data.admissionPhase.admission.academicYear.name}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div
          className={
            data.status === "valid"
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          style={{
            height: "25px",
            width: "25px",
            backgroundColor: "black",
            borderRadius: "50%",
            display: "inline-block",
            color: "white",
          }}
          title="Detail Registrasi"
          onClick={() => navigateRegistrationDetails(data.regNumber)}
        >
          <i className="fa fa-info" />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateTambahGelombang = () => {
    navigate("/admin/gelombang-pmb");
  };

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
        />
      </div>
    </>
  );
};
export default DataRegistrasi;
