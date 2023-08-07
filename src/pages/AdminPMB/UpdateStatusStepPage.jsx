import { useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { DropdownValidasiStep } from "../../components/Dropdown";
import TextInput from "../../components/TextInput";
import { updateAdmissionSteps } from "../../api/Registrasi";
import {
  AlertStatusFailed,
  AlertStatusValidatePayment,
} from "../../components/ModalPopUp";

const UpdateStatusStepPage = () => {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const code = localStorage.getItem("REG_NUMBER");
  const fetched = location?.state?.fetched;

  const UpdateConfirm = () => {
    if (status === "" || note === "") {
      AlertStatusFailed("Input Tidak Lengkap", "Tutup");
    } else {
      AlertStatusValidatePayment(AcceptStep, fetched);
    }
  };
  const AcceptStep = (step) => {
    updateAdmissionSteps(setSts, code, step, status, note);
    navigateRegistrationDetails();
  };

  const navigateRegistrationDetails = () => {
    navigate("/admin/list-detail-data-registrasi", {
      state: {
        fetched: fetched,
      },
    });
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
      <div style={{ marginTop: "50px" }}>
        <section>
          <>
            <DropdownValidasiStep
              label="Status"
              required={true}
              isClearable={true}
              defaultValue={status}
              isSearchable={false}
              onChange={(e) => setStatus(e.value)}
            />
            <TextInput
              label="Note"
              type="textarea"
              id="group"
              name="code"
              onChange={(e) => setNote(e.target.value)}
              required={true}
            />
          </>
        </section>
        <div className="btn-form">
          <button
            type="button"
            className="w-auto btn-merah flex justify-center mb-5"
            onClick={() => UpdateConfirm()}
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
export default UpdateStatusStepPage;
