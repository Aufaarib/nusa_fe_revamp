import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { Header } from "../../components";
import { DropdownDatePickers } from "../../components/Dropdown";
import {
  AlertMessage,
  AlertStatusSuccess,
  AlertUploadInvoiceFailed,
  AlertUploadInvoiceSuccess,
} from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";

const BerkasPembayaranBiayaPendidikan = () => {
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const SUBMIT_URL = `/admission/registration/${regNumber}/payment`;
  const domain = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const {
    documents,
    setDocuments,
    getDocumentsData,
    errMsg,
    setErrMsg,
    setSuccessMsg,
    formCheck,
    getFormCheck,
  } = useStateContext();

  const path = "/pmb/tahapan-pmb";

  const [fileInvoice, setFileInvoice] = useState(null);
  const uploaderRef = useRef(null);
  const [jumlah, setJumlah] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [metode, setMetode] = useState(null);
  const [filesData, setFilesData] = useState(null);

  const navigateTahapan = () => {
    window.location.href = path;
  };

  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  const minFileSize = 0;
  const maxFileSize = 5000000;

  const onRemoveFile = (args) => {};

  const onFileUpload = (args) => {};

  const onSuccess = (args) => {
    console.log("File uploaded successfully!", args);
    setFilesData(args);
  };

  const handleFileUpload = () => {
    const paymentRecipt = filesData.file.rawFile;
    const amount = parseInt(jumlah.replace(/\./g, ""), 10);
    const paymentDatetime = new Date(tanggal).toISOString();
    const paymentMethod = metode;

    axios
      .post(
        SUBMIT_URL,
        {
          amount,
          paymentDatetime,
          paymentMethod,
          paymentRecipt,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("File uploaded successfully!", response);
        AlertStatusSuccess(
          navigateTahapan,
          "Berhasil",
          "Kembali Ke Halaman Tahapan PMB",
          "success",
          "Unggah Bukti Pembayaran Biaya Pendidikan Berhasil"
        );
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        AlertMessage("Gagal", "Unggah Gagal", "Coba Lagi", "error");
      });
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, "");
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setJumlah(inputVal);
  };

  return (
    <article>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Bukti Pembayaran Biaya Pendidikan"
        title="Form Bukti Pembayaran Biaya Pendidikan"
      />
      <div>
        <section>
          <TextInput
            label="Metode Pembayaran"
            type="text"
            id="paymentMethod"
            onChange={(e) => setMetode(e.target.value)}
            value={metode}
            // placeholder={admissionParentsData.birthPlace}
            disable={false}
            required={true}
          />

          <TextInput
            label="Jumlah Transfer"
            type="text"
            id="amount"
            onChange={handleInputChange}
            value={jumlah}
            // placeholder={admissionParentsData.birthPlace}
            disable={false}
            required={true}
          />

          <DropdownDatePickers
            label="Tanggal Transaksi"
            id="paymentDatetime"
            value={tanggal}
            change={(e) => setTanggal(e.element.value)}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: "20px",
              width: "auto",
            }}
          >
            <UploaderComponent
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !fileInvoice ? "Unggah Bukti Transfer" : "Ganti Berkas",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png / .jpg </i>
            </small>
          </div>
        </section>
      </div>

      <button className="btn-merah" onClick={handleFileUpload}>
        {isLoading ? (
          <CgSpinner className="mr-2 text-xl animate-spin" />
        ) : (
          <AiOutlineSave className="mr-2 text-2xl" />
        )}
        Kirim
      </button>
      <section className="flex mt-1 gap-5 justify-left">
        <Link
          to={"/pmb/tahapan-pmb"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Halaman Tahapan PMB
        </Link>
      </section>
    </article>
  );
};

export default BerkasPembayaranBiayaPendidikan;
