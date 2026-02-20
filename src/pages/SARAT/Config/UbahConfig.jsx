import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateConfig } from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function UbahConfig() {
  const location = useLocation();
  const path = "/admin/config";
  const [late_hour, setlate_hour] = useState(location.state.late_hour);
  const [start_pre_test, setstart_pre_test] = useState(
    location.state.start_pre_test,
  );
  const [end_pre_test, setend_pre_test] = useState(location.state.end_pre_test);
  const [day_pre_test, setday_pre_test] = useState(location.state.day_pre_test);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  const navigateConfig = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      late_hour: late_hour,
      start_pre_test: start_pre_test,
      end_pre_test: end_pre_test,
      day_pre_test: day_pre_test, // ← add this
    };

    if (
      late_hour === "" ||
      start_pre_test === "" ||
      end_pre_test === "" ||
      day_pre_test === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      updateConfig(navigateConfig, data, setIsLoading);
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Config SARAT"
        navPrev={path}
        at="Edit Config"
        title="Edit Config"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <p className="text-[24px] font-bold text-merah">Form Edit Pertanyaan</p>
        <article>
          <br />
          <TextInput
            label="Jam Telat"
            type="text"
            onChange={(e) => setlate_hour(e.target.value)}
            value={late_hour}
            required={true}
          />
          <TextInput
            label="Jam Mulai Pre-Test"
            type="text"
            onChange={(e) => setstart_pre_test(e.target.value)}
            value={start_pre_test}
            required={true}
          />
          <TextInput
            label="Jam Selesai Pre-Test"
            type="text"
            onChange={(e) => setend_pre_test(e.target.value)}
            value={end_pre_test}
            required={true}
          />
          <TextInput
            label="Tanggal Pre-Test"
            type="date"
            onChange={(e) => setday_pre_test(e.target.value)}
            value={day_pre_test}
            required={true}
          />
          <br />
          <div className="btn-form mr-7 flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateConfig}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
