import { motion } from "framer-motion";
import { BiEdit } from "react-icons/bi";
import {
  FaRegArrowAltCircleRight,
  FaRegCheckCircle,
  FaRegClock,
  FaRegPauseCircle,
  FaRegTimesCircle,
  FaRegUserCircle,
} from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { MdOutlineFactCheck, MdPayment } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";

const InfoTahapanPMB = ({ status, title, step, details, onClick }) => {
  const { dataAdmissionRegistration, isLoading, setIsLoading } =
    useStateContext();
  const user = dataAdmissionRegistration.user;

  return (
    <div
      onClick={onClick}
      className={`flex items-center rounded-lg p-5 text-base cursor-pointer  
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
      <motion.div layout="position" className={`flex items-center`}>
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
        <div>
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
                      "Menunggu Verifikasi Admin"}
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
                    dataAdmissionRegistration.statements?.length === 0 ||
                    dataAdmissionRegistration.additionalFiles?.length === 0
                      ? "Data Belum Lengkap"
                      : "Menunggu Verifikasi Admin"}
                  </>
                )}
              </>
            )}
            {step == 3 && (
              <>
                {status == "Dalam Proses" && (
                  <>
                    {dataAdmissionRegistration.testResult !== null &&
                      "Menunggu Verifikasi Admin"}
                    {dataAdmissionRegistration.testResult === null &&
                      "Menunggu Hasil Tes"}
                  </>
                )}
              </>
            )}
            {step == 4 && (
              <>
                {status == "Dalam Proses" && "Menunggu Persetujuan Orang Tua"}
              </>
            )}
            {step == 5 && (
              <>
                {status == "Dalam Proses" && (
                  <>
                    {dataAdmissionRegistration.payments?.length == 0 &&
                      "Menunggu Pembayaran"}
                    {dataAdmissionRegistration.payments?.length != 0 &&
                      "Menunggu Verifikasi Admin"}
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
        </div>
      </motion.div>
    </div>
  );
};

export default InfoTahapanPMB;
