import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCheckCircle,
  FaRegUserCircle,
  FaRegTimesCircle,
  FaRegPauseCircle,
  FaRegArrowAltCircleRight,
  FaTimesCircle,
} from "react-icons/fa";
import {
  MdOutlinePayments,
  MdPayment,
  MdOutlineFactCheck,
} from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import useAuth from "../hooks/useAuth";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import {
  daftarUlangAgreement,
  getAdmissionRegistrationApplicant,
  getAdmissionRegistrationParentsAyah,
  getAdmissionRegistrationParentsIbu,
  getAdmissionRegistrationParentsWali,
} from "../api/Registrasi";
import moment from "moment/moment";

const ModalTahapanPMB = ({
  status,
  title,
  step,
  details,
  onClick,
  selected,
  setSelected,
}) => {
  const { auth } = useAuth();
  const verified = "verified";
  const {
    dataAdmissionRegistration,
    admissionSteps1,
    resendEmailVerification,
    paymentAgreement,
    successMsgSendVerify,
    errMsgSendVerify,
    isLoading,
  } = useStateContext();
  const Nama = localStorage.getItem("NAMA");
  const navigate = useNavigate();
  const path = "/pmb/form-data-murid";
  const navigateFormulir = () => {
    navigate(path);
  };

  // useEffect(() => {
  //   setAmount(dataAdmissionRegistration.admissionPhase.amount);
  // }, []);
  // const amount = dataAdmissionRegistration.admissionPhase.amount;

  return (
    <>
      <AnimatePresence>
        {selected && (
          <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 top-0 left-0 overflow-hidden bg-black/50`}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 top-0 left-0 z-50 flex overflow-y-scroll">
            <motion.div
              layoutId={step}
              className={`relative xs:w-9/12 md:w-6/12 xl:w-5/12 2xl:w-4/12 overflow-hidden rounded-lg shadow-2xl cursor-default m-auto
            ${
              status == "Belum Mulai"
                ? "pmb-belum-mulai"
                : status == "Dalam Proses"
                ? "pmb-dalam-proses"
                : status == "Berhasil"
                ? "pmb-berhasil"
                : status == "Gagal"
                ? "pmb-gagal"
                : ""
            }`}
            >
              <motion.div
                layout="position"
                className={`flex items-center text-base p-7 realative`}
              >
                {step == 1 && (
                  <span className={`step ml-0.5 mr-4 rounded-full`}>
                    <FaRegUserCircle className={`p-3  text-5xl text-white`} />
                  </span>
                )}
                {step == 2 && (
                  <span className={`step ml-0.5 mr-4 rounded-full`}>
                    <MdPayment className={`p-3 text-5xl text-white`} />
                  </span>
                )}
                {step == 3 && (
                  <span className={`step ml-0.5 mr-4 rounded-full`}>
                    <BiEdit className={`p-3 text-5xl text-white`} />
                  </span>
                )}
                {step == 4 && (
                  <span className={`step ml-0.5 mr-4 rounded-full`}>
                    <MdOutlineFactCheck className={`p-3 text-5xl text-white`} />
                  </span>
                )}
                {step == 5 && (
                  <span className={`step ml-0.5 mr-4 rounded-full`}>
                    <GoChecklist className={`p-3 text-5xl text-white`} />
                  </span>
                )}
                {/* {step == 6 && (
                  <span className={`step ml-0.5 mr-4 rounded-full`}>
                    <MdOutlinePayments className={`p-3 text-5xl text-white`} />
                  </span>
                )} */}

                <motion.div layout="position">
                  <h5>
                    {step}
                    {step == 1 && ". Pembayaran Pendaftaran"}
                    {step == 2 && ". Pengisian Formulir"}
                    {step == 3 && ". Hasil Tes"}
                    {step == 4 && ". Daftar Ulang"}
                    {step == 5 && ". Pembayaran Biaya Pendidikan"}
                    {/* {step == 6 && ""} */}
                  </h5>
                  <p className="flex text-sm">
                    {status}
                    {status == "Belum Mulai" && (
                      <FaRegPauseCircle className="ml-2 text-xl" />
                    )}
                    {status == "Dalam Proses" && (
                      <FaRegArrowAltCircleRight className="ml-2 text-xl" />
                    )}
                    {status == "Berhasil" && (
                      <FaRegCheckCircle className="ml-2 text-xl" />
                    )}
                    {status == "Gagal" && (
                      <FaRegTimesCircle className="ml-2 text-xl" />
                    )}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setSelected({})}
                  className="absolute cursor-pointer top-4 right-4"
                >
                  <FaRegTimesCircle className="text-2xl text-merah" />
                </motion.div>
              </motion.div>

              <motion.div
                className={` bg-white text-sm text-black h-0`}
                transition={{ delay: 0.5 }}
                initial={{ height: "0px" }}
                animate={{ height: "auto" }}
                exit={{ height: "0px", transition: { delay: 0 } }}
              >
                <div className="p-7">
                  <h4>
                    {step == 1 && "Pembayaran Pendaftaran"}
                    {step == 2 && "Pengisian Formulir"}
                    {step == 3 && "Hasil Tes"}
                    {step == 4 && "Daftar Ulang"}
                    {step == 5 && "Pembayaran Biaya Pendidikan"}
                    {/* {step == 6 && ""} */}
                  </h4>
                  <br />
                  {/* {status == "Belum Mulai" && <p>tes</p>}
                  {step == 1 && status == "Berhasil" && (
                    <p>{details.message}</p>
                  )}
                  {step == 3 && status == "Dalam Proses" && (
                    <p>{details.message}</p>
                  )}
                  {step == 4 && status == "Dalam Proses" && (
                    <p>{details.message}</p>
                  )}
                  {step == 5 && status == "Berhasil" && (
                    <p>{details.message}</p>
                  )} */}

                  {status === "Belum Mulai" && (
                    <>
                      <div>
                        <p>Tahap ini belum dapat dilakukan.</p>
                        <br />
                        <p>Mohon selesaikan tahap sebelumnya.</p>
                      </div>
                    </>
                  )}

                  {status === "Gagal" && (
                    <>
                      <div>
                        <p>Tahap ini Gagal.</p>
                      </div>
                    </>
                  )}

                  {step == 1 && status !== "Belum Mulai" && (
                    <>
                      {status == "Dalam Proses" && (
                        <>
                          {admissionSteps1.status !== "inreview" ? (
                            <>
                              <p>
                                Bagi para Ayah/Bunda yang sudah melakukan
                                registrasi, maka tahapan selanjutnya adalah
                                Ayah/Bunda bisa melakukan pembayaran pendaftaran
                                dengan ketentuan sebagai berikut.
                              </p>
                              <br />
                              <p>
                                <strong>Informasi Akun:</strong>
                              </p>
                              <br />
                              <p>
                                Nama Lengkap : {""}
                                <strong className="capitalize">{Nama}</strong>
                                <br />
                                <hr />
                                Batas Akhir Pembayaran : {""}
                                <strong>
                                  {moment(
                                    dataAdmissionRegistration.admissionPhase
                                      .endDate
                                  ).format("DD-MM-YYYY")}
                                </strong>
                                <hr />
                                Total Tagihan : {""}
                                <strong>
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                  }).format(
                                    dataAdmissionRegistration.admissionPhase
                                      .amount
                                  )}
                                </strong>
                                <hr />
                                <br />
                              </p>
                              Silahkan lakukan transfer sebesar{" "}
                              <strong>Total Tagihan</strong> ke rekening berikut
                              :
                              <br />
                              Bank DKI Syariah cabang Pondok Indah
                              <br />
                              Nomor Rekening :<strong> 71021590003</strong>
                              <br />
                              <br />
                              Untuk informasi lebih lanjut dan konfirmasi
                              setelah melakukan transfer, silahkan hubungi No
                              Whatsapp
                              <strong> 08129801108 </strong> (Ibu Hanny).
                              <Link
                                to={"/pmb/berkas-pembayaran"}
                                className="mt-7 btn-merah"
                              >
                                Upload Bukti Pembayaran Registrasi
                              </Link>
                            </>
                          ) : (
                            <>
                              <p>
                                Bukti Pembayaran Telah Berhasil Terkirim, dan
                                sedang proses pengecekan oleh admin
                              </p>
                            </>
                          )}
                        </>
                      )}
                      {status == "Berhasil" && (
                        <>
                          <p>
                            Alhamdulillah, Pembayaran sudah selesai. silahkan
                            lanjut ke tahap berikutnya
                          </p>
                        </>
                      )}
                    </>
                  )}

                  {/* pengisian formulir */}
                  {step == 2 && status !== "Belum Mulai" && (
                    <>
                      {status == "Berhasil" && (
                        <div>
                          <p>
                            Alhamdulillah pengisian formulir data Calon Siswa
                            dan Keluarga telah berhasil.
                          </p>
                          <br />
                          <p>Silahkan melanjutkan ke tahapan berikutnya.</p>
                        </div>
                      )}
                      {status !== "Berhasil" && (
                        <div>
                          <p>Pengisian Form Belum Lengkap</p>
                          <br />
                          <p>Silahkan Lengkapi Pengisian Form.</p>
                          <br />
                          <button
                            className="btn-mrh"
                            onClick={() => navigateFormulir()}
                          >
                            Isi Formulir
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {step == 3 && status !== "Belum Mulai" && (
                    <>
                      {status === "Dalam Proses" && (
                        <div>
                          <p>Rangkaian Test Sedang Berlangsung</p>
                        </div>
                      )}
                      {status === "Berhasil" && (
                        <div>
                          <p>
                            Alhamdulillah Putra/ Putri Ayah/ Bunda telah
                            melakukan rangkai tes dengan hasil sbb:
                          </p>
                          <br />
                          <p>
                            Nama Anak :{" "}
                            <strong>
                              {dataAdmissionRegistration.childName}
                            </strong>
                          </p>
                          {/* <p>
                            Kategori:
                          </p> */}
                          <p>
                            Nilai Tes :{" "}
                            <strong>
                              {dataAdmissionRegistration.testResult.score}
                            </strong>
                          </p>
                          {/* <p>
                            Lampiran Tes:
                            <a
                              // href={item.hasil_test.pdf}
                              className="break-all"
                              target="_blank"
                            >
                            </a>
                          </p> */}
                          <br />
                          <p>Silahkan melanjutkan ke tahapan berikutnya.</p>
                        </div>
                      )}
                    </>
                  )}

                  {step == 4 && status !== "Belum Mulai" && (
                    <>
                      {status == "Dalam Proses" && (
                        <div>
                          <p>
                            Alhamdulillah, Ananda telah lulus test penerimaan
                            calon murid baru SAIM.
                          </p>
                          <br />
                          <p>
                            Untuk proses selanjutnya, klik link persetujuan
                            berikut:
                          </p>
                          <Link
                            onClick={daftarUlangAgreement}
                            className="mt-3 btn-merah"
                          >
                            Persetujuan Daftar Ulang
                          </Link>
                        </div>
                      )}
                      {status == "Berhasil" && (
                        <div>
                          <p>
                            Proses Pendaftaran Ulang Telah Selesai, Silahkan
                            Lanjut Ke Tahap Berikutnya
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {step == 5 && status !== "Belum Mulai" && (
                    <>
                      {status == "Dalam Proses" && (
                        <>
                          <p>Ini merupakan notifikasi pembayaran otomatis</p>
                          <br />
                          <p>
                            Assalamualaikum Warrahmatullahi Wabarakatuh
                            Bismillahirrahmanirrahim Semoga Ayah/Bunda
                            senantiasa dalam lindungan Allah SWT.
                          </p>
                          <br />
                          <p>
                            Kami dari bagian keuangan Sekolah Adab Insan Mulia,
                            menyampaikan informasi kewajiban keuangan ananda
                          </p>
                          <br />
                          <div className="font-bold flex gap-2">
                            <p>Nama Siswa : </p>
                            <p className="font-bold capitalize">
                              {" "}
                              {dataAdmissionRegistration.childName}
                            </p>
                          </div>
                          <div className="font-bold flex gap-2">
                            <p>Total Tagihan : </p>
                            <p className="font-bold capitalize">
                              {" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(
                                dataAdmissionRegistration.admissionPhase
                                  .admission.details[0].amount
                              )}
                            </p>
                          </div>
                          <br />
                          <p>
                            Mohon Ayah/Bunda dapat segera menyelesaikan
                            kewajiban keuangannya. Semoga Allah SWT mudahkan dan
                            lancarkan rezekinya.
                          </p>
                          <br />
                          Pembayaran dapat dilakukan melalui Transfer ke :
                          <br />
                          <br />
                          {/* <strong>{details.banks[0].nama_pemilik}</strong> */}
                          Bank DKI Syariah cabang Pondok Indah
                          <br />
                          Nomor Rekening : <strong> 71021590003 </strong>
                          <br />
                          Atas Nama :{" "}
                          <strong> Yayasan Adab Insan Mulia </strong>
                          <br />
                          <br />
                          Untuk informasi lebih lanjut, silahkan hubungi No
                          Whatsapp
                          <strong> 08129801108 </strong>
                          (Ibu Hanny).
                          <Link
                            to={"/pmb/berkas-pembayaran-biaya-pendidikan"}
                            className="mt-7 btn-merah"
                          >
                            Upload Bukti Pembayaran Pendidikan
                          </Link>
                        </>
                      )}
                      {status == "Berhasil" && (
                        <>
                          <p>
                            Ayah/ Bunda, Alhamdulillah semua rangkaian
                            administrasi proses pendaftaran murid baru sudah
                            diselesaikan dengan sudah dilakukan pembayaran biaya
                            pendidikannya.
                          </p>
                          <br />
                          <p>
                            Untuk informasi selanjutnya ayah/bunda akan kami
                            informasikan kembali.
                          </p>
                        </>
                      )}
                    </>
                  )}

                  <br />
                  <br />
                  <p>
                    Terimakasih,
                    <br />
                    <strong>Tim PMB SAIM</strong>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalTahapanPMB;
