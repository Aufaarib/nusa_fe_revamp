import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Header } from "../../components";
import {
  AlertFiles,
  AlertMessage,
  AlertStatusSuccess,
} from "../../components/ModalPopUp";
import { useStateContext } from "../../contexts/ContextProvider";
import { FileUpload } from "../../components/FileUpload";

const BerkasPendaftaran = () => {
  const token = localStorage.getItem("TOKEN");
  const regNumber = localStorage.getItem("REG_NUMBER");
  const SUBMIT_URL = `/admission/registration/${regNumber}/additionalFile`;
  const uploaderRef = useRef(null);
  const { isLoading, setIsLoading, dataAdmissionRegistration } =
    useStateContext();
  const [filePasPhoto, setPasPhoto] = useState(null);
  const [fileKk, setFileKk] = useState(null);
  const [fileAkte, setFileAkte] = useState(null);
  const [fileRapor, setFileRapor] = useState(null);
  const path = "/pmb/tahapan-pmb";

  const navigateTahapan = () => {
    window.location.href = path;
  };

  const handleFileUpload = () => {
    if (
      fileRapor !== null ||
      fileAkte !== null ||
      fileKk !== null ||
      filePasPhoto !== null
    ) {
      const rapor = fileRapor;
      const akte = fileAkte;
      const kk = fileKk;
      const pasPhoto = filePasPhoto;
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
        navPrev={path}
        at="Berkas Pendaftaran"
        title="Form Berkas Pendaftaran"
      />

      {dataAdmissionRegistration.additionalFiles?.length === 0 ? (
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
              <FileUpload
                setFilesData={setFileAkte}
                filesData={fileAkte}
                fileInputId="fileInput1"
              />
              <div className="flex justify-between">
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
              <FileUpload
                setFilesData={setFileKk}
                filesData={fileKk}
                fileInputId="fileInput2"
              />
              <div className="flex justify-between">
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
              <FileUpload
                setFilesData={setFileRapor}
                filesData={fileRapor}
                fileInputId="fileInput3"
              />
              <div className="flex justify-between">
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
              <FileUpload
                setFilesData={setPasPhoto}
                filesData={filePasPhoto}
                fileInputId="fileInput4"
              />
              <div className="flex justify-between">
                <small className=" text-gray-400">
                  <i>Ukuran Maksimal 10 MB</i>
                </small>
              </div>
            </section>
          </div>
          <button
            type="button"
            className="btn-merah"
            onClick={handleFileUpload}
          >
            {isLoading ? (
              <CgSpinner className="mr-2 text-xl animate-spin" />
            ) : (
              <AiOutlineSave className="mr-2 text-2xl" />
            )}
            Kirim
          </button>
        </article>
      ) : (
        <article>
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Berkas Pendaftaran Tersimpan</h1>
            {/* <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p> */}
          </section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              padding: "20px",
            }}
          >
            {dataAdmissionRegistration.additionalFiles?.map((data) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <div>
                  <button
                    title="Tampil Bukti Pembayaran"
                    onClick={() => {
                      AlertFiles(data.file);
                    }}
                  >
                    <img
                      src={process.env.REACT_APP_BASE_STATIC_FILE + data.file}
                      width="200px"
                      height="200px"
                    ></img>
                  </button>
                </div>
                <label style={{ fontWeight: "bold" }} className="capitalize">
                  {data.label}
                </label>
              </div>
            ))}
          </div>
        </article>
      )}
      <section className="flex justify-start">
        <Link
          to={"/pmb/form-pernyataan"}
          className="bg-transparent shadow-none w-auto btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Halaman Pernyataan
        </Link>
      </section>
    </>
  );
};
export default BerkasPendaftaran;
