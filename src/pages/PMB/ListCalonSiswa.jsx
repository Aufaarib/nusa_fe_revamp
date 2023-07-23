import { useState, useEffect, useRef } from "react";
import { BsBarChartSteps } from "react-icons/bs";
import { motion } from "framer-motion";
import { Header } from "../../components";
import InfoTahapanPMB from "../../components/InfoTahapanPMB";
import ModalTahapanPMB from "../../components/ModalTahapanPMB";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaRegAddressCard, FaTimesCircle } from "react-icons/fa";
import { getMyAdmission } from "../../api/Registrasi";
import { useNavigate } from "react-router-dom";
import { ModalTambahCalonMurid } from "../../components/ModalPopUp";
import { getActiveAdmission, postCalonSiswa } from "../../api/Pendaftaran";

const ListCalonSiswa = () => {
  const [dataMyAdmission, setDataMyAdmission] = useState([]);
  const [dataActiveAdmission, setDataActiveAdmission] = useState("");
  const [isOpenCostCenter, setisOpenCostCenter] = useState(false);
  const [childName, setName] = useState("");
  const [sts, setSts] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const navigate = useNavigate();
  const path = "/pmb/tahapan-pmb";

  // const admissionPhaseId = 8;

  useEffect(() => {
    getMyAdmission(setDataMyAdmission, setSts);
    getActiveAdmission(setDataActiveAdmission, setSts);
  }, []);

  console.log("MASUUUKKKKKK === ", dataActiveAdmission);

  const groupedCandidates = dataMyAdmission.reduce((result, current) => {
    const { year } = current.admission?.admission?.academicYear;
    if (year) {
      if (!result[year]) {
        result[year] = [];
      }
      result[year].push(current);
    }
    return result;
  }, {});

  const setRegNumbers = (regNumber) => {
    localStorage.setItem("REG_NUMBER", regNumber);
    window.location.href = path;
  };

  const createCalonSiswa = () => {
    postCalonSiswa(setDataMyAdmission, setSts, dataActiveAdmission, childName);
    closeModalCostCenter();
  };

  const closeModalCostCenter = () => {
    setisOpenCostCenter(false);
  };

  return (
    <div>
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="List Calon Siswa"
        title="List Calon Siswa"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn-mrh"
          style={{
            marginTop: "20px",
            marginRight: "25px",
            borderRadius: "5px",
            fontFamily: "Roboto-Medium, Helvetica",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => {
            setisOpenCostCenter(true);
            console.log("Button clicked!");
          }}
        >
          Daftar Baru
        </button>
      </div>
      {Object.entries(groupedCandidates).map(([year, candidates]) => (
        <div>
          <div className="text-wrapper-2">Tahun Ajaran {year}</div>
          <br />
          <div
            key={year}
            style={{
              display: "flex",
              marginBottom: "55px",
              gap: "40px",
              maxWidth: "100px",
            }}
          >
            {candidates.map(({ childName, regNumber, status }) => (
              <div className="frame">
                <div className="overlap-group">
                  <div className="div-wrapper">
                    <div className="text-wrapper-3">PMB</div>
                  </div>
                  <div className="frame-2">
                    <div className="text-wrapper-4">{childName}</div>
                    <div className="text-wrapper-5">{regNumber}</div>
                    <div className="tambah">
                      <button
                        onClick={() => setRegNumbers(regNumber)}
                        className="text-wrapper-6"
                      >
                        Lihat
                      </button>
                    </div>
                  </div>
                  <div className="frame-3">
                    <img
                      className="group"
                      alt="Group"
                      src="https://generation-sessions.s3.amazonaws.com/bc45777641ff997f7635a4fe39868a07/img/group-1-2@2x.png"
                    />
                    <div className="text-wrapper-7">
                      {status === "inreview" ? "Sedang Berlangsung" : "Aktif"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <ModalTambahCalonMurid
        isOpenCostCenter={isOpenCostCenter}
        closeModalCostCenter={closeModalCostCenter}
        onChange={(e) => setName(e.target.value)}
        post={createCalonSiswa}
      />
    </div>
  );
};
export default ListCalonSiswa;
