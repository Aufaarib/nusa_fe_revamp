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

  const navigateListSteps = () => {
    navigate("/pmb/tahapan-pmb");
  };

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
          navigateListSteps,
          "Bukti Transfer Biaya Pendaftaran Berhasil Terupload",
          "Kembali Ke Halaman Tahapan PMB"
        );
      })
      .catch(() => {
        AlertStatusFailed("Upload Gagal", "Tutup");
      });
  };

  return (
    <article>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Bukti Pembayaran"
        title="Form Bukti Pembayaran"
      />
      <div className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7">
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
              browse: !fileInvoice ? "Unggah Berkas" : "Ganti Berkas",
            }}
          />
          <small className=" text-gray-400">
            <i>Jenis berkas: .png</i>
          </small>
        </section>
      </div>

      <section className="flex mt-12">
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
          Simpan
        </button>
      </section>
      <div className="flex justify-start w-full mt-8">
        <Link
          to={"/pmb/tahapan-pmb"}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali Ke
          Halaman Tahapan PMB
        </Link>
      </div>
    </article>
  );
};

export default BerkasPembayaran;
