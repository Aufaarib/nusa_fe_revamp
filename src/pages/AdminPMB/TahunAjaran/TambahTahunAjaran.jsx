import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKurikulum } from "../../../api/Kurikulum";
import { postTahunAjaran } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DropdownKurikulum } from "../../../components/Dropdown";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahTahunAjaran() {
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [curriculumId, setKurikulum] = useState("");
  const [status] = useState(1);
  const [sts, setSts] = useState(undefined);
  const [curriculumData, setCurriculumData] = useState([]);
  const path = "/admin/list-tahun-ajaran";
  const navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault();

    if (path.length === 0 || year.length === 0 || name.length === 0) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      postTahunAjaran(
        setSts,
        navigateTahunAjaran,
        year,
        name,
        status,
        curriculumId
      );
    }
  };

  const navigateTahunAjaran = () => {
    navigate(path);
  };

  const fetchCurriculum = async () => {
    getKurikulum(setCurriculumData, setSts);
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const curriculumOptions = curriculumData.map((c) => ({
    label: `${c.name} - ${c.description}`,
    value: c.id,
  }));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin PMB"
          prev="List Tahun Ajaran"
          navePrev={path}
          at="Tahun Ajaran"
          title="Tambah Tahun Ajaran"
        />
      </div>
      <div style={{ padding: "10px 104px 0" }}>
        <article>
          <p
            style={{
              fontSize: "24px",
              marginBottom: "50px",
              marginTop: "50px",
            }}
            className="ml-1 font-bold text-merah"
          >
            Form Tambah Tahun Ajaran
          </p>
          <TextInput
            label="Tahun"
            type="number"
            id="group"
            name="code"
            onChange={(e) => setYear(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama"
            type="text"
            id="group"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          {/* <TextInput
            label="Status"
            type="number"
            id="group"
            onChange={(e) => setStatus(e.target.value)}
            required={true}
          /> */}
          <DropdownKurikulum
            label="Kurikulum"
            required={true}
            isClearable={true}
            defaultValue={curriculumId}
            isSearchable={false}
            options={curriculumOptions}
            onChange={(e) => setKurikulum(e.value)}
          />

          <div className="btn-form">
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
              onClick={navigateTahunAjaran}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
