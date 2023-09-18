import { useEffect, useState } from "react";
import FormDaftarMurid from "../../components/FormDaftarMurid";
import { useStateContext } from "../../contexts/ContextProvider";

const FormMurid = () => {
  const {
    stepsPMB,
    students,
    getStudentsData,
    errStep,
    setErrMsg,
    getStepsPMBData,
    formCheck,
    getFormCheck,
  } = useStateContext();

  const [indexMurid, setIndexMurid] = useState(0);

  useEffect(() => {
    getStepsPMBData();
    getStudentsData();
    console.log("STEPS PMB DATA FROM CONTEXT === ", stepsPMB);
    getFormCheck();
    console.log("getFormCheck === ", formCheck);
  }, []);

  return (
    <>
      <FormDaftarMurid key={indexMurid.toString()} indexMurid={indexMurid} />
    </>
  );
};
export default FormMurid;
