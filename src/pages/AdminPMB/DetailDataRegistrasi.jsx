import { Checkbox } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  approvedRegistration,
  getAdmissionRegistrationByRegNumberAdmin,
  updateAdmissionSteps,
} from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesRegistrationDetail } from "../../components/DataTables";
import {
  AlertConfirmation,
  AlertMessage,
  AlertPaymentProof,
  AlertStatusSuccess,
  AlertValidateRegistration,
} from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";

const DetailDataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [anak, setDataAnak] = useState(null);
  const [ayah, setDataAyah] = useState(null);
  const [ibu, setDataIbu] = useState(null);
  const [wali, setDataWali] = useState(null);
  const [dataStep1, setDataStep1] = useState(null);
  const [dataStep2, setDataStep2] = useState(null);
  const [dataStep3, setDataStep3] = useState(null);
  const [dataStep5, setDataStep5] = useState(null);
  const [edu, setEdu] = useState([]);
  const [amount, setAmount] = useState("");
  const [fetched, setFetched] = useState("");
  const [fetchedRegData, setFetchedRegData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const code = localStorage.getItem("REG_NUMBER");
  const path = "/admin/list-data-registrasi";
  const updatedFetched = location?.state?.fetched;

  // console.log("DATA === ", data);
  // console.log("STEP1 === ", dataStep1);
  // console.log("STEP2 === ", dataStep2);
  // console.log("STEP3 === ", dataStep3);
  // console.log("STEP5 === ", dataStep5);
  // console.log("PEMBAYARAN === ", amount);
  // console.log("ANAK === ", anak);
  // console.log("AYAH === ", ayah);
  // console.log("IBU === ", ibu);
  // console.log("WALI === ", wali);

  const fetchEducationPayment = () => {
    setFetched("5");
    fetchAdmissionRegistration();
  };

  const fetchRegistrationPayment = () => {
    setFetched("1");
    fetchAdmissionRegistration();
  };

  const fetchTestResult = () => {
    setFetched("3");
  };

  const fetchRegistrationData = () => {
    setFetched("2");
    setFetchedRegData("fetchAnak");
    fetchAdmissionRegistration();
  };

  const fetchAdmissionRegistration = () => {
    getAdmissionRegistrationByRegNumberAdmin(
      setData,
      setAmount,
      setEdu,
      setDataAnak,
      setDataAyah,
      setDataIbu,
      setDataWali,
      setDataStep1,
      setDataStep2,
      setDataStep3,
      setDataStep5
    );
  };

  const fetchAnak = () => {
    setFetchedRegData("fetchAnak");
    fetchAdmissionRegistration();
  };

  const fetchAyah = () => {
    setFetchedRegData("fetchAyah");
    fetchAdmissionRegistration();
  };

  const fetchIbu = () => {
    setFetchedRegData("fetchIbu");
    fetchAdmissionRegistration();
  };

  const fetchWali = () => {
    setFetchedRegData("fetchWali");
    fetchAdmissionRegistration();
  };

  useEffect(() => {
    if (updatedFetched === undefined) {
      setFetched("1");
      fetchAdmissionRegistration();
    } else {
      setFetched(updatedFetched);
      fetchAdmissionRegistration();
    }
    fetchAdmissionRegistration();
  }, []);

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  const navigateUbahStatus = () => {
    navigate("/admin/ubah-status-step", {
      state: {
        fetched: fetched,
      },
    });
  };
  const navigateUploadHasilTes = () => {
    navigate("/admin/upload-hasil-tes", {
      state: {
        fetched: fetched,
      },
    });
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
      cell: (data) => (
        <div>
          {fetched === "1"
            ? moment(dataStep1.createdAt).format("DD-MM-YYYY")
            : moment(dataStep5.createdAt).format("DD-MM-YYYY")}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>File</div>,
      cell: (data) => (
        <button
          title="Tampil Bukti Pembayaran"
          onClick={() => {
            fetched === "1"
              ? openPaymentProof(data.invoice)
              : fetched === "5" && openPaymentProof(edu.paymentRecipt);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file" />
        </button>
      ),
      width: "auto",
    },
    {
      name: <div>Nominal</div>,
      cell: (data) => (
        <div>
          {fetched === "1"
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(amount.amount)
            : fetched === "5" &&
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(edu.amount)}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Status</div>,
      cell: (data) => (
        <div>
          {fetched === "1"
            ? dataStep1.status === "valid"
              ? "Terverifikasi"
              : dataStep1.status === "inreview"
              ? "Sedang Di Tinjau"
              : dataStep1.status === "invalid" && "Tidak Terverifikasi"
            : dataStep5.status === "valid"
            ? "Terverifikasi"
            : dataStep5.status === "inreview"
            ? "Sedang Di Tinjau"
            : dataStep5.status === "invalid" && "Tidak Terverifikasi"}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          className="btn-action-merah"
          title="Edit"
          onClick={() => navigateUbahStatus(data.regNumber)}
        >
          <i className="fa fa-edit" /> Ubah
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "100px",
    },
  ];

  const columnTestResult = [
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
      cell: (data) => <div>{moment(data.createdAt).format("DD-MM-YYYY")}</div>,
      width: "250px",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div>
          {dataStep3.status === "valid"
            ? "Terverifikasi"
            : dataStep3.status === "inreview"
            ? "Sedang Di Tinjau"
            : dataStep3.status === "invalid" && "Tidak Terverifikasi"}
        </div>
      ),
      width: "200px",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          className="btn-action-merah"
          title="Edit"
          onClick={() => navigateUbahStatus(data.regNumber)}
        >
          <i className="fa fa-edit" /> Ubah
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "350px",
    },
  ];

  const ApproveRegistrasi = () => {
    if (dataStep1?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Pembayaran Biaya Registrasi Belum Terverifikasi",
        "Tutup"
      );
    } else if (dataStep2?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Data Pendaftaran Belum Terverifikasi",
        "Tutup"
      );
    } else if (dataStep3?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Hasil Tes Belum Terupload atau Terverifikasi",
        "Tutup"
      );
    } else if (dataStep5?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Pembayaran Biaya Pendidikan Belum Terverifikasi",
        "Tutup"
      );
    } else {
      data.status === "valid"
        ? AlertConfirmation(
            onConfirm,
            "Non-Aktifkan Pendaftar?",
            "Non-Aktifkan"
          )
        : data.status === "inreview" &&
          AlertConfirmation(onConfirm, "Aktifkan Pendaftar?", "Aktifkan");
    }
  };

  const onConfirm = () => {
    const status =
      data.status === "valid"
        ? "inreview"
        : data.status === "inreview" && "valid";
    approvedRegistration(code, status, fetchAdmissionRegistration);
  };

  return (
    <>
      <Header
        home="Admin PMB"
        prev="Data Registrasi"
        navePrev={path}
        at={code}
        title={code + " - " + data.childName}
      />

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "inline-block", float: "left" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <h4 className="text-hitam">Status Pendaftar :</h4>
            {data.status === "valid" ? (
              <h4 className="text-hijau">Terverifikasi</h4>
            ) : (
              data.status === "inreview" && (
                <h4 className="text-merah">Tidak Terverifikasi</h4>
              )
            )}
          </div>
        </div>

        <div style={{ display: "inline-block", float: "right" }}>
          <div style={{ display: "flex" }}>
            <button
              style={{ fontSize: "14px", width: "auto", padding: "2px 10px" }}
              className={
                dataStep1?.status !== "valid" ||
                dataStep2?.status !== "valid" ||
                dataStep3?.status !== "valid" ||
                dataStep5?.status !== "valid"
                  ? "btn-action-disabled"
                  : "btn-action-merah"
              }
              onClick={() => ApproveRegistrasi()}
            >
              {data.status === "inreview" ? (
                <>
                  <i className="fa fa-check-circle-o" /> Verifikasi
                </>
              ) : (
                data.status === "valid" && (
                  <>
                    <i className="fa fa-times-circle-o" /> Batalkan Verifikasi
                  </>
                )
              )}
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "70px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            backgroundColor: "#F3F4F6",
            justifyContent: "space-between",
            borderRadius: "6px",
          }}
        >
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor:
                dataStep1 !== null ? fetched === "1" && "#8F0D1E" : "",
              color: dataStep1 !== null ? fetched === "1" && "white" : "grey",
            }}
            onClick={() => fetchRegistrationPayment()}
            disabled={dataStep1 !== null ? false : true}
          >
            <i className="fa fa-bank" /> Uang Pendaftaran
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "2" && "#8F0D1E",
              color:
                dataStep1?.status === "valid"
                  ? fetched === "2" && "white"
                  : "grey",
            }}
            onClick={() => fetchRegistrationData()}
            disabled={
              dataStep1 !== null
                ? dataStep1?.status !== "valid"
                  ? true
                  : false
                : true
            }
          >
            <i className="fa fa-user" /> Data Pendaftaran
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "3" && "#8F0D1E",
              color:
                dataStep1?.status === "valid" && dataStep2?.status === "valid"
                  ? // ? dataStep3 === null
                    fetched === "3" && "white"
                  : // : "grey"
                    "grey",
            }}
            onClick={() => fetchTestResult()}
            disabled={
              dataStep1?.status === "valid" && dataStep2?.status === "valid"
                ? // ? dataStep3 === null
                  false
                : // : true
                  true
            }
          >
            <i className="fa fa-pencil-square-o" /> Hasil Test
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "5" && "#8F0D1E",
              color:
                dataStep1?.status === "valid" &&
                dataStep2?.status === "valid" &&
                dataStep3?.status === "valid"
                  ? dataStep5 !== null
                    ? fetched === "5" && "white"
                    : "grey"
                  : "grey",
            }}
            onClick={() => fetchEducationPayment()}
            disabled={
              dataStep1?.status === "valid" &&
              dataStep2?.status === "valid" &&
              dataStep3?.status === "valid"
                ? dataStep5 !== null
                  ? false
                  : true
                : true
            }
          >
            <i className="fa fa-bank" /> Uang Pendidikan
          </button>
        </div>

        {fetched === "1" && (
          <>
            {dataStep1 !== null ? (
              <DataTablesRegistrationDetail
                columns={columnsPayments}
                data={[data]}
              />
            ) : (
              <div
                style={{
                  borderRadius: "6px",
                  backgroundColor: "#F3F4F6",
                  padding: "30px 30px 30px",
                  textAlign: "center",
                }}
              >
                <h1>Data Tidak Ditemukan</h1>
              </div>
            )}
          </>
        )}
        {fetched === "3" && (
          <>
            {dataStep3 !== null ? (
              <DataTablesRegistrationDetail
                columns={columnTestResult}
                data={[data]}
              />
            ) : (
              <div
                style={{
                  borderRadius: "6px",
                  backgroundColor: "#F3F4F6",
                  padding: "30px 30px 30px",
                  textAlign: "center",
                }}
              >
                <h1>Data Tidak Ditemukan</h1>
                <button
                  onClick={() => navigateUploadHasilTes()}
                  className="btn-merah"
                >
                  Kirim Hasil Test
                </button>
              </div>
            )}
          </>
        )}
        {fetched === "5" && (
          <>
            {dataStep5 !== null ? (
              <DataTablesRegistrationDetail
                columns={columnsPayments}
                data={[data]}
              />
            ) : (
              <div
                style={{
                  borderRadius: "6px",
                  backgroundColor: "#F3F4F6",
                  padding: "30px 30px 30px",
                  textAlign: "center",
                }}
              >
                <h1>Data Tidak Ditemukan</h1>
              </div>
            )}
          </>
        )}

        {fetched === "2" && (
          <div
            style={{
              borderRadius: "6px",
              // backgroundColor: "#F3F4F6",
              padding: "30px 30px 30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                backgroundColor: "#F3F4F6",
                justifyContent: "space-between",
                borderRadius: "6px",
                padding: "0",
              }}
            >
              <button
                style={{
                  borderRadius: "6px",
                  padding: "20px 20px",
                  width: "200px",
                  backgroundColor:
                    fetchedRegData === "fetchAnak" ? "#8F0D1E" : "",
                  color: fetchedRegData === "fetchAnak" ? "white" : "",
                }}
                onClick={() => fetchAnak()}
              >
                <i className="fa fa-child" /> Data Anak
              </button>
              <button
                style={{
                  borderRadius: "6px",
                  padding: "20px 20px",
                  width: "200px",
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
                  width: "200px",
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
                  width: "200px",
                  backgroundColor:
                    fetchedRegData === "fetchWali" ? "#8F0D1E" : "",
                  color: fetchedRegData === "fetchWali" ? "white" : "",
                }}
                onClick={() => fetchWali()}
              >
                <i className="fa fa-users" /> Data Wali
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0px 95px 0px",
                backgroundColor: "#F3F4F6",
                borderRadius: "8px",
                padding: "28px",
                boxShadow: "#000000",
              }}
            >
              <div>
                <TextInput
                  label="Status Tahapan"
                  value={
                    dataStep2?.status === "valid"
                      ? "Terverifikasi"
                      : dataStep2?.status === "inreview"
                      ? "Sedang Di Tinjau"
                      : dataStep2?.status === "invalid" && "Belum Terverifikasi"
                  }
                  disable={true}
                />
                <button
                  onClick={() => navigateUbahStatus()}
                  className="btn-pth"
                >
                  Ubah
                </button>
              </div>
            </div>
            <br />
            <section style={{ margin: "0 13%" }}>
              {fetchedRegData === "fetchAnak" && (
                <>
                  {anak !== null ? (
                    <>
                      <TextInput
                        label="Nama Depan"
                        type="text"
                        id="firstName"
                        placeholder={anak?.firstName}
                        disable={true}
                        required={false}
                      />
                      <TextInput
                        label="Agama"
                        type="text"
                        id="religion"
                        placeholder={anak?.religion}
                        disable={true}
                      />
                      <TextInput
                        label="Nama Tengah"
                        type="text"
                        id="middleName"
                        placeholder={anak?.middleName}
                        disable={true}
                        required={false}
                      />
                      <TextInput
                        label="Nama Belakang"
                        type="text"
                        id="lastName"
                        placeholder={anak?.lastName}
                        disable={true}
                      />
                      <TextInput
                        label="Status Anak"
                        type="text"
                        id="childStatus"
                        placeholder={anak?.childStatus}
                        disable={true}
                      />
                      <TextInput
                        label="No KK"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={anak?.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="No Akta Lahir"
                        type="number"
                        id="identityNumber"
                        placeholder={anak?.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Anak ke"
                        type="number"
                        id="childNumber"
                        placeholder={anak?.childNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Tinggi Badan Anak (cm)"
                        type="number"
                        id="height"
                        placeholder={anak?.height}
                        disable={true}
                      />
                      <TextInput
                        label="Tempat Lahir"
                        type="text"
                        id="birthPlace"
                        placeholder={anak?.birthPlace}
                        disable={true}
                      />
                      <TextInput
                        label="Tanggal Lahir"
                        type="text"
                        id="birthDate"
                        placeholder={moment(anak?.birthDate).format(
                          "DD-MM-YYYY"
                        )}
                        disable={true}
                      />
                      <TextInput
                        label="Jenis Kelamin"
                        type="text"
                        id="gender"
                        placeholder={
                          anak?.gender === "female" ? "Perempuan" : "Laki-Laki"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Golongan Darah"
                        type="text"
                        id="bloodType"
                        placeholder={anak?.bloodType}
                        disable={true}
                      />
                      <TextInput
                        label="Hobi Anak"
                        type="text"
                        id="bloodType"
                        placeholder={
                          anak?.gender === "female" ? "Perempuan" : "Laki-Laki"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Berat Badan Anak"
                        type="text"
                        id="hobby"
                        placeholder={anak?.hobby}
                        disable={true}
                      />
                      <TextInput
                        label="No KK"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={anak?.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="No Akta Lahir"
                        type="number"
                        id="identityNumber"
                        placeholder={anak?.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Jarak Rumah Ke Sekolah"
                        type="text"
                        id="distanceFromHome"
                        placeholder={anak?.distanceFromHome}
                        disable={true}
                      />
                      <TextInput
                        label="Transportasi Ke Sekolah"
                        type="text"
                        id="transportation"
                        placeholder={anak?.transportation}
                        disable={true}
                      />
                      <TextInput
                        label="Kelas Pada Saat Mendaftar"
                        type="number"
                        id="schoolOriginClass"
                        placeholder={anak?.schoolOriginClass}
                        disable={true}
                      />
                      <TextInput
                        label="Asal Sekolah"
                        type="number"
                        id="schoolOriginName"
                        placeholder={anak?.schoolOriginName}
                        disable={true}
                      />
                      <TextInput
                        label="Sifat Dominan Anak"
                        type="number"
                        id="characteristic"
                        placeholder={anak?.characteristic}
                        disable={true}
                      />
                      <TextInput
                        label="Penyakit Berat Yang Pernah Diderita"
                        type="text"
                        id="healthRecord"
                        placeholder={anak?.healthRecord}
                        disable={true}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        borderRadius: "6px",
                        backgroundColor: "#F3F4F6",
                        padding: "30px 30px 30px",
                        textAlign: "center",
                      }}
                    >
                      <h1>Data Tidak Ditemukan</h1>
                    </div>
                  )}
                </>
              )}
              {fetchedRegData === "fetchAyah" && (
                <>
                  {ayah !== null ? (
                    <>
                      <TextInput
                        label="Nama Lengkap"
                        type="text"
                        id="fullName"
                        placeholder={ayah?.fullName}
                        disable={true}
                      />
                      <TextInput
                        label="Nomor Kartu Keluarga"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={ayah?.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Nomor KTP"
                        type="text"
                        id="identityNumber"
                        placeholder={ayah?.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Hubungan Ayah"
                        type="text"
                        id="isBiological"
                        placeholder={
                          ayah?.isBiological === 1 ? "Kandung" : "Tiri"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Tinggal Bersama"
                        type="text"
                        id="isOneHouse"
                        placeholder={ayah?.isOneHouse === 1 ? "Ya" : "Tidak"}
                        disable={true}
                      />
                      <TextInput
                        label="No Ponsel 1"
                        type="text"
                        id="phoneNumber_1"
                        placeholder={ayah?.phoneNumber_1}
                        disable={true}
                      />
                      <TextInput
                        label="No Ponsel 2"
                        type="text"
                        id="phoneNumber_2"
                        placeholder={ayah?.phoneNumber_2}
                        disable={true}
                      />
                      <TextInput
                        label="Provinsi"
                        type="text"
                        id="province"
                        placeholder={ayah?.province}
                        disable={true}
                      />
                      <TextInput
                        label="Kota"
                        type="text"
                        id="city"
                        placeholder={ayah?.city}
                        disable={true}
                      />
                      <TextInput
                        label="Kecamatan"
                        type="text"
                        id="subDistrict"
                        placeholder={ayah?.subDistrict}
                        disable={true}
                      />
                      <TextInput
                        label="Kelurahan"
                        type="text"
                        id="village"
                        placeholder={ayah?.village}
                        disable={true}
                      />
                      <TextInput
                        label="Alamat"
                        type="text"
                        id="address"
                        placeholder={ayah?.address}
                        disable={true}
                      />
                      <TextInput
                        label="Kode Pos"
                        type="text"
                        id="postalCode"
                        placeholder={ayah?.postalCode}
                        disable={true}
                      />
                      <TextInput
                        label="Tempat Lahir"
                        type="text"
                        id="birthPlace"
                        placeholder={ayah?.birthPlace}
                        disable={true}
                      />
                      <TextInput
                        label="Tanggal Lahir"
                        type="text"
                        id="birthDate"
                        placeholder={ayah?.birthDate}
                        disable={true}
                      />
                      <TextInput
                        label="Pendidikan Terakhir"
                        type="text"
                        id="lastEducation"
                        placeholder={ayah?.lastEducation}
                        disable={true}
                      />
                      <TextInput
                        label="Perusahaan Tempat Bekerja"
                        type="text"
                        id="placeOfWork"
                        placeholder={ayah?.placeOfWork}
                        disable={true}
                      />
                      <TextInput
                        label="Posisi/Jabatan"
                        type="text"
                        id="occupation"
                        placeholder={ayah?.occupation}
                        disable={true}
                      />
                      <TextInput
                        label="Penghasilan Tiap Bulan"
                        type="text"
                        id="incomeGrade"
                        placeholder={ayah?.incomeGrade}
                        disable={true}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        borderRadius: "6px",
                        backgroundColor: "#F3F4F6",
                        padding: "30px 30px 30px",
                        textAlign: "center",
                      }}
                    >
                      <h1>Data Tidak Ditemukan</h1>
                    </div>
                  )}
                </>
              )}
              {fetchedRegData === "fetchIbu" && (
                <>
                  {ibu !== null ? (
                    <>
                      <TextInput
                        label="Nama Lengkap"
                        type="text"
                        id="fullName"
                        placeholder={ibu?.fullName}
                        disable={true}
                      />
                      <TextInput
                        label="Nomor Kartu Keluarga"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={ibu?.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Nomor KTP"
                        type="text"
                        id="identityNumber"
                        placeholder={ibu?.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Hubungan Ayah"
                        type="text"
                        id="isBiological"
                        placeholder={
                          ibu?.isBiological === 1 ? "Kandung" : "Tiri"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Tinggal Bersama"
                        type="text"
                        id="isOneHouse"
                        placeholder={ibu?.isOneHouse === 1 ? "Ya" : "Tidak"}
                        disable={true}
                      />
                      <TextInput
                        label="No Ponsel 1"
                        type="text"
                        id="phoneNumber_1"
                        placeholder={ibu?.phoneNumber_1}
                        disable={true}
                      />
                      <TextInput
                        label="No Ponsel 2"
                        type="text"
                        id="phoneNumber_2"
                        placeholder={ibu?.phoneNumber_2}
                        disable={true}
                      />
                      <TextInput
                        label="Provinsi"
                        type="text"
                        id="province"
                        placeholder={ibu?.province}
                        disable={true}
                      />
                      <TextInput
                        label="Kota"
                        type="text"
                        id="city"
                        placeholder={ibu?.city}
                        disable={true}
                      />
                      <TextInput
                        label="Kecamatan"
                        type="text"
                        id="subDistrict"
                        placeholder={ibu?.subDistrict}
                        disable={true}
                      />
                      <TextInput
                        label="Kelurahan"
                        type="text"
                        id="village"
                        placeholder={ibu?.village}
                        disable={true}
                      />
                      <TextInput
                        label="Alamat"
                        type="text"
                        id="address"
                        placeholder={ibu?.address}
                        disable={true}
                      />
                      <TextInput
                        label="Kode Pos"
                        type="text"
                        id="postalCode"
                        placeholder={ibu?.postalCode}
                        disable={true}
                      />
                      <TextInput
                        label="Tempat Lahir"
                        type="text"
                        id="birthPlace"
                        placeholder={ibu?.birthPlace}
                        disable={true}
                      />
                      <TextInput
                        label="Tanggal Lahir"
                        type="text"
                        id="birthDate"
                        placeholder={ibu?.birthDate}
                        disable={true}
                      />
                      <TextInput
                        label="Pendidikan Terakhir"
                        type="text"
                        id="lastEducation"
                        placeholder={ibu?.lastEducation}
                        disable={true}
                      />
                      <TextInput
                        label="Perusahaan Tempat Bekerja"
                        type="text"
                        id="placeOfWork"
                        placeholder={ibu?.placeOfWork}
                        disable={true}
                      />
                      <TextInput
                        label="Posisi/Jabatan"
                        type="text"
                        id="occupation"
                        placeholder={ibu?.occupation}
                        disable={true}
                      />
                      <TextInput
                        label="Penghasilan Tiap Bulan"
                        type="text"
                        id="incomeGrade"
                        placeholder={ibu?.incomeGrade}
                        disable={true}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        borderRadius: "6px",
                        backgroundColor: "#F3F4F6",
                        padding: "30px 30px 30px",
                        textAlign: "center",
                      }}
                    >
                      <h1>Data Tidak Ditemukan</h1>
                    </div>
                  )}
                </>
              )}
              {fetchedRegData === "fetchWali" && (
                <>
                  {wali !== null ? (
                    <>
                      <TextInput
                        label="Nama Lengkap"
                        type="text"
                        id="fullName"
                        placeholder={wali?.fullName}
                        disable={true}
                      />
                      <TextInput
                        label="Jenis Kelamin"
                        type="text"
                        id="gender"
                        placeholder={
                          wali?.gender === "female" ? "Perempuan" : "Laki-Laki"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Nomor Kartu Keluarga"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={wali?.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Nomor KTP"
                        type="text"
                        id="identityNumber"
                        placeholder={wali?.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Hubungan Ayah"
                        type="text"
                        id="isBiological"
                        placeholder={
                          wali?.isBiological === 1 ? "Kandung" : "Tiri"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Tinggal Bersama"
                        type="text"
                        id="isOneHouse"
                        placeholder={wali?.isOneHouse === 1 ? "Ya" : "Tidak"}
                        disable={true}
                      />
                      <TextInput
                        label="No Ponsel 1"
                        type="text"
                        id="phoneNumber_1"
                        placeholder={wali?.phoneNumber_1}
                        disable={true}
                      />
                      <TextInput
                        label="No Ponsel 2"
                        type="text"
                        id="phoneNumber_2"
                        placeholder={wali?.phoneNumber_2}
                        disable={true}
                      />
                      <TextInput
                        label="Provinsi"
                        type="text"
                        id="province"
                        placeholder={wali?.province}
                        disable={true}
                      />
                      <TextInput
                        label="Kota"
                        type="text"
                        id="city"
                        placeholder={wali?.city}
                        disable={true}
                      />
                      <TextInput
                        label="Kecamatan"
                        type="text"
                        id="subDistrict"
                        placeholder={wali?.subDistrict}
                        disable={true}
                      />
                      <TextInput
                        label="Kelurahan"
                        type="text"
                        id="village"
                        placeholder={wali?.village}
                        disable={true}
                      />
                      <TextInput
                        label="Alamat"
                        type="text"
                        id="address"
                        placeholder={wali?.address}
                        disable={true}
                      />
                      <TextInput
                        label="Kode Pos"
                        type="text"
                        id="postalCode"
                        placeholder={wali?.postalCode}
                        disable={true}
                      />
                      <TextInput
                        label="Tempat Lahir"
                        type="text"
                        id="birthPlace"
                        placeholder={wali?.birthPlace}
                        disable={true}
                      />
                      <TextInput
                        label="Tanggal Lahir"
                        type="text"
                        id="birthDate"
                        placeholder={wali?.birthDate}
                        disable={true}
                      />
                      <TextInput
                        label="Pendidikan Terakhir"
                        type="text"
                        id="lastEducation"
                        placeholder={wali?.lastEducation}
                        disable={true}
                      />
                      <TextInput
                        label="Perusahaan Tempat Bekerja"
                        type="text"
                        id="placeOfWork"
                        placeholder={wali?.placeOfWork}
                        disable={true}
                      />
                      <TextInput
                        label="Posisi/Jabatan"
                        type="text"
                        id="occupation"
                        placeholder={wali?.occupation}
                        disable={true}
                      />
                      <TextInput
                        label="Penghasilan Tiap Bulan"
                        type="text"
                        id="incomeGrade"
                        placeholder={wali?.incomeGrade}
                        disable={true}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        borderRadius: "6px",
                        backgroundColor: "#F3F4F6",
                        padding: "30px 30px 30px",
                        textAlign: "center",
                      }}
                    >
                      <h1>Data Tidak Ditemukan</h1>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
    </>
  );
};
export default DetailDataRegistrasi;
