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
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { BsChevronLeft } from "react-icons/bs";
import {
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../../components/ModalPopUp";

const BerkasPembayaran = () => {
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const domain = process.env.REACT_APP_BASE_URL;

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
    saveUrl: domain + `/admission/registration/${regNumber}/invoice`,
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
  };
  function onRemoveFile(args) {
    args.postRawFile = false;
  }
  function onFileUpload(args) {
    console.log("UPLOADING..");
    // args.customFormData = [{ id: documents[indexMurid].id }];
    args.currentRequest.setRequestHeader("Authorization", token);
  }
  function onSuccess(args) {
    getDocumentsData();
    console.log("SUCCESS");
  }

  let minFileSize = 1000;
  let maxFileSize = 1000000;

  // useEffect(() => {
  //   L10n.load({
  //     "id-BAHASA": {
  //       uploader: {
  //         Browse: "Cari Berkas",
  //         Clear: "Bersihkan",
  //         Upload: "Unggah",
  //         cancel: "Batal",
  //         delete: "Hapus Berkas",
  //         dropFilesHint: "atau taruh Berkas disini",
  //         inProgress: "Mengunduh",
  //         invalidFileType: "Tipe berkas tidak diperbolehkan",
  //         invalidMaxFileSize: `Ukuran berkas melebihi ${
  //           maxFileSize * 0.000001
  //         } MB`,
  //         invalidMinFileSize: `Ukuran file terlalu kecil! Harap unggah file dengan ukuran minimal ${
  //           maxFileSize * 0.000001
  //         } KB`,
  //         readyToUploadMessage: "Siap mengunggah",
  //         remove: "Hapus",
  //         removedFailedMessage: "Berkas tidak dapat dihapus",
  //         removedSuccessMessage: "Berkas berhasil dihapus",
  //         uploadFailedMessage: "Gagal mengunggah berkas",
  //         uploadSuccessMessage: "Berkas berhasil diunggah",
  //       },
  //     },
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`/admission/registration/${regNumber}/invoice`, null, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then(() => {
        setIsLoading(false);
        AlertStatusUpdateSuccess();
      })
      .catch(() => {
        setIsLoading(false);
        AlertStatusUpdateFailed();
      });
  };

  // function getExtension(filename) {
  //   return filename.split(".").pop();
  // }

  // let akte_kelahiran = documents[indexMurid].akte_kelahiran;
  // let kartu_keluarga = documents[indexMurid].kartu_keluarga;
  // let rapor = documents[indexMurid].rapor;
  // let foto = documents[indexMurid].foto;

  // let name_akte_kelahiran = akte_kelahiran.replace(/\.[^/.]+$/, "");
  // let name_kartu_keluarga = kartu_keluarga.replace(/\.[^/.]+$/, "");
  // let name_rapor = rapor.replace(/\.[^/.]+$/, "");
  // let name_foto = foto.replace(/\.[^/.]+$/, "");

  // let foto_extension = getExtension(documents[indexMurid].foto);

  return (
    <article>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Berkas Pembayaran"
        title="Form Berkas Pembayaran"
      />
      <div className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7">
        {/* COL 1 */}
        <section>
          <label htmlFor="invoice" className="block mt-4 mb-1">
            Upload Bukti Pembayaran{" "}
          </label>
          {/* <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
            Akte Kelahiran{" "}
            {!akte_kelahiran ? (
              <span className="ml-1 text-merah">*</span>
            ) : (
              <span>
                <MdVerified className="inline-block text-md text-green-600 ml-0.5 mb-1" />{" "}
                <strong className="text-green-600 text">Sudah Diunggah</strong>
              </span>
            )}
          </label> */}
          {/* <div className="flex items-center justify-center e-upload e-control-wrapper e-lib e-keyboard h-14">
              THUMBNAIL
            </div> */}
          <UploaderComponent
            id="invoice"
            type="file"
            ref={(scope) => {
              uploadObj = scope;
            }}
            asyncSettings={asyncSettings}
            removing={onRemoveFile.bind(this)}
            uploading={onFileUpload.bind(this)}
            success={onSuccess.bind(this)}
            locale="id-BAHASA"
            allowedExtensions=".png"
            minFileSize={minFileSize}
            maxFileSize={maxFileSize}
            multiple={false}
            buttons="Unggah Berkas"
          >
            {/* <FilesDirective>
								<UploadedFilesDirective name={akte_kelahiran} size={25000} type=".pdf"></UploadedFilesDirective>
							</FilesDirective> */}
          </UploaderComponent>
          <small className=" text-gray-400">
            <i>Jenis berkas: .pdf</i>
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
            to={"/pmb/tahapan-pmb"}
            className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
          </Link>

          {/* <Link to={"/berkas-pendaftaran"} className="w-auto pr-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap">
              Selanjutnya <BsChevronRight className='text-xl ml-2 mt-0.5' />
            </Link> */}
        </div>
      </section>
    </article>
  );
};

export default BerkasPembayaran;
