import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTahunAjaran } from "../../../api/TahunAjaran";
import { AlertMessage } from "../../../components/ModalPopUp";
import { postSession } from "../../../api/Sarat";
import { Header } from "../../../components";
import TextInput from "../../../components/TextInput";
import { DropdownSiswa } from "../../../components/Dropdown";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function TambahResume() {
  const [academicYearData, setData] = useState([]);
  const [academicYearId, setacAdemicYearId] = useState("");
  const [name, setName] = useState("");
  const [fields, setFields] = useState([{ title: "", description: "" }]);
  const [sts, setSts] = useState("");
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();
  const path = "/admin/list-resume";

  useEffect(() => {
    getTahunAjaran(setData, setSts, setIsLoading);
  }, []);

  const academicYearOptions = academicYearData.map((c) => ({
    label: `${c.name} : ${c.curriculum.code}`,
    value: c.id,
  }));

  const navigateListSession = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      academic_year_id: academicYearId,
      details: fields,
    };

    if (
      academicYearId === 0 ||
      name === "" ||
      fields[0].title === "" ||
      fields[0].description === ""
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postSession(setSts, navigateListSession, data);
    }
  };

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

  return (
    <>
      <Header
        home="Admin SARAT"
        prev="Data Resume"
        navePrev={path}
        at="Tambah Resume"
        title="Tambah Resume"
      />

      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Resume SARAT
        </p>
        <article>
          <TextInput
            label="Nama Resume SARAT"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
          />
          <DropdownSiswa
            label="Tahun Ajaran"
            required={true}
            defaultValue={academicYearId}
            isClearable={false}
            options={academicYearOptions}
            isSearchable={false}
            onChange={(e) => setacAdemicYearId(e.value)}
          />
          <br />
          <hr className="mr-10 mb-10" />
          <p className="font-bold text-merah mr-8 underline flex justify-center">
            Tambah Sesi SARAT
          </p>
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
              title="Kurangi Kolom Sesi"
              onClick={removeField}
            >
              <i className="mt-1 fa fa-minus" />
            </button>
            <button
              className="btn-hijau w-10"
              title="Tambah Kolom Sesi"
              onClick={addField}
            >
              <i className="mt-1 fa fa-plus" />
            </button>
          </div>
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
