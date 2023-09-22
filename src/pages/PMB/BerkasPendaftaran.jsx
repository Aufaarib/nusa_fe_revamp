import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Header } from "../../components";
import { AlertMessage, AlertStatusSuccess } from "../../components/ModalPopUp";
import { useStateContext } from "../../contexts/ContextProvider";

const BerkasPendaftaran = () => {
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const SUBMIT_URL = `/admission/registration/${regNumber}/additionalFile`;
  const uploaderRef = useRef(null);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();
  const [filePasPhoto, setPasPhoto] = useState(null);
  const [fileKk, setFileKk] = useState(null);
  const [fileAkte, setFileAkte] = useState(null);
  const [fileRapor, setFileRapor] = useState(null);
  const path = "/pmb/tahapan-pmb";

  const navigateTahapan = () => {
    window.location.href = path;
  };

  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  const onRemoveFile = (args) => {
    // setFileInvoice(null);
  };

  const onFileUpload = (args) => {
    // You can perform any custom actions before the file upload starts if needed
  };

  const onAkte = (args) => {
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

  const handleFileUpload = () => {
    if (
      fileRapor !== null ||
      fileAkte !== null ||
      fileKk !== null ||
      filePasPhoto !== null
    ) {
      const rapor = fileRapor.file.rawFile;
      const akte = fileAkte.file.rawFile;
      const kk = fileKk.file.rawFile;
      const pasPhoto = filePasPhoto.file.rawFile;
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
        .then(() => {
          setIsLoading(false);
          AlertStatusSuccess(
            navigateTahapan,
            "Berhasil",
            "Tutup",
            "success",
            "Upload Berkas Pendaftaran Berhasil"
          );
        })
        .catch((error) => {
          setIsLoading(false);
          AlertMessage("Gagal", "Silahkan Coba Lagi", "Coba Lagi", "error");
        });
    } else {
      setIsLoading(false);
      AlertMessage(
        "Gagal",
        "Berkas Pendaftaran Tidak Lengkap",
        "Coba Lagi",
        "warning"
      );
    }
  };

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
        <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
          <h1 className="mt-3 text-merah">Pendataan Berkas Pendaftaran</h1>
          <p className="text-xs">
            Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
            <span className="text-merah">*</span>) wajib diisi.
          </p>
        </section>
        <div className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 gap-7">
          {/* COL 1 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Akte Kelahiran <span className="text-merah">*</span>
            </label>
            <UploaderComponent
              id="invoice"
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onAkte.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={0}
              maxFileSize={100000}
              multiple={false}
              buttons={{
                browse: !fileAkte ? "Upload File" : "Ganti File",
              }}
            />
            <div className="flex justify-between">
              <small className=" text-gray-400">
                <i>Jenis Berkas: .png / .jpg</i>
              </small>
              <small className=" text-gray-400">
                <i>Ukuran Maksimal 10 MB</i>
              </small>
            </div>
          </section>

          {/* COL 2 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Kartu Keluarga <span className="text-merah">*</span>
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
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={0}
              maxFileSize={100000}
              multiple={false}
              buttons={{
                browse: !fileKk ? "Upload File" : "Ganti File",
              }}
            />
            <div className="flex justify-between">
              <small className=" text-gray-400">
                <i>Jenis Berkas: .png / .jpg</i>
              </small>
              <small className=" text-gray-400">
                <i>Ukuran Maksimal 10 MB</i>
              </small>
            </div>
          </section>

          {/* COL 3 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Rapor <span className="text-merah">*</span>
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
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={0}
              maxFileSize={100000}
              multiple={false}
              buttons={{
                browse: !fileRapor ? "Upload File" : "Ganti File",
              }}
            />
            <div className="flex justify-between">
              <small className=" text-gray-400">
                <i>Jenis Berkas: .png / .jpg</i>
              </small>
              <small className=" text-gray-400">
                <i>Ukuran Maksimal 10 MB</i>
              </small>
            </div>
          </section>

          {/* COL 4 */}
          <section>
            <label htmlFor="akte_kelahiran" className="block mt-4 mb-1">
              Pas Foto 3x4 <span className="text-merah">*</span>
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
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={0}
              maxFileSize={100000}
              multiple={false}
              buttons={{
                browse: !filePasPhoto ? "Upload File" : "Ganti File",
              }}
            />
            <div className="flex justify-between">
              <small className=" text-gray-400">
                <i>Jenis Berkas: .png / .jpg</i>
              </small>
              <small className=" text-gray-400">
                <i>Ukuran Maksimal 10 MB</i>
              </small>
            </div>
          </section>
        </div>

        <button type="button" className="btn-merah" onClick={handleFileUpload}>
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
          Kirim
        </button>
        <section className="flex justify-start">
          <Link
            to={"/pmb/form-pernyataan"}
            className="bg-transparent shadow-none w-auto btn-navigate hover:bg-transparent text-merah hover:text-gelap"
          >
            <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Halaman Pernyataan
          </Link>
        </section>
      </article>
    </>
  );
};
export default BerkasPendaftaran;
