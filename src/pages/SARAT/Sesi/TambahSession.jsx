import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSession } from "../../../api/Sarat";
import { Header } from "../../../components";
import { AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahSession() {
  const location = useLocation();
  const path = "/admin/list-sesi";
  const [fields, setFields] = useState(location.state.details);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  const handleFieldChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  // Function to add a new set of fields
  const addField = () => {
    setFields([...fields, { title: "", description: "" }]);
  };

  // Function to remove a set of fields
  const removeField = () => {
    const newFields = [...fields];
    newFields.pop();
    setFields(newFields);
  };

  const navigateListSession = () => {
    navigate(path, {
      state: {
        resume_id: location.state.resume_id,
        resume_name: location.state.resume_name,
        academicYearId: location.state.academicYearId,
      },
    });
  };

  const postData = (e) => {
    e.preventDefault();

    const data = {
      name: localStorage.getItem("RESUME_NAME"),
      academic_year_id: location.state.academicYearId,
      details: fields,
    };

    if (data.details.title === "" || data.details.description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateSession(
        localStorage.getItem("RESUME_ID"),
        setSts,
        navigateListSession,
        data
      );
    }
  };

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Daftar Sesi"
        navPrev={path}
        at="Edit Sesi"
        title="Edit Sesi"
      />

      <div style={{ padding: "40px 104px 0" }}>
        <p className="text-[24px] font-bold text-merah">Form Edit Sesi</p>
        <article>
          {fields.map((field, index) => (
            <div key={index}>
              <br />
              <TextInput
                label="Nama Sesi"
                type="text"
                onChange={(e) =>
                  handleFieldChange(index, "title", e.target.value)
                }
                value={field.title}
                required={true}
              />
              <TextInput
                label="Deskripsi"
                type="text"
                onChange={(e) =>
                  handleFieldChange(index, "description", e.target.value)
                }
                value={field.description}
                required={true}
              />
              <br />
              <hr className="mr-10 " />
            </div>
          ))}
          <div className="mr-10 flex justify-end py-5 gap-2">
            <button
              className="btn-mrh w-10"
              title="Kurangi Sesi"
              onClick={removeField}
            >
              <i className="mt-1 fa fa-minus" />
            </button>
            <button
              className="btn-hijau w-10"
              title="Tambah Sesi"
              onClick={addField}
            >
              <i className="mt-1 fa fa-plus" />
            </button>
          </div>
          <br />

          <div className="btn-form mr-6">
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
              onClick={navigateListSession}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
