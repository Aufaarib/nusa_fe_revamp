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
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../../components/ModalPopUp";
// import { L10n } from "@syncfusion/ej2-base";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SUBMIT_URL = "/admission/registration/REG00038/additionalFile";

const BerkasPendaftaran = () => {
  const token = localStorage.getItem("TOKEN");
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
  const [isLoading, setIsLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState({});
  const [fileRapor, setFileRapor] = useState([]);
  const [fileKk, setFileKk] = useState([]);
  const [fileAkte, setFileAkte] = useState([]);
  const [fileIjazah, setFileIjazah] = useState([]);

  const navigate = useNavigate();
  const path = "/pmb/tahapan-pmb";

  // Uploader component
  let uploadObj;
  let asyncSettings;
  let dropContainerRef;
  let dropContainerEle;
  dropContainerEle = null;
  dropContainerRef = (element) => {
    dropContainerEle = element;
  };
  asyncSettings = {
    saveUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
  };
  function onRemoveFile(args) {
    args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..");
    // args.customFormData = [{ id: fileUpload.id }];
    args.currentRequest.setRequestHeader("Authorization", token);
    setFileUpload(args);
    console.log(args);
  }
  function onSuccess() {
    getDocumentsData();
    console.log("SUCCESS");
  }

  let minFileSize = 1000;
  let maxFileSize = 1000000;

  const handleSubmit = async (e) => {
    let params = {
      rapor: fileRapor,
      kartu_keluarga: fileKk,
      akte_kelahiran: fileAkte,
      ijazah: fileIjazah,
    };
    e.preventDefault();
    setIsLoading(true);
    console.log("file untuk upload", "=> ", params);

    const headers = {
      "Content-Type": "multipart/form-data",
      authorization: token,
    };
    axios
      .post(SUBMIT_URL, params, { headers })
      .then(() => {
        setIsLoading(false);
        AlertStatusUpdateSuccess();
      })
      .catch(() => {
        setIsLoading(false);
        AlertStatusUpdateFailed();
      });
  };

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  let akte_kelahiran = fileUpload.akte_kelahiran;
  let kartu_keluarga = fileUpload.kartu_keluarga;
  let rapor = fileUpload.rapor;
  let foto = fileUpload.foto;

  return (
    <>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Berkas Pendaftaran"
        title="Form Berkas Pendaftaran"
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
              id="akte_kelahiran"
              type="file"
              ref={(scope) => {
                setFileAkte(scope?.filesData[0]);
              }}
              asyncSettings={asyncSettings}
              removing={onRemoveFile.bind(this)}
              uploading={onFileUpload.bind(this)}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".pdf"
              accept=".pdf"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !akte_kelahiran ? "Unggah Berkas" : "Ganti Berkas",
              }}
            >
              {/* <FilesDirective>
								<UploadedFilesDirective name={akte_kelahiran} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
            </UploaderComponent>
            <small className=" text-gray-400">
              <i>Jenis berkas: .pdf</i>
            </small>
          </section>

          {/* COL 2 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Kartu Keluarga{" "}
              {/* {!kartu_keluarga ? (
                <span className="ml-1 text-merah">*</span>
              ) : (
                <span>
                  <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
                </span>
              )} */}
            </label>
            <UploaderComponent
              id="kartu_keluarga"
              type="file"
              ref={(scope) => {
                setFileKk(scope?.filesData[0]);
              }}
              asyncSettings={asyncSettings}
              removing={onRemoveFile.bind(this)}
              uploading={onFileUpload.bind(this)}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".pdf"
              accept=".pdf"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !kartu_keluarga ? "Unggah Berkas" : "Ganti Berkas",
              }}
            >
              {/* <FilesDirective>
								<UploadedFilesDirective name={kartu_keluarga} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
            </UploaderComponent>
            <small className=" text-gray-400">
              <i>Jenis berkas: .pdf</i>
            </small>
          </section>

          {/* COL 3 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Rapor{" "}
              {!rapor ? (
                <span className="ml-1 text-merah">*</span>
              ) : (
                <span>
                  <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
                </span>
              )}
            </label>
            <UploaderComponent
              id="rapor"
              type="file"
              ref={(scope) => {
                setFileRapor(scope?.filesData[0]);
              }}
              asyncSettings={asyncSettings}
              removing={onRemoveFile.bind(this)}
              uploading={onFileUpload.bind(this)}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".pdf"
              accept=".pdf"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !rapor ? "Unggah Berkas" : "Ganti Berkas",
              }}
            >
              {/* <FilesDirective>
								<UploadedFilesDirective name={rapor} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
            </UploaderComponent>
            <small className=" text-gray-400">
              <i>Jenis berkas: .pdf</i>
            </small>
          </section>

          {/* COL 4 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Pas Foto 3x4{" "}
              {!foto ? (
                <span className="ml-1 text-merah">*</span>
              ) : (
                <span>
                  <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                  <strong className="text-green-600 text">
                    Sudah Diunggah
                  </strong>
                </span>
              )}
            </label>
            <UploaderComponent
              id="foto"
              type="file"
              ref={(scope) => {
                setFileIjazah(scope?.filesData[0]);
              }}
              asyncSettings={asyncSettings}
              removing={onRemoveFile.bind(this)}
              uploading={onFileUpload.bind(this)}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".jpg,.png,.jpeg"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{ browse: !foto ? "Unggah Berkas" : "Ganti Berkas" }}
            >
              {/* <FilesDirective>
								<UploadedFilesDirective name={name_foto} size={25000} type={foto_extension}></UploadedFilesDirective>
							</FilesDirective> */}
            </UploaderComponent>
            <small className=" text-gray-400">
              <i>Jenis berkas: .jpg, .png</i>
            </small>
          </section>
        </div>

        <section className="flex mt-12">
          <button
            type="button"
            className="w-auto btn-merah"
            onClick={handleSubmit}
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
