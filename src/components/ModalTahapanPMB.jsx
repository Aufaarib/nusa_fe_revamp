import { AnimatePresence, motion } from "framer-motion";
import moment from "moment/moment";
import { BiEdit } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { MdOutlineFactCheck, MdPayment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { daftarUlangAgreement } from "../api/Registrasi";
import { useStateContext } from "../contexts/ContextProvider";
import {
  FaRegArrowAltCircleRight,
  FaRegCheckCircle,
  FaRegClock,
  FaRegPauseCircle,
  FaRegTimesCircle,
  FaRegUserCircle,
} from "react-icons/fa";

const ModalTahapanPMB = ({ status, step, selected, setSelected }) => {
  const {
    dataAdmissionRegistration,
    admissionSteps1,
    admissionSteps2,
    admissionSteps3,
    admissionSteps4,
    admissionSteps5,
    isLoading,
    setIsLoading,
  } = useStateContext();
  const user = dataAdmissionRegistration.user;

  const navigate = useNavigate();
  const Nama = localStorage.getItem("NAMA");
  const path = "/pmb/form-data-murid";
  const path2 = "/pmb/tahapan-pmb";

  const reload = () => {
    window.location.href = path2;
  };

  const navigateFormulir = () => {
    navigate(path);
  };

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
          <div
            style={{ marginTop: "90px", marginBottom: "50px" }}
            className="fixed inset-0 left-0 flex overflow-y-scroll"
          >
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
                className={`flex items-center text-base p-7 relative`}
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

                <motion.div layout="position">
                  <h5>
                    {step}
                    {step == 1 && ". Pembayaran Pendaftaran"}
                    {step == 2 && ". Pengisian Formulir"}
                    {step == 3 && ". Hasil Tes"}
                    {step == 4 && ". Daftar Ulang"}
                    {step == 5 && ". Pembayaran Biaya Pendidikan"}
                  </h5>
                  <p className="flex text-sm">
                    {status == "Belum Mulai" && "Belum Mulai"}
                    {status == "Berhasil" && "Berhasil"}
                    {status == "Gagal" && "Gagal"}
                    {step == 1 && (
                      <>
                        {status == "Dalam Proses" && (
                          <>
                            {dataAdmissionRegistration.invoice === "" &&
                              "Menunggu Pembayaran"}
                            {dataAdmissionRegistration.invoice !== "" &&
                              "Menunggu Validasi Admin"}
                          </>
                        )}
                      </>
                    )}
                    {step == 2 && (
                      <>
                        {status == "Dalam Proses" && (
                          <>
                            {dataAdmissionRegistration.applicant === null ||
                            user?.parents?.length !== 3 ||
                            dataAdmissionRegistration.statements?.length ===
                              0 ||
                            dataAdmissionRegistration.additionalFiles === null
                              ? "Data Belum Lengkap"
                              : "Menunggu Validasi Admin"}
                          </>
                        )}
                      </>
                    )}
                    {step == 3 && (
                      <>
                        {status == "Dalam Proses" && (
                          <>
                            {dataAdmissionRegistration.testResult !== null &&
                              "Menunggu Validasi Admin"}
                            {dataAdmissionRegistration.testResult === null &&
                              "Menunggu Hasil Tes"}
                          </>
                        )}
                      </>
                    )}
                    {step == 4 && (
                      <>
                        {status == "Dalam Proses" &&
                          "Menunggu Persetujuan Orang Tua"}
                      </>
                    )}
                    {step == 5 && (
                      <>
                        {status == "Dalam Proses" && (
                          <>
                            {dataAdmissionRegistration.payments?.length == 0 &&
                              "Menunggu Pembayaran"}
                            {dataAdmissionRegistration.payments?.length != 0 &&
                              "Menunggu Validasi Admin"}
                          </>
                        )}
                      </>
                    )}
                    {status == "Belum Mulai" && (
                      <FaRegPauseCircle className="mt-1 ml-1 text-sm" />
                    )}
                    {status == "Dalam Proses" && (
                      <FaRegClock className="mt-1 ml-1 text-sm" />
                    )}
                    {status == "Berhasil" && (
                      <FaRegCheckCircle className="mt-1 ml-1 text-sm" />
                    )}
                    {status == "Gagal" && (
                      <FaRegTimesCircle className="mt-1 ml-1 text-sm" />
                    )}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setSelected({})}
                  className="absolute cursor-pointer top-1 right-1 p-1"
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
                  </h4>
                  <br />

                  {status === "Belum Mulai" && (
                    <>
                      <div>
                        <p>Tahap ini belum dapat dilakukan.</p>
                        <br />
                        <p>Mohon selesaikan tahap sebelumnya.</p>
                      </div>
                    </>
                  )}

                  {step == 1 && status != "Belum Mulai" && (
                    <>
                      {dataAdmissionRegistration.invoice === "" && (
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
                            Nama Akun : {""}
                            <strong className="capitalize">{Nama}</strong>
                            <br />
                            <hr />
                            Batas Akhir Pembayaran : {""}
                            <strong>
                              {moment(
                                dataAdmissionRegistration.admissionPhase.endDate
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
                                dataAdmissionRegistration.admissionPhase.amount
                              )}
                            </strong>
                            <hr />
                            <br />
                          </p>
                          Silahkan lakukan transfer sebesar{" "}
                          <strong>Total Tagihan</strong> ke rekening berikut :
                          <br />
                          <br />
                          <strong>
                            {" "}
                            Bank DKI Syariah Cabang Pondok Indah{" "}
                          </strong>
                          <br />
                          Nomor Rekening :<strong> 71021590003</strong>
                          <br />
                          <br />
                          Untuk informasi lebih lanjut silahkan hubungi No
                          Whatsapp
                          <strong> 08129801108 </strong> (Ibu Hanny).
                          <br />
                          <br />
                          <strong>
                            Tekan Tombol Dibawah Ini Untuk Unggah Bukti
                            Pembayaran
                          </strong>
                          <Link
                            to={"/pmb/berkas-pembayaran"}
                            className="mt-7 btn-merah"
                          >
                            Upload Bukti Pembayaran Registrasi
                          </Link>
                        </>
                      )}
                      {dataAdmissionRegistration.invoice !== "" && (
                        <>
                          {status === "Dalam Proses" && (
                            <>
                              <p>
                                Bukti Pembayaran Telah Berhasil Terkirim, dan
                                sedang proses pengecekan oleh admin
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps1.note}
                                </strong>
                              </p>
                            </>
                          )}
                          {status === "Berhasil" && (
                            <>
                              <p>
                                Alhamdulillah, Pembayaran sudah selesai.
                                silahkan lanjut ke tahap berikutnya
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps1.note}
                                </strong>
                              </p>
                            </>
                          )}
                          {status === "Gagal" && (
                            <>
                              <div>
                                <p>Tahap ini Gagal.</p>
                                <br />
                                <p>
                                  Catatan :{" "}
                                  <strong className="capitalize">
                                    {admissionSteps1.note}
                                  </strong>
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {step == 2 && status != "Belum Mulai" && (
                    <>
                      {dataAdmissionRegistration.applicant === null ||
                      user?.parents?.length !== 3 ||
                      dataAdmissionRegistration.statements?.length === 0 ||
                      dataAdmissionRegistration.additionalFiles?.length ===
                        0 ? (
                        <>
                          <p>Pengisian Form Belum Lengkap</p>
                          <p>Silahkan Lengkapi Pengisian Form.</p>
                          <br />
                          {dataAdmissionRegistration.applicant === null && (
                            <p>- Belum Mengisi Form Data Anak</p>
                          )}
                          {user?.parents?.length !== 3 && (
                            <p>- Form Data Orang Tua Belum Lengkap</p>
                          )}
                          {dataAdmissionRegistration.statements?.length ===
                            0 && <p>- Belum Mengisi Form Pernyataan</p>}
                          {dataAdmissionRegistration.additionalFiles?.length ===
                            0 && <p>- Belum Mengisi Form Upload Berkas</p>}
                          <br />
                          <button
                            className="btn-mrh"
                            onClick={() => navigateFormulir()}
                          >
                            Isi Formulir
                          </button>
                        </>
                      ) : (
                        <>
                          {status == "Dalam Proses" && (
                            <>
                              <p>
                                Data Registrasi Telah Lengkap. Dan Sedang Dalam
                                Proses Pengecekan Oleh Admin
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps1.note}
                                </strong>
                              </p>
                              <br />
                              <button
                                className="btn-mrh"
                                onClick={() => navigateFormulir()}
                              >
                                Ubah Formulir
                              </button>
                            </>
                          )}
                          {status == "Berhasil" && (
                            <>
                              <p>
                                Alhamdulillah pengisian formulir data Calon
                                Siswa dan Keluarga telah berhasil.
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps2.note}
                                </strong>
                              </p>
                              <br />
                              <p>Silahkan melanjutkan ke tahapan berikutnya.</p>
                            </>
                          )}
                          {status === "Gagal" && (
                            <>
                              <p>Tahap ini Gagal.</p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps2.note}
                                </strong>
                              </p>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {step == 3 && status !== "Belum Mulai" && (
                    <>
                      {dataAdmissionRegistration.testResult === null && (
                        <>
                          <p>Rangkaian Test Sedang Berlangsung</p>
                        </>
                      )}
                      {dataAdmissionRegistration.testResult !== null && (
                        <>
                          {status === "Dalam Proses" && (
                            <>
                              <p>Rangkaian Test Sedang Berlangsung</p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps3.note}
                                </strong>
                              </p>
                            </>
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
                              <p>
                                Nilai Tes :{" "}
                                <strong>
                                  {dataAdmissionRegistration.testResult.score}
                                </strong>
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps3.note}
                                </strong>
                              </p>
                              <br />
                              <p>Silahkan melanjutkan ke tahapan berikutnya.</p>
                            </div>
                          )}
                          {status === "Gagal" && (
                            <>
                              <div>
                                <p>Tahap ini Gagal.</p>
                                <br />
                                <p>
                                  Catatan :{" "}
                                  <strong className="capitalize">
                                    {admissionSteps3.note}
                                  </strong>
                                </p>
                              </div>
                            </>
                          )}
                        </>
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
                            Untuk Proses Selanjutnya, Silahkan Tekan Tombol
                            Persetujuan Berikut:
                          </p>
                          <br />
                          <button
                            onClick={() => daftarUlangAgreement(reload)}
                            className="mt-3 btn-merah"
                          >
                            Persetujuan Daftar Ulang
                          </button>
                        </div>
                      )}
                      {status == "Berhasil" && (
                        <div>
                          <p>
                            Proses Pendaftaran Ulang Telah Selesai, Silahkan
                            Lanjut Ke Tahap Berikutnya
                          </p>
                          <br />
                          <p>
                            Catatan :{" "}
                            <strong className="capitalize">
                              {admissionSteps4.note}
                            </strong>
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {step == 5 && status !== "Belum Mulai" && (
                    <>
                      {dataAdmissionRegistration.payments?.length == 0 && (
                        <>
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
                                dataAdmissionRegistration?.admissionPhase
                                  .admission?.details[0]?.amount
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
                      {dataAdmissionRegistration.payments?.length != 0 && (
                        <>
                          {status === "Dalam Proses" && (
                            <>
                              <p>
                                Bukti Pembayaran Telah Berhasil Terkirim, dan
                                sedang proses pengecekan oleh admin
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps5.note}
                                </strong>
                              </p>
                            </>
                          )}
                          {status == "Berhasil" && (
                            <>
                              <p>
                                Alhamdulillah, semua rangkaian administrasi
                                proses pendaftaran murid baru sudah selesai.
                              </p>
                              <br />
                              <p>
                                Catatan :{" "}
                                <strong className="capitalize">
                                  {admissionSteps5.note}
                                </strong>
                              </p>
                              <br />
                              <p>
                                Untuk informasi selanjutnya ayah/bunda akan kami
                                informasikan kembali.
                              </p>
                            </>
                          )}
                          {status === "Gagal" && (
                            <>
                              <div>
                                <p>Tahap ini Gagal.</p>
                                <br />
                                <p>
                                  Catatan :{" "}
                                  <strong className="capitalize">
                                    {admissionSteps5.note}
                                  </strong>
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {/* {step == 5 && admissionSteps5.status !== undefined && <></>} */}

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
