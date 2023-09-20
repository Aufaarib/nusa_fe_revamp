import { useEffect, useState } from "react";
import FormPernyataan from "../../components/FormPernyataan";
import { useStateContext } from "../../contexts/ContextProvider";

const FormPernyataanOrangTua = () => {
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
    getParentsData();
    getFormCheck();
    console.log("getFormCheck === ", formCheck);
  }, []);

  return (
    <>
      <FormPernyataan key={indexMurid.toString()} indexMurid={indexMurid} />
    </>
  );
};
export default FormPernyataanOrangTua;
