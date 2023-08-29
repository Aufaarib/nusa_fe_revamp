import { Checkbox } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  approvedRegistration,
  getAdmissionRegistrationByRegNumberAdmin,
} from "../../api/Registrasi";
import { Header } from "../../components";
import { DataTablesRegistrationDetail } from "../../components/DataTables";
import {
  AlertConfirmation,
  AlertFiles,
  AlertMessage,
  AlertPaymentProof,
  ModalDetail,
} from "../../components/ModalPopUp";

const DetailDataRegistrasi = () => {
  const [data, setData] = useState([]);
  const [anak, setDataAnak] = useState(null);
  const [ayah, setDataAyah] = useState(null);
  const [ibu, setDataIbu] = useState(null);
  const [wali, setDataWali] = useState(null);
  const [dataStep1, setDataStep1] = useState(null);
  const [dataStep2, setDataStep2] = useState(null);
  const [dataStep3, setDataStep3] = useState(null);
  const [dataStep4, setDataStep4] = useState(null);
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

  const [isOpenDetail, setisOpenDetail] = useState(false);
  const [cardOpened, setisCardOpened] = useState("");
  const [detailData, setDetailData] = useState("");

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

  const fetchReRegister = () => {
    setFetched("4");
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
      setDataStep4,
      setDataStep5
    );
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
    // {
    //   cell: (data) => (
    //     <div>
    //       <Checkbox></Checkbox>
    //     </div>
    //   ),
    //   width: "60px",
    // },
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
              : dataStep1.status === "invalid" && "Gagal Terverifikasi"
            : dataStep5.status === "valid"
            ? "Terverifikasi"
            : dataStep5.status === "inreview"
            ? "Sedang Di Tinjau"
            : dataStep5.status === "invalid" && "Gagal Terverifikasi"}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          className="btn-biru"
          title="Edit"
          onClick={() => navigateUbahStatus(data.regNumber)}
        >
          <i className="fa fa-edit" /> Edit Status
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "200px",
    },
  ];

  const columnTestResult = [
    // {
    //   cell: (data) => (
    //     <div>
    //       <Checkbox></Checkbox>
    //     </div>
    //   ),
    //   width: "60px",
    // },
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Tanggal</div>,
      cell: (data) => <div>{moment(data.createdAt).format("DD-MM-YYYY")}</div>,
      width: "auto",
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
            : dataStep3.status === "invalid" && "Gagal Terverifikasi"}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          className="btn-biru"
          title="Edit"
          onClick={() => navigateUbahStatus(data.regNumber)}
        >
          <i className="fa fa-edit" /> Edit Status
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "320px",
    },
  ];

  const cardBerkasPendaftaran = [
    {
      card: "Anak",
      nama: `${anak?.firstName} ${anak?.middleName} ${anak?.lastName}`,
      hp: anak?.gender === "male" ? "Laki-Laki" : "Perempuan",
      alamat: anak?.birthPlace,
    },
    {
      card: "Ayah",
      nama: ayah?.fullName,
      hp: ayah?.phoneNumber_2,
      alamat: ayah?.address,
    },
    {
      card: "Ibu",
      nama: ibu?.fullName,
      hp: ibu?.phoneNumber_2,
      alamat: ibu?.address,
    },
    {
      card: "Wali",
      nama: wali?.fullName,
      hp: wali?.phoneNumber_2,
      alamat: wali?.address,
    },
  ];

  const ApproveRegistrasi = () => {
    if (dataStep1?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Pembayaran Biaya Registrasi Belum Terverifikasi (Tahap 1)",
        "Tutup",
        "warning"
      );
    } else if (dataStep2?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Data Pendaftaran Belum Terverifikasi (Tahap 2)",
        "Tutup",
        "warning"
      );
    } else if (dataStep3?.status !== "valid") {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Hasil Tes Belum Terupload atau Terverifikasi (Tahap 3)",
        "Tutup",
        "warning"
      );
    } else if (dataStep5 == null) {
      AlertMessage(
        "Tidak Dapat Melakukan Verifikasi",
        "Pembayaran Biaya Pendidikan Kosong",
        "Tutup",
        "warning"
      );
    } else {
      data.status === "valid"
        ? AlertConfirmation(
            onConfirm,
            "Batalkan Verifikasi Pendaftar?",
            "",
            "Batalkan Verifikasi",
            "question"
          )
        : data.status === "inreview" &&
          AlertConfirmation(
            onConfirm,
            "Verifikasi Pendaftar?",
            "",
            "Verifikasi",
            "question"
          );
    }
  };

  const onConfirm = () => {
    const status =
      data.status === "valid"
        ? "inreview"
        : data.status === "inreview" && "valid";
    approvedRegistration(code, status, fetchAdmissionRegistration);
  };

  const handleModalDetail = (card) => {
    setisCardOpened(card);
    if (card === "Anak") {
      setDetailData(anak);
    } else if (card === "Ayah") {
      setDetailData(ayah);
    } else if (card === "Ibu") {
      setDetailData(ibu);
    } else if (card === "Wali") {
      setDetailData(wali);
    }
    setisOpenDetail(true);
  };

  const closeModal = () => {
    setisOpenDetail(false);
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
                <h4 className="text-kuning">Belum Terverifikasi</h4>
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
                dataStep3?.status !== "valid"
                  ? // || dataStep5?.status !== "valid"
                    "btn-action-disabled"
                  : data.status === "inreview"
                  ? "btn-hijau"
                  : "btn-mrh"
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
                dataStep1 !== null ? fetched === "1" && "#fa5c5c" : "",
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
              backgroundColor: fetched === "2" && "#fa5c5c",
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
              backgroundColor: fetched === "3" && "#fa5c5c",
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
              backgroundColor: fetched === "4" && "#fa5c5c",
              color:
                dataStep1?.status === "valid" &&
                dataStep2?.status === "valid" &&
                dataStep3?.status === "valid"
                  ? // ? dataStep3 === null
                    fetched === "4" && "white"
                  : // : "grey"
                    "grey",
            }}
            onClick={() => fetchReRegister()}
            disabled={
              dataStep1?.status === "valid" &&
              dataStep2?.status === "valid" &&
              dataStep3?.status === "valid"
                ? // ? dataStep3 === null
                  false
                : // : true
                  true
            }
          >
            <i className="fa fa-refresh" /> Daftar Ulang
          </button>
          <button
            style={{
              borderRadius: "6px",
              padding: "20px 20px",
              width: "200px",
              backgroundColor: fetched === "5" && "#fa5c5c",
              color:
                dataStep1?.status === "valid" &&
                dataStep2?.status === "valid" &&
                dataStep3?.status === "valid" &&
                dataStep4?.status === "valid"
                  ? dataStep5 !== null
                    ? fetched === "5" && "white"
                    : "grey"
                  : "grey",
            }}
            onClick={() => fetchEducationPayment()}
            disabled={
              dataStep1?.status === "valid" &&
              dataStep2?.status === "valid" &&
              dataStep3?.status === "valid" &&
              dataStep4?.status === "valid"
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
        {fetched === "2" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "20px",
              backgroundColor: "#F3F4F6",
              justifyContent: "space-between",
              padding: "20px",
              borderRadius: "6px",
            }}
          >
            <div>
              <div style={{ display: "inline-block", float: "left" }}>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  <h4 className="text-hitam">Status :</h4>
                  {dataStep2 !== null ? (
                    <>
                      {dataStep2.status === "valid" ? (
                        <h4 className="text-hijau">Terverifikasi</h4>
                      ) : dataStep2.status === "inreview" ? (
                        <h4 className="text-kuning">Sedang Ditinjau</h4>
                      ) : (
                        dataStep2.status === "invalid" && (
                          <h4>Gagal Ditinjau</h4>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      <h4 className="text-kuning">Belum Lengkap</h4>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: "inline-block", float: "right" }}>
                <div style={{ display: "flex" }}>
                  <button
                    style={{
                      fontSize: "14px",
                      width: "auto",
                      padding: "2px 10px",
                    }}
                    className={
                      dataStep2 !== null ? "btn-biru" : "btn-action-disabled"
                    }
                    disabled={dataStep2 !== null ? false : true}
                    onClick={() => navigateUbahStatus()}
                  >
                    <i className="fa fa-edit" /> Edit Status
                  </button>
                </div>
              </div>
            </div>
            {cardBerkasPendaftaran.map((data) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "6px",
                  border: "1px solid #8F0D1E",
                }}
              >
                <strong style={{ padding: "20px 20px" }} className="text-merah">
                  {data.card}
                </strong>
                <div
                  style={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <label>
                    Nama : <strong>{data.nama}</strong>
                  </label>
                  <label>
                    {data.card === "Anak" ? "Jenis Kelamin : " : "No. Hp : "}{" "}
                    <strong> {data.hp} </strong>
                  </label>
                </div>
                <label style={{ padding: "20px" }}>
                  {data.card === "Anak" ? "Tempat Lahir : " : "Alamat : "}{" "}
                  <strong className="text-abu"> {data.alamat}</strong>
                </label>
                <div
                  style={{
                    backgroundColor: "#8F0D1E",
                    padding: "15px",
                    width: "100%",
                    borderRadius: "0px 0px 6px 6px",
                  }}
                >
                  {data.nama !== undefined ? (
                    <button
                      onClick={() => handleModalDetail(data.card)}
                      style={{
                        width: "auto",
                        padding: "2px 10px",
                        border: "1px solid white",
                        borderRadius: "10px",
                      }}
                      className="btn-biru"
                    >
                      <i className="fa fa-eye" /> Detail
                    </button>
                  ) : (
                    <button
                      style={{ fontWeight: "bold" }}
                      className="text-abu"
                      disabled
                    >
                      Belum Mengisi
                    </button>
                  )}
                </div>
              </div>
            ))}
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                backgroundColor: "white",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #8F0D1E",
              }}
            >
              <div
                style={{
                  padding: "15px",
                }}
              >
                <strong className="text-merah">Pernyataan</strong>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    padding: "20px",
                  }}
                >
                  {data.statements?.map((data) => (
                    <div
                      style={{
                        display: "grid",
                        columnGap: "10px",
                        gridTemplateColumns: "186px auto auto",
                        justifyContent: "left",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <label style={{ fontWeight: "bold" }} className="mt-1">
                        {data.statement.question}
                      </label>

                      <span className="mt-1">:</span>
                      <label className="mt-1">{data.answer}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#8F0D1E",
                  padding: "15px",
                  width: "100%",
                  borderRadius: "0px 0px 6px 6px",
                }}
              >
                {data.statements?.length !== 0 ? (
                  <button
                    // onClick={() => handleModalDetail(data.card)}
                    style={{ fontWeight: "bold" }}
                    className="text-hijau"
                    disabled
                  >
                    Lengkap
                  </button>
                ) : (
                  <button
                    style={{ fontWeight: "bold" }}
                    className="text-abu"
                    disabled
                  >
                    Belum Mengisi
                  </button>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                backgroundColor: "white",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #8F0D1E",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <strong className="text-merah">Berkas</strong>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    padding: "20px",
                  }}
                >
                  {data.additionalFiles?.map((data) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "auto",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      <div>
                        <button
                          title="Tampil Bukti Pembayaran"
                          onClick={() => {
                            AlertFiles(data.file);
                          }}
                        >
                          <img
                            src={
                              process.env.REACT_APP_BASE_STATIC_FILE + data.file
                            }
                            alt="Girl in a jacket"
                            width="200px"
                            height="200px"
                          ></img>
                        </button>
                      </div>
                      <label
                        style={{ fontWeight: "bold" }}
                        className="capitalize"
                      >
                        {data.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#8F0D1E",
                  padding: "15px",
                  width: "100%",
                  borderRadius: "0px 0px 6px 6px",
                }}
              >
                {data.additionalFiles?.length !== 0 ? (
                  <button
                    // onClick={() => handleModalDetail(data.card)}
                    style={{ fontWeight: "bold" }}
                    className="text-hijau"
                    disabled
                  >
                    Lengkap
                  </button>
                ) : (
                  <button
                    style={{ fontWeight: "bold" }}
                    className="text-abu"
                    disabled
                  >
                    Belum Mengisi
                  </button>
                )}
              </div>
            </div>
          </div>
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
                <h1>Hasil Tes Belum Di Upload</h1>
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
        {fetched === "4" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "20px",
              backgroundColor: "#F3F4F6",
              justifyContent: "space-between",
              padding: "20px",
              borderRadius: "6px",
            }}
          >
            <>
              {dataStep4 !== null ? (
                <div
                  style={{
                    borderRadius: "6px",
                    backgroundColor: "#F3F4F6",
                    padding: "30px 30px 30px",
                    textAlign: "center",
                  }}
                >
                  <h1 className="text-hijau">
                    Orang Tua Telah Mempersetujui Pendaftaran Ulang
                  </h1>
                </div>
              ) : (
                <div
                  style={{
                    borderRadius: "6px",
                    backgroundColor: "#F3F4F6",
                    padding: "30px 30px 30px",
                    textAlign: "center",
                  }}
                >
                  <h1>Orang Tua Belum Mempersetujui Pendaftaran Ulang</h1>
                </div>
              )}
            </>
          </div>
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
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
      <ModalDetail
        isOpenCostCenter={isOpenDetail}
        closeModalCostCenter={closeModal}
        card={cardOpened}
        data={detailData}
      />
    </>
  );
};
export default DetailDataRegistrasi;
