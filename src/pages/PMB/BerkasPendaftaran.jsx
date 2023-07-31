import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { BsChevronLeft } from "react-icons/bs";
import {
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../../components/ModalPopUp";
import { useRef } from "react";
// import { L10n } from "@syncfusion/ej2-base";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SUBMIT_URL = "/admission/registration/REG00038/additionalFile";

const BerkasPendaftaran = () => {
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const SUBMIT_URL = `/admission/registration/${regNumber}/additionalFile`;
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
  const [filePasPhoto, setPasPhoto] = useState(null);
  const [fileKk, setFileKk] = useState(null);
  const [fileAkte, setFileAkte] = useState(null);
  const [fileRapor, setFileRapor] = useState(null);

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
  const onAkte = (args) => {
    // You can perform any custom actions after a successful upload if needed
    console.log("File uploaded successfully!", args);
    setFileAkte(args);
  };

  const onRapor = (args) => {
    // You can perform any custom actions after a successful upload if needed
    console.log("File uploaded successfully!", args);
    setFileRapor(args);
  };

  const onKK = (args) => {
    // You can perform any custom actions after a successful upload if needed
    console.log("File uploaded successfully!", args);
    setFileKk(args);
  };

  const onPasPhoto = (args) => {
    // You can perform any custom actions after a successful upload if needed
    console.log("File uploaded successfully!", args);
    setPasPhoto(args);
  };

  // Function to handle file upload to the API using Axios
  const handleFileUpload = () => {
    // Replace 'your_api_base_url' with the base URL of your API
    // const formData = new FormData();
    // formData.append("file", filesData.file.rawFile);
    const rapor = fileRapor.file.rawFile;
    const akte = fileAkte.file.rawFile;
    const kk = fileKk.file.rawFile;
    const pasPhoto = filePasPhoto.file.rawFile;

    console.log("FilesData:", rapor);

    // const formData = new FormData();
    // formData.append("invoice", file);
    // console.log("GG === ", formData);

    axios
      .post(
        SUBMIT_URL,
        {
          rapor,
          akte,
          kk,
          pasPhoto,
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
        AlertStatusTambahSuccess("/pmb/berkas-pendaftaran");
      })
      .catch((error) => {
        // Handle error response if needed
        console.error("Error uploading file:", error);
        AlertStatusTambahFailed();
      });
  };

  return (
    <>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Berkas Pembayaran"
        title="Form Berkas Pembayaran"
      />
      <article>
        <div className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7">
          {/* COL 1 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Akte Kelahiran{" "}
            </label>
            {/* <div className="flex items-center justify-center e-upload e-control-wrapper e-lib e-keyboard h-14">
              THUMBNAIL
            </div> */}
            <UploaderComponent
              id="invoice"
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onAkte.bind(this)}
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

          {/* COL 2 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Kartu Keluarga{" "}
            </label>
            <UploaderComponent
              id="invoice"
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onKK.bind(this)}
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

          {/* COL 3 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Rapor{" "}
            </label>
            <UploaderComponent
              id="invoice"
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onRapor.bind(this)}
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

          {/* COL 4 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Pas Foto 3x4{" "}
            </label>
            <UploaderComponent
              id="invoice"
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onPasPhoto.bind(this)}
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

          <div className="flex justify-end w-full">
            <Link
              to={"/pmb/form-pernyataan"}
              className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
            >
              <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Form
              Pernyataan
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};
export default BerkasPendaftaran;
