import { useState, useEffect, useRef } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { FiAlertTriangle } from "react-icons/fi";
import { AiFillFileText, AiOutlineSave } from "react-icons/ai";
import FormBerkasPendaftaran from "../../components/FormBerkasPendaftaran";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { FileUpload } from "../../components/FileUpload";
import { MdVerified } from "react-icons/md";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { CgAirplane, CgSpinner } from "react-icons/cg";
import { BsChevronLeft } from "react-icons/bs";
import {
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
  AlertUploadInvoiceFailed,
  AlertUploadInvoiceSuccess,
} from "../../components/ModalPopUp";
import { DropdownDatePickers } from "../../components/Dropdown";
import TextInput from "../../components/TextInput";

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

  const [fileInvoice, setFileInvoice] = useState(null);
  const uploaderRef = useRef(null);
  const [jumlah, setJumlah] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [metode, setMetode] = useState(null);
  const [filesData, setFilesData] = useState(null);

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
    // You can perform any custom actions after a successful upload if needed
    console.log("File uploaded successfully!", args);
    setFilesData(args);
  };

  // Function to handle file upload to the API using Axios
  const handleFileUpload = () => {
    // Replace 'your_api_base_url' with the base URL of your API
    // const formData = new FormData();
    // formData.append("file", filesData.file.rawFile);
    const paymentRecipt = filesData.file.rawFile;
    const amount = parseInt(jumlah.replace(/\./g, ""), 10);
    const paymentDatetime = new Date(tanggal).toISOString();
    const paymentMethod = metode;

    // const formData = new FormData();
    // formData.append("invoice", file);
    // console.log("GG === ", formData);

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
        // Handle success response if needed
        console.log("File uploaded successfully!", response);
        AlertUploadInvoiceSuccess();
      })
      .catch((error) => {
        // Handle error response if needed
        console.error("Error uploading file:", error);
        AlertUploadInvoiceFailed();
      });
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
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
      <div className="grid mt-3 xs:grid-cols-1 gap-7">
        {/* COL 1 */}
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
              marginTop: "20px",
              marginLeft: "290px",
              marginRight: "316px",
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
              allowedExtensions=".png"
              accept=".png"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !fileInvoice ? "Unggah Bukti Transfer" : "Ganti Berkas",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png</i>
            </small>
          </div>
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
            <CgAirplane className="mr-2 text-2xl" />
          )}
          Kirim
        </button>

        <div className="flex justify-end w-full">
          <Link
            to={"/pmb/tahapan-pmb"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali Ke
            Halaman Tahapan PMB
          </Link>

          {/* <Link to={"/berkas-pendaftaran"} className="w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap">
              Selanjutnya <BsChevronRight className='text-xl ml-2 mt-0.5' />
            </Link> */}
        </div>
      </section>
    </article>
  );
};

export default BerkasPembayaranBiayaPendidikan;
