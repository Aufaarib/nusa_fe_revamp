import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTahunAjaran } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { AlertEmpty, AlertMessage } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";
import { getKurikulum } from "../../../api/Kurikulum";
import { useEffect } from "react";
import { DropdownKurikulum } from "../../../components/Dropdown";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CircularProgress } from "@mui/material";

export default function UbahTahunAjaran() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();
  const [year, setYear] = useState(location.state.year);
  const [name, setName] = useState(location.state.name);
  const [curriculums, setCurriculum] = useState({
    label: location.state.curriculumName,
    value: location.state.curriculumId,
  });
  const [curriculumData, setCurriculumData] = useState([]);
  const [status, setStatus] = useState(undefined);
  const path = "/admin/list-tahun-ajaran";

  const fetchCurriculum = async () => {
    setIsLoading(true);
    getKurikulum(setCurriculumData, setStatus, setIsLoading);
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const code = location.state.code;
    const status = location.state.status;
    const curriculum = curriculums.value;

    if (year === "" || name === "" || curriculum === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      updateTahunAjaran(
        setStatus,
        navigateTahunAjaran,
        year,
        name,
        status,
        curriculum,
        code,
        setIsLoading
      );
    }
  };

  const navigateTahunAjaran = () => {
    navigate(path);
  };

  const curriculumOptions = curriculumData.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin PMB"
          prev="Daftar Tahun Ajaran"
          navPrev={path}
          at="Ubah Tahun Ajaran"
          title="Ubah Tahun Ajaran"
        />
      </div>
      <div style={{ padding: "10px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
            marginTop: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Tahun Ajaran
        </p>
        <article>
          <section
            className="grid mt-3 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            style={{ zIndex: -1 }}
          >
            {/* COL 1 */}
            <section>
              <TextInput
                label="Tahun"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required={true}
              />
              <TextInput
                label="Nama"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <DropdownKurikulum
                label="Kurikulum"
                required={true}
                isClearable={true}
                defaultValue={curriculums}
                isSearchable={false}
                options={curriculumOptions}
                onChange={setCurriculum}
              />
            </section>
          </section>

          <div className="btn-form flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
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
