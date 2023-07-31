import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ApproveEducationalPayment,
  approvedRegistration,
  getAdmissionRegistrationApplicant,
  getAdmissionRegistrationByRegNumber,
  getAdmissionRegistrationByRegNumberAdmin,
  getAdmissionRegistrationByRegNumberAdminAyah,
  getAdmissionRegistrationByRegNumberAdminIbu,
  getAdmissionRegistrationByRegNumberAdminOrtu,
  getAdmissionRegistrationByRegNumberAdminWali,
  getAdmissionRegistrationParentsWali,
  getRegistrationDetail,
  updateAdmissionSteps,
  uploadHasilTest,
} from "../../api/Registrasi";
import { Header } from "../../components";
import {
  DataTablesRegistrationDataDetail,
  DataTablesRegistrationDetail,
} from "../../components/DataTables";
import {
  AlertPaymentProof,
  AlertStatusValidatePayment,
} from "../../components/ModalPopUp";
import { Checkbox } from "@mui/material";
import moment from "moment/moment";
import TextInput from "../../components/TextInput";

const DetailDataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [dataStep1, setDataStep1] = useState({});
  const [dataStep5, setDataStep5] = useState({});
  const [amount, setAmount] = useState("");
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const [fetched, setFetched] = useState("");
  const [fetchedRegData, setFetchedRegData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const code = localStorage.getItem("REG_NUMBER");
  let filteredItems = data;

  console.log("LL === ", dataStep1.status);
  // console.log("LL === ", data);

  const fetchEducationPayment = () => {
    setFetched("edu");
    getRegistrationDetail(setSts, setData, code);
  };

  const fetchRegistrationPayment = () => {
    setFetched("reg");
    getAdmissionRegistrationByRegNumberAdmin(
      setData,
      setAmount,
      setDataStep1,
      setDataStep5
    );
  };

  const fetchTestResult = () => {
    setFetched("testResult");
  };

  const fetchRegistrationData = () => {
    setFetched("regData");
    setFetchedRegData("fetchAyah");
    getAdmissionRegistrationByRegNumberAdminAyah(setData);
  };

  const fetchAnak = () => {
    setFetchedRegData("fetchAnak");
    getAdmissionRegistrationApplicant(setData, setSts);
  };

  const fetchAyah = () => {
    setFetchedRegData("fetchAyah");
    getAdmissionRegistrationByRegNumberAdminAyah(setData);
  };

  const fetchIbu = () => {
    setFetchedRegData("fetchIbu");
    getAdmissionRegistrationByRegNumberAdminIbu(setData);
  };

  const fetchWali = () => {
    setFetchedRegData("fetchWali");
    getAdmissionRegistrationByRegNumberAdminWali(setData);
  };

  useEffect(() => {
    fetchRegistrationPayment();
  }, []);

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  const ApproveEducationPayment = (id) => {
    AlertStatusValidatePayment(onValidate, id);
  };

  const onValidate = (id) => {
    ApproveEducationalPayment(id, setSts, setData);
  };

  const uploadTestResult = () => {
    const score = 100;
    uploadHasilTest(score);
  };

  const AcceptStep = (step) => {
    const status = "valid";
    const note = "Bukti Tervalidasi";
    updateAdmissionSteps(setSts, code, step, status, note);
  };

  const DenyStep = (step) => {
    const status = "invalid";
    const note = "Bukti Tidak Tervalidasi";
    updateAdmissionSteps(setSts, code, step, status, note);
  };

  const columnsPayments = [
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
      // selector: (data) => data.admissionPhase.amount,
      cell: (data) => (
        <div>
          {fetched === "reg" ? amount.amount : fetched === "edu" && data.amount}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div>
          {fetched === "reg"
            ? dataStep1.status === "valid"
              ? "Valid"
              : "In Review"
            : fetched === "edu" && dataStep5.status == "valid"
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
            gap: "100px",
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
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "auto",
              backgroundColor: fetched === "regData" ? "#8F0D1E" : "",
              color: fetched === "regData" ? "white" : "",
            }}
            onClick={() => fetchRegistrationData()}
          >
            <i className="fa fa-user" /> Data Pendaftaran
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "auto",
              backgroundColor: fetched === "testResult" ? "#8F0D1E" : "",
              color: fetched === "testResult" ? "white" : "",
            }}
            onClick={() => fetchTestResult()}
          >
            <i className="fa fa-pencil-square-o" /> Hasil Test
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

        {fetched !== "regData" && (
          <DataTablesRegistrationDetail
            columns={columnsPayments}
            data={fetched === "reg" ? [data] : fetched === "edu" && data}
            buttonPositive={fetched === "testResult" ? "Kirim" : "Setuju"}
            buttonNegative={fetched === "testResult" ? "" : "Tolak"}
            Approve={() => {
              fetched === "edu"
                ? AcceptStep("5")
                : fetched === "reg"
                ? AcceptStep("1")
                : fetched === "testResult" && uploadTestResult();
            }}
            Deny={() => {
              fetched === "edu"
                ? DenyStep("5")
                : fetched === "reg" && DenyStep("1");
            }}
            onFilter={(e) => setFilterText(e.target.value)}
            filterText={filterText}
          />
        )}

        {fetched === "regData" && (
          <div
            style={{
              borderRadius: "6px",
              backgroundColor: "#F3F4F6",
              padding: "30px 30px 30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "140px",
                marginBottom: "20px",
                backgroundColor: "#FFF",
                justifyContent: "center",
                borderRadius: "6px",
              }}
            >
              <button
                style={{
                  borderRadius: "6px",
                  padding: "20px 20px",
                  width: "auto",
                  backgroundColor:
                    fetchedRegData === "fetchAyah" ? "#8F0D1E" : "",
                  color: fetchedRegData === "fetchAyah" ? "white" : "",
                }}
                onClick={() => fetchAyah()}
              >
                <i className="fa fa-male" /> Data Ayah
              </button>
              <button
                style={{
                  borderRadius: "6px",
                  padding: "20px 20px",
                  width: "auto",
                  backgroundColor:
                    fetchedRegData === "fetchIbu" ? "#8F0D1E" : "",
                  color: fetchedRegData === "fetchIbu" ? "white" : "",
                }}
                onClick={() => fetchIbu()}
              >
                <i className="fa fa-female" /> Data Ibu
              </button>
              <button
                style={{
                  borderRadius: "6px",
                  padding: "20px 20px",
                  width: "auto",
                  backgroundColor:
                    fetchedRegData === "fetchWali" ? "#8F0D1E" : "",
                  color: fetchedRegData === "fetchWali" ? "white" : "",
                }}
                onClick={() => fetchWali()}
              >
                <i className="fa fa-users" /> Data Wali
              </button>
              <button
                style={{
                  borderRadius: "6px",
                  padding: "20px 20px",
                  width: "auto",
                  backgroundColor:
                    fetchedRegData === "fetchAnak" ? "#8F0D1E" : "",
                  color: fetchedRegData === "fetchAnak" ? "white" : "",
                }}
                onClick={() => fetchAnak()}
              >
                <i className="fa fa-child" /> Data Anak
              </button>
            </div>
            <section
              style={{ marginLeft: "125px" }}
              className="xs:col-span-3 lg:col-span-1 mt-5"
            >
              {fetchedRegData === "fetchAnak" && (
                <>
                  <TextInput
                    label="Nama Depan"
                    type="text"
                    id="firstName"
                    placeholder={data.firstName}
                    disable={true}
                    required={false}
                  />
                  <TextInput
                    label="Agama"
                    type="text"
                    id="religion"
                    placeholder={data.religion}
                    disable={true}
                  />
                  <TextInput
                    label="Nama Tengah"
                    type="text"
                    id="middleName"
                    placeholder={data.middleName}
                    disable={true}
                    required={false}
                  />
                  <TextInput
                    label="Nama Belakang"
                    type="text"
                    id="lastName"
                    placeholder={data.lastName}
                    disable={true}
                  />
                  <TextInput
                    label="Status Anak"
                    type="text"
                    id="childStatus"
                    placeholder={data.childStatus}
                    disable={true}
                  />
                  <TextInput
                    label="No KK"
                    type="text"
                    id="familyIdentityNumber"
                    placeholder={data.familyIdentityNumber}
                    disable={true}
                  />
                  <TextInput
                    label="No Akta Lahir"
                    type="number"
                    id="identityNumber"
                    placeholder={data.identityNumber}
                    disable={true}
                  />
                  <TextInput
                    label="Anak ke"
                    type="number"
                    id="childNumber"
                    placeholder={data.childNumber}
                    disable={true}
                  />
                  <TextInput
                    label="Tinggi Badan Anak (cm)"
                    type="number"
                    id="height"
                    placeholder={data.height}
                    disable={true}
                  />
                  <TextInput
                    label="Tempat Lahir"
                    type="text"
                    id="birthPlace"
                    placeholder={data.birthPlace}
                    disable={true}
                  />
                  <TextInput
                    label="Tanggal Lahir"
                    type="text"
                    id="birthDate"
                    placeholder={data.birthDate}
                    disable={true}
                  />
                  <TextInput
                    label="Jenis Kelamin"
                    type="text"
                    id="gender"
                    placeholder={
                      data.gender === "female" ? "Perempuan" : "Laki-Laki"
                    }
                    disable={true}
                  />
                  <TextInput
                    label="Golongan Darah"
                    type="text"
                    id="bloodType"
                    placeholder={data.bloodType}
                    disable={true}
                  />
                  <TextInput
                    label="Hobi Anak"
                    type="text"
                    id="bloodType"
                    placeholder={
                      data.gender === "female" ? "Perempuan" : "Laki-Laki"
                    }
                    disable={true}
                  />
                  <TextInput
                    label="Berat Badan Anak"
                    type="text"
                    id="hobby"
                    placeholder={data.hobby}
                    disable={true}
                  />
                  <TextInput
                    label="No KK"
                    type="text"
                    id="familyIdentityNumber"
                    placeholder={data.familyIdentityNumber}
                    disable={true}
                  />
                  <TextInput
                    label="No Akta Lahir"
                    type="number"
                    id="identityNumber"
                    placeholder={data.identityNumber}
                    disable={true}
                  />
                  <TextInput
                    label="Jarak Rumah Ke Sekolah"
                    type="text"
                    id="distanceFromHome"
                    placeholder={data.distanceFromHome}
                    disable={true}
                  />
                  <TextInput
                    label="Transportasi Ke Sekolah"
                    type="text"
                    id="transportation"
                    placeholder={data.transportation}
                    disable={true}
                  />
                  <TextInput
                    label="Kelas Pada Saat Mendaftar"
                    type="number"
                    id="schoolOriginClass"
                    placeholder={data.schoolOriginClass}
                    disable={true}
                  />
                  <TextInput
                    label="Asal Sekolah"
                    type="number"
                    id="schoolOriginName"
                    placeholder={data.schoolOriginName}
                    disable={true}
                  />
                  <TextInput
                    label="Sifat Dominan Anak"
                    type="number"
                    id="characteristic"
                    placeholder={data.characteristic}
                    disable={true}
                  />
                  <TextInput
                    label="Penyakit Berat Yang Pernah Diderita"
                    type="text"
                    id="healthRecord"
                    placeholder={data.healthRecord}
                    disable={true}
                  />
                </>
              )}
              {fetchedRegData !== "fetchAnak" && (
                <>
                  <TextInput
                    label="Nama Lengkap"
                    type="text"
                    id="fullName"
                    placeholder={data.fullName}
                    disable={true}
                  />
                  {fetchedRegData === "fetchWali" && (
                    <>
                      <TextInput
                        label="Jenis Kelamin"
                        type="text"
                        id="gender"
                        placeholder={
                          data.gender === "female" ? "Perempuan" : "Laki-Laki"
                        }
                        disable={true}
                      />
                    </>
                  )}
                  <TextInput
                    label="Nomor Kartu Keluarga"
                    type="text"
                    id="familyIdentityNumber"
                    placeholder={data.familyIdentityNumber}
                    disable={true}
                  />
                  <TextInput
                    label="Nomor KTP"
                    type="text"
                    id="identityNumber"
                    placeholder={data.identityNumber}
                    disable={true}
                  />
                  <TextInput
                    label="Hubungan Ayah"
                    type="text"
                    id="isBiological"
                    placeholder={data.isBiological === 1 ? "Kandung" : "Tiri"}
                    disable={true}
                  />
                  <TextInput
                    label="Tinggal Bersama"
                    type="text"
                    id="isOneHouse"
                    placeholder={data.isOneHouse === 1 ? "Ya" : "Tidak"}
                    disable={true}
                  />
                  <TextInput
                    label="No Ponsel 1"
                    type="text"
                    id="phoneNumber_1"
                    placeholder={data.phoneNumber_1}
                    disable={true}
                  />
                  <TextInput
                    label="No Ponsel 2"
                    type="text"
                    id="phoneNumber_2"
                    placeholder={data.phoneNumber_2}
                    disable={true}
                  />
                  <TextInput
                    label="Provinsi"
                    type="text"
                    id="province"
                    placeholder={data.province}
                    disable={true}
                  />
                  <TextInput
                    label="Kota"
                    type="text"
                    id="city"
                    placeholder={data.city}
                    disable={true}
                  />
                  <TextInput
                    label="Kecamatan"
                    type="text"
                    id="subDistrict"
                    placeholder={data.subDistrict}
                    disable={true}
                  />
                  <TextInput
                    label="Kelurahan"
                    type="text"
                    id="village"
                    placeholder={data.village}
                    disable={true}
                  />
                  <TextInput
                    label="Alamat"
                    type="text"
                    id="address"
                    placeholder={data.address}
                    disable={true}
                  />
                  <TextInput
                    label="Kode Pos"
                    type="text"
                    id="postalCode"
                    placeholder={data.postalCode}
                    disable={true}
                  />
                  <TextInput
                    label="Tempat Lahir"
                    type="text"
                    id="birthPlace"
                    placeholder={data.birthPlace}
                    disable={true}
                  />
                  <TextInput
                    label="Tanggal Lahir"
                    type="text"
                    id="birthDate"
                    placeholder={data.birthDate}
                    disable={true}
                  />
                  <TextInput
                    label="Pendidikan Terakhir"
                    type="text"
                    id="lastEducation"
                    placeholder={data.lastEducation}
                    disable={true}
                  />
                  <TextInput
                    label="Perusahaan Tempat Bekerja"
                    type="text"
                    id="placeOfWork"
                    placeholder={data.placeOfWork}
                    disable={true}
                  />
                  <TextInput
                    label="Posisi/Jabatan"
                    type="text"
                    id="occupation"
                    placeholder={data.occupation}
                    disable={true}
                  />
                  <TextInput
                    label="Penghasilan Tiap Bulan"
                    type="text"
                    id="incomeGrade"
                    placeholder={data.incomeGrade}
                    disable={true}
                  />
                </>
              )}
            </section>
            <div className="btn-form">
              <button
                type="button"
                className="w-auto btn-merah flex justify-center mb-5"
                onClick={() => AcceptStep("2")}
              >
                Setuju
              </button>
              <button
                type="button"
                className="w-auto btn-putih flex justify-center mb-5"
                onClick={() => DenyStep("2")}
              >
                Tolak
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default DetailDataRegistrasi;
