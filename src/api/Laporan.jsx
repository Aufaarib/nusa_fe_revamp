import { AlertMessage } from "../components/ModalPopUp";
import { ErrorHandling } from "./ErrorHandling";
import axios from "./axios";

export function getLaporan(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/report/finance", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
      ErrorHandling(error);
    });
}
