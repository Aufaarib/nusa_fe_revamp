import { useEffect, useState } from "react";
import FormDaftarOrangTua from "../../components/FormDaftarOrangTua";
import { useStateContext } from "../../contexts/ContextProvider";

const FormOrangTua = () => {
  const {
    parents,
    getParentsData,
    setErrMsg,
    errStep,
    stepsPMB,
    getStepsPMBData,
    formCheck,
    getFormCheck,
  } = useStateContext();
  const [indexMurid, setIndexMurid] = useState(0);

  useEffect(() => {
    getStepsPMBData();
    console.log("PARENTS DATA FROM CONTEXT === ", parents);
    getParentsData();
    getFormCheck();
    console.log("getFormCheck === ", formCheck);
  }, []);

  return (
    <>
      <FormDaftarOrangTua key={indexMurid} indexMurid={indexMurid} />
    </>
  );
};
export default FormOrangTua;
