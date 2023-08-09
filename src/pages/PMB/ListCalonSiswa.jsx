import { useEffect, useState } from "react";
import { getActiveAdmission, postCalonSiswa } from "../../api/Pendaftaran";
import { getMyAdmission } from "../../api/Registrasi";
import { Header } from "../../components";
import { ModalTambahCalonMurid } from "../../components/ModalPopUp";

const ListCalonSiswa = () => {
  const [dataMyAdmission, setDataMyAdmission] = useState([]);
  const [dataActiveAdmission, setDataActiveAdmission] = useState("");
  const [isOpenCostCenter, setisOpenCostCenter] = useState(false);
  const [childName, setName] = useState("");
  const [sts, setSts] = useState("");
  const path = "/pmb/tahapan-pmb";

  useEffect(() => {
    getMyAdmission(setDataMyAdmission, setSts);
    getActiveAdmission(setDataActiveAdmission, setSts);
  }, []);

  const groupedCandidates = dataMyAdmission.reduce((result, current) => {
    const { year } = current.admissionPhase?.admission?.academicYear;
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
        at="List Anak"
        title="List Anak"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn-mrh"
          style={{
            // marginTop: "20px",
            // marginRight: "25px",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => {
            setisOpenCostCenter(true);
          }}
        >
          Daftar Baru
        </button>
      </div>
      {dataMyAdmission.length !== 0 ? (
        <>
          {Object.entries(groupedCandidates).map(([year, candidates]) => (
            <>
              <div className="text-wrapper-2 mt-5">Tahun Ajaran {year}</div>
              <br />
              <div key={year} className="child-card">
                {candidates.map(({ childName, regNumber, status }) => (
                  <div
                    className="frame"
                    // style={{ flex: "0 0 30%", gap: "16px" }}
                  >
                    <div
                      className="overlap-group"
                      // style={{ display: "flex", gap: "16px" }}
                    >
                      <div className="div-wrapper">
                        <div className="text-wrapper-3">PMB</div>
                      </div>
                      <div className="frame-2" style={{ flex: 1 }}>
                        <div className="text-wrapper-4 capitalize">
                          {childName}
                        </div>
                        <div className="text-wrapper-5">{regNumber}</div>
                        <div>
                          <button
                            onClick={() => setRegNumbers(regNumber)}
                            className="btn-modal-merah"
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
                        <div
                          style={
                            status === "valid"
                              ? { color: "#15803D", fontWeight: "bold" }
                              : { color: "#8f0d1e", fontWeight: "bold" }
                          }
                        >
                          {status !== "valid" ? "Belum Aktif" : "Aktif"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <strong style={{ color: "gray", fontSize: "28px" }}>
            Belum Ada Anak Yang Terdaftar
          </strong>
        </div>
      )}
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
