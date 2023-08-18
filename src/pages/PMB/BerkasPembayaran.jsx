import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Header } from "../../components";
import {
  AlertMessage,
  AlertStatusFailed,
  AlertStatusSuccess,
  AlertUploadInvoiceFailed,
} from "../../components/ModalPopUp";

const BerkasPembayaran = () => {
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const SUBMIT_URL = `/admission/registration/${regNumber}/invoice`;
  const [isLoading, setIsLoading] = useState(false);
  const [fileInvoice, setFileInvoice] = useState(null);
  const uploaderRef = useRef(null);
  const [filesData, setFilesData] = useState(null);
  const navigate = useNavigate();
  const path = "/pmb/tahapan-pmb";

  // Define your asyncSettings for the UploaderComponent (modify this as needed)
  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  // Define your minFileSize and maxFileSize (modify these as needed)
  const minFileSize = 0;
  const maxFileSize = 5000000; // 5 MB (you can modify this value)

  // Function to handle removing a file
  const onRemoveFile = (args) => {
    // setFileInvoice(null);
  };

  // Function to handle uploading a file
  const onFileUpload = (args) => {
    // You can perform any custom actions before the file upload starts if needed
  };

  // Function to handle upload success
  const onSuccess = (args) => {
    setFilesData(args);
  };

  // Function to handle file upload to the API using Axios
  const handleFileUpload = () => {
    if (filesData === null) {
      AlertMessage("File Kosong", "Mohon Upload File Terlebih Dahulu", "Tutup");
    }

    const invoice = filesData.file.rawFile;
    axios
      .post(
        SUBMIT_URL,
        {
          invoice,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      .then(() => {
        AlertStatusSuccess(
          path,
          "Berhasil",
          "Kembali Ke Halaman Tahapan PMB",
          "success",
          "Unggah Bukti Pembayaran Pendaftaran Berhasil"
        );
      })
      .catch(() => {
        AlertStatusFailed(
          "Gagal",
          "Coba Lagi",
          "error",
          "Unggah Bukti Pembayaran Gagal"
        );
      });
  };

  return (
    <article>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Bukti Pembayaran"
        title="Form Bukti Pembayaran"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginBottom: "70px",
        }}
      >
        {/* COL 1 */}
        <section>
          <label htmlFor="invoice" className="block mt-4 mb-1">
            Upload Bukti Pembayaran{" "}
          </label>
          <UploaderComponent
            id="invoice"
            type="file"
            ref={uploaderRef}
            asyncSettings={asyncSettings}
            removing={onRemoveFile}
            uploading={onFileUpload}
            success={onSuccess.bind(this)}
            locale="id-BAHASA"
            allowedExtensions=".png"
            accept=".png"
            minFileSize={minFileSize}
            maxFileSize={maxFileSize}
            multiple={false}
            buttons={{
              browse: !fileInvoice ? "Pilih File" : "Ganti Berkas",
            }}
          />
          <small className=" text-gray-400">
            <i>Jenis berkas: .png</i>
          </small>
        </section>
      </div>

      <button
        type="button"
        className="w-auto btn-merah"
        onClick={handleFileUpload}
      >
        {isLoading ? (
          <CgSpinner className="mr-2 text-xl animate-spin" />
        ) : (
          <AiOutlineSave className="mr-2 text-2xl" />
        )}
        Unggah
      </button>
      <section className="flex mt-1 justify-start">
        <Link
          to={path}
          className="bg-transparent shadow-none w-auto btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Halaman Tahapan PMB
        </Link>
      </section>
    </article>
  );
};

export default BerkasPembayaran;
