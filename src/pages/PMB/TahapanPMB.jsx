import { motion } from "framer-motion";
import { useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import InfoTahapanPMB from "../../components/InfoTahapanPMB";
import ModalTahapanPMB from "../../components/ModalTahapanPMB";
import { useStateContext } from "../../contexts/ContextProvider";

const TahapanPMB = () => {
  const { stepsPMB, dataAdmissionRegistration } = useStateContext();

  const navigate = useNavigate();
  const path = "/pmb/list-calon-siswa";

  const [selected, setSelected] = useState({
    step: "",
    status: "",
    details: {},
  });

  const handleSelected = (index, keyName, details) => {
    setSelected({
      step: index,
      status: keyName,
      details: details,
    });
  };

  return (
    <div id="target" className="relative">
      <Header
        home="PMB"
        // prev="Bank"
        // navePrev={path}
        at="Tahapan Penerimaan Murid Baru"
        title="Tahapan Penerimaan Murid Baru"
      />
      <div
        style={{
          fontSize: "24px",
          // marginBottom: "10px",
          marginTop: "30px",
          display: "flex",
        }}
      >
        <section className="xs:col-span-3 lg:col-span-1 xs:mb-3 lg:mb-0">
          <p className="font-bold text-merah capitalize">
            {dataAdmissionRegistration.childName} -{" "}
            {dataAdmissionRegistration.regNumber}
          </p>
          <p className="text-xs">
            Catatan : Refresh Halaman Ini Untuk Pengecekan Perubahan Status
            Setiap Tahapan
          </p>
        </section>
      </div>
      <div>
        <article className="grid md:grid-rows-3 gap-2 md:grid-flow-col xs:grid-cols-1 md:grid-cols-2 mt-7">
          {Object.keys(stepsPMB).map((keyName, index) => (
            <motion.div layoutId={index + 1} key={index + 1}>
              <InfoTahapanPMB
                onClick={() => {
                  handleSelected(
                    index + 1,
                    stepsPMB[keyName].status,
                    stepsPMB[keyName].details
                  );
                }}
                step={index + 1}
                status={stepsPMB[keyName].status}
              />
            </motion.div>
          ))}
        </article>

        <ModalTahapanPMB
          selected={selected.step}
          setSelected={setSelected}
          step={selected.step}
          status={selected.status}
          details={selected.details}
        />
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali Ke
          List Calon Murid
        </Link>
      </div>
    </div>
  );
};
export default TahapanPMB;
