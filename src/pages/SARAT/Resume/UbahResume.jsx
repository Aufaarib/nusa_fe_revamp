import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSession } from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function UbahResume() {
  const location = useLocation();
  const path = "/admin/list-resume";
  const [fields, setFields] = useState(location.state.details);
  const [name, setName] = useState(location.state.resumeName);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  const navigateListResume = () => {
    navigate(path);
  };

  console.log("resumename === ", location.state.resumeName);
  console.log("resumeid === ", location.state.academicYearId);
  console.log("resumeid === ", location.state.details);

  const postData = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      academic_year_id: location.state.academicYearId,
      details: fields,
    };

    if (name === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateSession(location.state.resumeId, setSts, navigateListResume, data);
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Resume"
        navPrev={path}
        at="Edit Nama Resume"
        title="Edit Nama Resume"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <p className="text-[24px] font-bold text-merah">
          Form Edit Nama Resume
        </p>
        <article>
          <br />
          <TextInput
            label="Nama Resume"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
          />
          <br />

          <div className="btn-form mr-7">
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
              onClick={navigateListResume}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
