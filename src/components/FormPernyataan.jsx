import { useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import TextInput, { TextInputModal } from "./TextInput";

import { useStateContext } from "../contexts/ContextProvider";

import { getAdmissionAnswer, getAdmissionStatement } from "../api/Registrasi";
import Header from "./Header";
import {
  AlertMessage,
  AlertStatusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
} from "./ModalPopUp";

const FormPernyataan = ({ indexMurid }) => {
  const token = localStorage.getItem("TOKEN");
  const {
    isLoading,
    setIsLoading,
    errMsg,
    setErrMsg,
    parents,
    setParents,
    setSuccessMsg,
    openForm,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [admissionStatementData, setAdmissionStatement] = useState([]);
  const [admissionAnswerData, setAdmissionAnswer] = useState([]);
  const [sts, setSts] = useState("");
  const [stsStatement, setStsStatement] = useState("");
  const [stsAnswer, setStsAnswer] = useState("");
  const [formData, setFormData] = useState([]);
  const path = "/pmb/tahapan-pmb";

  const reload = () => {
    window.location.href = "/pmb/form-pernyataan";
  };

  const handleInputChange = (e, itemId) => {
    const value = e.currentTarget.value; // Retrieve the latest value
    const itemIndex = formData.findIndex((item) => item.statementId === itemId);
    console.log("JAWABAN === ", admissionAnswerData.length);

    if (itemIndex !== -1) {
      const updatedFormData = [...formData];
      updatedFormData[itemIndex] = { statementId: itemId, answer: value };
      setFormData(updatedFormData);
    } else {
      setFormData((prevData) => [
        ...prevData,
        { statementId: itemId, answer: value },
      ]);
    }
  };

  const fetchAdmissonStatement = async () => {
    getAdmissionStatement(setAdmissionStatement, setStsStatement);
  };

  const fetchAdmissonAnswer = async () => {
    getAdmissionAnswer(setAdmissionAnswer, setStsAnswer);
  };

  useEffect(() => {
    fetchAdmissonStatement();
    fetchAdmissonAnswer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regNumber = localStorage.getItem("REG_NUMBER");
    setIsLoading(true);

    const answers = formData.map((i) => ({
      statementId: i.statementId,
      answer: i.answer,
    }));

    axios
      .post(
        process.env.REACT_APP_BASE_URL +
          `/admission/registration/${regNumber}/statement`,
        {
          answers,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then(() => {
        setIsLoading(false);
        AlertStatusSuccess(
          reload,
          "Berhasil",
          "Tutup",
          "success",
          "Upload Data Pernyataan Berhasil"
        );
      })
      .catch(() => {
        setIsLoading(false);
        AlertMessage(
          "Gagal",
          "Upload Data Pernyataan Gagal",
          "Coba Lagi",
          "error"
        );
      });
  };

  return (
    <article>
      <Header
        home="PMB"
        prev="Tahapan"
        navePrev={path}
        at="Pernyataan Orang Tua"
        title="Form Pernyataan Orang Tua"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          // onSubmit={handleSubmit}
          style={{ display: "block", gap: "22px", padding: "20px" }}
        >
          <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
            <h1 className="mt-3 text-merah">Pernyataan</h1>
            {/* <p className="text-xs">
              Catatan : Untuk pertanyaan yang terdapat tanda bintang merah (
              <span className="text-merah">*</span>) wajib diisi.
            </p> */}
          </section>
          {/* COL 1 */}
          <section className="xs:col-span-3 lg:col-span-1 mt-5">
            {admissionAnswerData?.length == 0
              ? admissionStatementData.map((item) => (
                  <div className="mt-7" key={item.id}>
                    <TextInputModal
                      label={item.question}
                      type="textarea"
                      name="answers"
                      value={
                        (
                          formData.find(
                            (data) => data.statementId === item.id
                          ) || {}
                        ).answer || ""
                      }
                      onChange={(e) => handleInputChange(e, item.id)}
                      required={true}
                    />
                  </div>
                ))
              : admissionAnswerData.map((item) => (
                  <div className="mt-7" key={item.id}>
                    <TextInputModal
                      label={item.statement.question}
                      type="textarea"
                      name="answers"
                      // placeholder={item.answer}
                      defaultValue={item.answer}
                      disable={true}
                      required={true}
                    />
                  </div>
                ))}
          </section>
        </form>
      </div>
      {admissionAnswerData.length !== 0 && (
        <button className="btn-disabled">Pernyataan Telah Tersimpan</button>
      )}
      {admissionAnswerData.length == 0 && (
        <button className="btn-merah" onClick={handleSubmit}>
          {isLoading ? (
            <CgSpinner className="mr-2 text-xl animate-spin" />
          ) : (
            <AiOutlineSave className="mr-2 text-2xl" />
          )}
          Kirim
        </button>
      )}
      <section className="flex mt-1 gap-5 justify-center">
        <Link
          to={"/pmb/form-data-orang-tua-wali"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronLeft className="text-xl mr-7 mt-0.5" /> Pendataan Wali
        </Link>

        <Link
          to={"/pmb/berkas-pendaftaran"}
          className="bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          Berkas Pendaftaran{" "}
          <BsChevronRight className="text-xl sm:ml-3 lg:ml-7 mt-0.5" />
        </Link>
      </section>
    </article>
  );
};
export default FormPernyataan;
