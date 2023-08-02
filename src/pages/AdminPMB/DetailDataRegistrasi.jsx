import { Checkbox } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAdmissionRegistrationByRegNumberAdmin,
  updateAdmissionSteps,
  uploadHasilTest,
} from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesRegistrationDetail } from "../../components/DataTables";
import {
  AlertPaymentProof,
  AlertStatusValidatePayment,
} from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";

const DetailDataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [anak, setDataAnak] = useState([]);
  const [ayah, setDataAyah] = useState([]);
  const [ibu, setDataIbu] = useState([]);
  const [wali, setDataWali] = useState([]);
  const [dataStep1, setDataStep1] = useState({});
  const [dataStep2, setDataStep2] = useState({});
  const [dataStep3, setDataStep3] = useState({});
  const [dataStep5, setDataStep5] = useState({});
  const [edu, setEdu] = useState({});
  const [amount, setAmount] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [fetched, setFetched] = useState("");
  const [fetchedRegData, setFetchedRegData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const code = localStorage.getItem("REG_NUMBER");
  const path = "/admin/list-data-registrasi";
  const updatedFetched = location?.state?.fetched;

  console.log("EDUUU === ", dataStep3);
  console.log("LL === ", anak);

  const fetchEducationPayment = () => {
    setFetched("5");
    fetchAdmissionRegistration();
  };

  const fetchRegistrationPayment = () => {
    setFetched("1");
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

  const fetchTestResult = () => {
    setFetched("3");
  };

  const fetchRegistrationData = () => {
    setFetched("2");
    setFetchedRegData("fetchAnak");
    fetchAdmissionRegistration();
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
  }, []);

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  const ApproveEducationPayment = (id) => {
    AlertStatusValidatePayment(AcceptStep, id);
  };

  const DenyEducationPayment = (id) => {
    AlertStatusValidatePayment(DenyStep, id);
  };

  const uploadTestResult = () => {
    const score = 100;
    uploadHasilTest(score);
  };

  const AcceptStep = (step) => {
    const status = "valid";
    const note = "Bukti Tervalidasi";
    if (step === "1") {
      updateAdmissionSteps(
        setSts,
        fetchRegistrationPayment,
        code,
        step,
        status,
        note
      );
    } else if (step === "5") {
      updateAdmissionSteps(
        setSts,
        fetchEducationPayment,
        code,
        step,
        status,
        note
      );
    }
  };

  const DenyStep = (step) => {
    const status = "invalid";
    const note = "Bukti Tidak Tervalidasi";
    if (step === "1") {
      updateAdmissionSteps(
        setSts,
        fetchRegistrationPayment,
        code,
        step,
        status,
        note
      );
    } else if (step === "5") {
      updateAdmissionSteps(
        setSts,
        fetchEducationPayment,
        code,
        step,
        status,
        note
      );
    }
  };

  const navigateUbahStatus = () => {
    navigate("/admin/ubah-status-step", {
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
      // selector: (data) => data.admissionPhase.amount,
      cell: (data) => (
        <div>
          {fetched === "1" ? amount.amount : fetched === "5" && edu.amount}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div>
          {fetched === "1"
            ? dataStep1.status === "valid"
              ? "Valid"
              : "In Review"
            : fetched === "5" && dataStep5.status == "valid"
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
          onClick={() => navigateUbahStatus(data.regNumber)}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-edit" />
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
      //   selector: (data) => data.createdAt,
      cell: (data) => <div>{moment(data.createdAt).format("DD-MM-YYYY")}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div>{dataStep3.status === "valid" ? "Valid" : "In Review"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          title="Detail Pembayaran"
          onClick={() => navigateUbahStatus(data.regNumber)}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-edit" />
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
            gap: "50px",
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
              backgroundColor: fetched === "1" ? "#8F0D1E" : "",
              color: fetched === "1" ? "white" : "",
            }}
            onClick={() => fetchRegistrationPayment()}
          >
            <i className="fa fa-bank" /> Uang Pendaftaran
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "2" ? "#8F0D1E" : "",
              color: fetched === "2" ? "white" : "",
            }}
            onClick={() => fetchRegistrationData()}
          >
            <i className="fa fa-user" /> Data Pendaftaran
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "3" ? "#8F0D1E" : "",
              color: fetched === "3" ? "white" : "",
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
              backgroundColor: fetched === "5" ? "#8F0D1E" : "",
              color: fetched === "5" ? "white" : "",
            }}
            onClick={() => fetchEducationPayment()}
          >
            <i className="fa fa-bank" /> Uang Pendidikan
          </button>
        </div>

        {fetched !== "2" && (
          <>
            {data !== null && (
              <DataTablesRegistrationDetail
                columns={fetched === "3" ? columnTestResult : columnsPayments}
                data={[data]}
                Approve={() => {
                  fetched === "5"
                    ? ApproveEducationPayment("5")
                    : fetched === "1"
                    ? ApproveEducationPayment("1")
                    : fetched === "3" && uploadTestResult();
                }}
                Deny={() => {
                  fetched === "5"
                    ? DenyEducationPayment("5")
                    : fetched === "1" && DenyEducationPayment("1");
                }}
                onFilter={(e) => setFilterText(e.target.value)}
                filterText={filterText}
              />
            )}
          </>
        )}

        {fetched === "2" && (
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
                gap: "20px",
                marginBottom: "20px",
                backgroundColor: "#FFF",
                justifyContent: "center",
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
            <br />
            <section style={{ margin: "0 12%" }}>
              {data !== null && (
                <>
                  {fetchedRegData === "fetchAnak" && (
                    <>
                      <TextInput
                        label="Nama Depan"
                        type="text"
                        id="firstName"
                        placeholder={anak.firstName}
                        disable={true}
                        required={false}
                      />
                      <TextInput
                        label="Agama"
                        type="text"
                        id="religion"
                        placeholder={anak.religion}
                        disable={true}
                      />
                      <TextInput
                        label="Nama Tengah"
                        type="text"
                        id="middleName"
                        placeholder={anak.middleName}
                        disable={true}
                        required={false}
                      />
                      <TextInput
                        label="Nama Belakang"
                        type="text"
                        id="lastName"
                        placeholder={anak.lastName}
                        disable={true}
                      />
                      <TextInput
                        label="Status Anak"
                        type="text"
                        id="childStatus"
                        placeholder={anak.childStatus}
                        disable={true}
                      />
                      <TextInput
                        label="No KK"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={anak.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="No Akta Lahir"
                        type="number"
                        id="identityNumber"
                        placeholder={anak.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Anak ke"
                        type="number"
                        id="childNumber"
                        placeholder={anak.childNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Tinggi Badan Anak (cm)"
                        type="number"
                        id="height"
                        placeholder={anak.height}
                        disable={true}
                      />
                      <TextInput
                        label="Tempat Lahir"
                        type="text"
                        id="birthPlace"
                        placeholder={anak.birthPlace}
                        disable={true}
                      />
                      <TextInput
                        label="Tanggal Lahir"
                        type="text"
                        id="birthDate"
                        placeholder={moment(anak.birthDate).format(
                          "DD-MM-YYYY"
                        )}
                        disable={true}
                      />
                      <TextInput
                        label="Jenis Kelamin"
                        type="text"
                        id="gender"
                        placeholder={
                          anak.gender === "female" ? "Perempuan" : "Laki-Laki"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Golongan Darah"
                        type="text"
                        id="bloodType"
                        placeholder={anak.bloodType}
                        disable={true}
                      />
                      <TextInput
                        label="Hobi Anak"
                        type="text"
                        id="bloodType"
                        placeholder={
                          anak.gender === "female" ? "Perempuan" : "Laki-Laki"
                        }
                        disable={true}
                      />
                      <TextInput
                        label="Berat Badan Anak"
                        type="text"
                        id="hobby"
                        placeholder={anak.hobby}
                        disable={true}
                      />
                      <TextInput
                        label="No KK"
                        type="text"
                        id="familyIdentityNumber"
                        placeholder={anak.familyIdentityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="No Akta Lahir"
                        type="number"
                        id="identityNumber"
                        placeholder={anak.identityNumber}
                        disable={true}
                      />
                      <TextInput
                        label="Jarak Rumah Ke Sekolah"
                        type="text"
                        id="distanceFromHome"
                        placeholder={anak.distanceFromHome}
                        disable={true}
                      />
                      <TextInput
                        label="Transportasi Ke Sekolah"
                        type="text"
                        id="transportation"
                        placeholder={anak.transportation}
                        disable={true}
                      />
                      <TextInput
                        label="Kelas Pada Saat Mendaftar"
                        type="number"
                        id="schoolOriginClass"
                        placeholder={anak.schoolOriginClass}
                        disable={true}
                      />
                      <TextInput
                        label="Asal Sekolah"
                        type="number"
                        id="schoolOriginName"
                        placeholder={anak.schoolOriginName}
                        disable={true}
                      />
                      <TextInput
                        label="Sifat Dominan Anak"
                        type="number"
                        id="characteristic"
                        placeholder={anak.characteristic}
                        disable={true}
                      />
                      <TextInput
                        label="Penyakit Berat Yang Pernah Diderita"
                        type="text"
                        id="healthRecord"
                        placeholder={anak.healthRecord}
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
                              data.gender === "female"
                                ? "Perempuan"
                                : "Laki-Laki"
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
                        placeholder={
                          data.isBiological === 1 ? "Kandung" : "Tiri"
                        }
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
                </>
              )}
            </section>
            <br />
            <div style={{ display: "flex" }}>
              <TextInput
                label="Status Tahapan"
                type="text"
                id="incomeGrade"
                value={dataStep2.status}
                disable={true}
              />
              <button
                onClick={() => navigateUbahStatus()}
                className="btn-merah"
              >
                t
              </button>
            </div>
            <br />
            {/* <div className="btn-form">
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
            </div> */}
          </div>
        )}
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
    </>
  );
};
export default DetailDataRegistrasi;
