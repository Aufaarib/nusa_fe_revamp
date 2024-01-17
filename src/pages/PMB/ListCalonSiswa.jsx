import { useEffect, useState } from "react";
import { getActiveAdmission, postCalonSiswa } from "../../api/Pendaftaran";
import { getMyAdmission } from "../../api/Registrasi";
import { Header } from "../../components";
import {
  AlertMessage,
  ModalTambahCalonMurid,
} from "../../components/ModalPopUp";

const ListCalonSiswa = () => {
  const [dataMyAdmission, setDataMyAdmission] = useState([]);
  const [dataActiveAdmission, setDataActiveAdmission] = useState("");
  const [isOpenCostCenter, setisOpenCostCenter] = useState(false);
  const [childName, setName] = useState("");
  const [sts, setSts] = useState("");
  const path = "/pmb/tahapan-pmb";

  console.log("active === ", dataActiveAdmission);

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
        at="Data Calon Siswa"
        title="Data Calon Siswa"
      />
      <div className="flex justify-start md:justify-end">
        <button
          style={{
            fontSize: "12px",
            width: "auto",
            padding: "2px 10px",
          }}
          className="btn-hijau w-auto"
          onClick={() => {
            setisOpenCostCenter(true);
          }}
        >
          <i className="fa fa-plus" /> Tambah Calon Siswa
        </button>
      </div>
      {dataMyAdmission.length !== 0 ? (
        <>
          {Object.entries(groupedCandidates).map(([year, candidates]) => (
            <>
              <div className="text-wrapper-2 mt-10 mb-5">
                Tahun Ajaran {year}
              </div>
              {/* <br /> */}
              <div key={year} className="child-card ">
                {candidates.map(({ childName, regNumber, status }) => (
                  <div className="frame">
                    <div className="overlap-group">
                      <div className="div-wrapper">
                        <div className="text-wrapper-3">PMB</div>
                        <div
                          style={{
                            display: "inline-block",
                            float: "right",
                            paddingRight: "10px",
                            paddingLeft: "10px",
                            backgroundColor: "white",
                            borderRadius: "14px",
                          }}
                        >
                          <div
                            style={
                              status === "valid"
                                ? { color: "#15803D", fontWeight: "bold" }
                                : {
                                    color: "#8f0d1e",
                                    fontWeight: "bold",
                                  }
                            }
                          >
                            {status !== "valid"
                              ? "Belum Terverifikasi"
                              : "Terverifikasi"}
                          </div>
                          {/* <button
                            style={{
                              backgroundColor: "white",
                              color: "#8f0d1e",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                            className="btn-action-merah"
                          >
                            <i className="fa fa-edit" /> Ubah Nama Anak
                          </button> */}
                        </div>
                      </div>
                      <div className="flex flex-row gap-10 justify-between items-center p-9">
                        <div className="flex flex-col gap-5">
                          <div className="text-wrapper-4 capitalize">
                            {childName}
                          </div>
                          <div className="text-wrapper-5">{regNumber}</div>
                          <div>
                            <button
                              onClick={() => setRegNumbers(regNumber)}
                              className="w-auto btn-action-merah px-5"
                            >
                              <i className="fa fa-eye" /> Lihat
                            </button>
                          </div>
                        </div>
                        <div>
                          <img
                            className="group"
                            alt="Group"
                            src="https://generation-sessions.s3.amazonaws.com/bc45777641ff997f7635a4fe39868a07/img/group-1-2@2x.png"
                          />
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
            Belum Ada Calon Siswa
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
