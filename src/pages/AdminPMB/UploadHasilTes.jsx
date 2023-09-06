import { useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadHasilTest } from "../../api/Registrasi";
import { Header } from "../../components";
import { AlertEmpty, AlertMessage } from "../../components/ModalPopUp";
import TextInput from "../../components/TextInput";
import { DropdownPendaftaran } from "../../components/Dropdown";

const UploadHasilTes = () => {
  const [status, setStatus] = useState("");
  const [isPasseds, setIsPassed] = useState();
  const [sts, setSts] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const code = localStorage.getItem("REG_NUMBER");
  const fetched = location?.state?.fetched;

  const navigateRegistrationDetails = () => {
    navigate("/admin/list-detail-data-registrasi", {
      state: {
        fetched: fetched,
      },
    });
  };

  const uploadTestResults = () => {
    if (isPasseds === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      const isPassed = parseInt(isPasseds);
      console.log("sdsd === ", isPassed);
      uploadHasilTest(isPassed, navigateRegistrationDetails);
    }
  };

  const options = [
    {
      value: 1,
      label: "Lulus",
    },
    {
      value: 0,
      label: "Tidak Lulus",
    },
  ];

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at={code}
        title={code}
      />
      <div style={{ padding: "44px 104px 0" }}>
        <section>
          <>
            <DropdownPendaftaran
              label="Status Kelulusan"
              required={true}
              isClearable={true}
              isSearchable={false}
              options={options}
              onChange={(e) => setIsPassed(e.value)}
            />
            {/* <TextInput
              label="Status Kelulusan"
              type="number"
              id="group"
              name="code"
              onChange={(e) => setNilai(e.target.value)}
              required={true}
            /> */}
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
