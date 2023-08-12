import { useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { DropdownValidasiStep } from "../../components/Dropdown";
import TextInput from "../../components/TextInput";
import { updateAdmissionSteps, uploadHasilTest } from "../../api/Registrasi";
import { AlertStatusValidatePayment } from "../../components/ModalPopUp";

const UploadHasilTes = () => {
  const [status, setStatus] = useState("");
  const [nilai, setNilai] = useState();
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const code = localStorage.getItem("REG_NUMBER");
  const fetched = location?.state?.fetched;

  console.log("FETCHED === ", fetched);

  // const AcceptStep = (step) => {
  //   updateAdmissionSteps(setSts, code, step, status, note);
  //   navigateRegistrationDetails();
  // };

  const navigateRegistrationDetails = () => {
    navigate("/admin/list-detail-data-registrasi", {
      state: {
        fetched: fetched,
      },
    });
  };

  const uploadTestResults = () => {
    const score = parseInt(nilai);
    uploadHasilTest(score, navigateRegistrationDetails());
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at={code}
        title={code}
      />
      <div style={{ padding: "44px 154px 0" }}>
        <section>
          <>
            <TextInput
              label="Bobot Nilai"
              type="number"
              id="group"
              name="code"
              onChange={(e) => setNilai(e.target.value)}
              required={true}
            />
          </>
        </section>
        <div className="btn-form">
          <button
            type="button"
            className="w-auto btn-merah flex justify-center mb-5"
            onClick={() => uploadTestResults()}
          >
            Kirim
          </button>
        </div>
      </div>
      <div className="flex justify-start w-full">
        <button
          onClick={() => navigateRegistrationDetails()}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-merah hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </button>
      </div>
    </>
  );
};
export default UploadHasilTes;
