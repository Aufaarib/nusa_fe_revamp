import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRegCheckCircle,
  FaRegUserCircle,
  FaRegTimesCircle,
  FaRegPauseCircle,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import {
  MdOutlinePayments,
  MdPayment,
  MdOutlineFactCheck,
} from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { useStateContext } from "../contexts/ContextProvider";

const InfoTahapanPMB = ({ status, title, step, details, onClick }) => {
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

  console.log("FOR YOUU === ", user?.parents?.length);
  console.log("FOR YOUURRRR === ", dataAdmissionRegistration.applicant);

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
                      "Belum Melakukan Pembayaran"}
                    {dataAdmissionRegistration.invoice !== "" &&
                      "Proses Pengecekan Admin"}
                  </>
                )}
              </>
            )}
            {step == 2 && (
              <>
                {status == "Dalam Proses" && (
                  <>
                    {dataAdmissionRegistration.applicant === null &&
                      ((user?.parents?.length !== 3 && "Data Belum Lengkap") ||
                        (dataAdmissionRegistration.statements === null &&
                          "Data Belum Lengkap") ||
                        (dataAdmissionRegistration.additionalFiles === null &&
                          "Data Belum Lengkap"))}

                    {dataAdmissionRegistration.applicant !== null &&
                      ((user?.parents?.length === 3 &&
                        "Proses Pengecekan Admin") ||
                        (dataAdmissionRegistration.statements !== null &&
                          "Proses Pengecekan Admin") ||
                        (dataAdmissionRegistration.additionalFiles !== null &&
                          "Proses Pengecekan Admin"))}
                  </>
                )}
              </>
            )}
            {step == 3 && (
              <>
                {status == "Dalam Proses" && (
                  <>
                    {dataAdmissionRegistration.testResult !== null &&
                      "Proses Pengecekan Admin"}
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
                      "Belum Melakukan Pembayaran"}
                    {dataAdmissionRegistration.payments?.length != 0 &&
                      "Proses Pengecekan Admin"}
                  </>
                )}
              </>
            )}
            {status == "Belum Mulai" && (
              <FaRegPauseCircle className="ml-2 text-xl" />
            )}
            {status == "Dalam Proses" && (
              <FaRegArrowAltCircleRight className="ml-2 text-xl" />
            )}
            {status == "Berhasil" && (
              <FaRegCheckCircle className="ml-2 text-xl" />
            )}
            {status == "Gagal" && <FaRegTimesCircle className="ml-2 text-xl" />}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoTahapanPMB;
