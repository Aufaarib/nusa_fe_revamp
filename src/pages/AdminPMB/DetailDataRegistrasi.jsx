import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ApproveEducationalPayment,
  approvedRegistration,
  getAdmissionRegistrationByRegNumber,
  getRegistrationDetail,
  updateAdmissionSteps,
} from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesRegistrationDetail } from "../../components/DataTables";
import {
  AlertPaymentProof,
  AlertStatusValidatePayment,
} from "../../components/ModalPopUp";
import { Checkbox } from "@mui/material";
import moment from "moment/moment";

const DetailDataRegistrasi = () => {
  const [data, setData] = useState({});
  // const [id, setId] = useState("");
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const [fetched, setFetched] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.state.code;
  let filteredItems = data;

  console.log("LL === ", data.status);
  console.log("LL === ", fetched);

  const fetchEducationPayment = () => {
    setFetched("edu");
    getRegistrationDetail(setSts, setData, code);
  };

  const fetchRegistrationPayment = () => {
    setFetched("reg");
    getAdmissionRegistrationByRegNumber(setData, setSts);
  };

  useEffect(() => {
    fetchEducationPayment();
  }, []);

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  const ApproveEducationPayment = (id) => {
    AlertStatusValidatePayment(onValidate, id);
  };

  const ApproveRegistrationPayment = () => {
    const step = "1";
    const status = "valid";
    const note = "Bukti Tervalidasi";
    updateAdmissionSteps(setData, setSts, code, step, status, note);
  };

  const DenyRegistrationPayment = () => {
    const step = "1";
    const status = "invalid";
    const note = "Bukti Tidak Tervalidasi";
    updateAdmissionSteps(setData, setSts, code, step, status, note);
  };

  const onValidate = (id) => {
    ApproveEducationalPayment(id, setSts, setData);
  };

  const columns = [
    {
      cell: (data) => (
        <div>
          <Checkbox></Checkbox>
        </div>
      ),
      width: "60px",
    },
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Tanggal</div>,
      //   selector: (data) => data.createdAt,
      cell: (data) => <div>{moment(data.createdAt).format("DD-MM-YYYY")}</div>,
      width: "auto",
    },
    {
      name: <div>File</div>,
      cell: (data) => (
        <button
          title="Tampil Bukti Pembayaran"
          onClick={() => {
            fetched === "reg"
              ? openPaymentProof(data.invoice)
              : fetched === "edu" && openPaymentProof(data.paymentRecipt);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Nominal</div>,
      //   selector: (data) => data.amount,
      cell: (data) => (
        <div>{fetched === "reg" ? "" : fetched === "edu" && data.amount}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div>
          {fetched === "reg"
            ? data.status === "valid"
              ? "Valid"
              : "In Review"
            : fetched === "edu" && data.status == 1
            ? "Valid"
            : "In Review"}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          title="Detail Pembayaran"
          //   onClick={() => openPaymentProof(data.paymentRecipt)}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-cog" />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "100px",
    },
  ];

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at={code}
        title={code}
      />

      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "140px",
            marginBottom: "20px",
            backgroundColor: "#F3F4F6",
            justifyContent: "center",
            borderRadius: "6px",
          }}
        >
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "reg" ? "#8F0D1E" : "",
              color: fetched === "reg" ? "white" : "",
            }}
            onClick={() => fetchRegistrationPayment()}
          >
            <i className="fa fa-bank" /> Uang Pendaftaran
          </button>
          <button>
            <i className="fa fa-user" /> Data Pendaftaran
          </button>
          <button>
            <i className="fa fa-pencil-square-o" />
            Hasil Test
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "edu" ? "#8F0D1E" : "",
              color: fetched === "edu" ? "white" : "",
            }}
            onClick={() => fetchEducationPayment()}
          >
            <i className="fa fa-bank" /> Uang Pendidikan
          </button>
        </div>
        <DataTablesRegistrationDetail
          columns={columns}
          data={fetched === "reg" ? [data] : fetched === "edu" && data}
          Approve={() => {
            fetched === "edu"
              ? ApproveEducationPayment(data[0].id)
              : fetched === "reg" && ApproveRegistrationPayment();
          }}
          Deny={() => {
            fetched === "edu"
              ? ApproveEducationPayment(data[0].id)
              : fetched === "reg" && DenyRegistrationPayment();
          }}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          //   setRegistrationPayment={() => fetchRegistrationPayment()}
          //   //   setRegistrationData
          //   //   setTest
          //   setEducationalPayment={() => fetchEducationPayment()}
        />
      </div>
    </>
  );
};
export default DetailDataRegistrasi;
