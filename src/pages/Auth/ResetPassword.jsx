import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import {
  FaCheckCircle,
  FaEye,
  FaInfoCircle,
  FaLowVision,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import assalamualaikum from "../../data/assalamualaikum.png";
import logoSaim from "../../data/logo-saim.png";

import { useStateContext } from "../../contexts/ContextProvider";

import { IconButton, Input, InputAdornment } from "@mui/material";
import { validateEmail } from "../../api/Registrasi";
import axios from "../../api/axios";
import {
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
} from "../../components/ModalPopUp";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z]{3}/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{4,12}$/;
const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
  const { isLoading, setIsLoading } = useStateContext();

  const userRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [jumlahanak, setJumlahAnak] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [otp, setOtp] = useState(false);
  const [sts, setSts] = useState("");
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const path = "/login";

  const navigateLogin = () => {
    navigate(path);
  };

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/user/reset/password",
        {
          newPassword: pwd,
          confirmPassword: matchPwd,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      );
      localStorage.setItem("TOKEN", response?.headers?.authorization);
      setIsLoading(false);
      AlertStatusTambahSuccess(path);
    } catch (err) {
      setIsLoading(false);
      AlertStatusTambahFailed();
    }
  };

  return (
    <>
      <div className="justify-end min-h-screen lg:flex bg-krem">
        <section className="flex flex-wrap justify-center lg:items-center lg:w-1/2 bg-putih">
          <div className="relative block w-full mt-6 text-center">
            <img
              className="m-auto mb-3 h-200 w-200 xs:hidden lg:block"
              src={assalamualaikum}
              alt="Assalamuálaikum"
            />
            <h4>Atur Ulang Password</h4>
          </div>

          <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7">
            <div className="relative block xl:w-480">
              <label htmlFor="password" className="flex mt-4 mb-1 form-label">
                Kata Sandi
              </label>
              <Input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                type={values.showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <FaLowVision /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FaCheckCircle
                className={
                  validPwd
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validPwd || !pwd
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>
                  8-24 karakter termasuk huruf besar, kecil, angka, karakter
                  spesial.
                </span>
              </p>
            </div>

            <div className="relative block xl:w-480">
              <label
                htmlFor="confirm_pwd"
                className="flex mt-4 mb-1 form-label"
              >
                Ulangi Kata Sandi
              </label>
              <Input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                type={values.showPassword ? "text" : "password"}
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                // value={"B!5millah"}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <FaCheckCircle
                className={
                  validMatch && matchPwd
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validMatch || !matchPwd
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
                }
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Harus cocok dengan password sebelumnya.</span>
              </p>
            </div>

            <button
              disabled={!validPwd || !validMatch ? true : false}
              className="flex justify-center w-full py-3 my-6 mr-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md disabled:bg-krem disabled:text-abu bg-merah px-7 hover:bg-gelap hover:shadow-lg focus:bg-merah focus:shadow-lg focus:outline-none focus:ring-0 active:bg-merah active:shadow-lg"
            >
              Kirim{" "}
              {isLoading ? (
                <CgSpinner className="ml-2 text-lg animate-spin" />
              ) : (
                ""
              )}
            </button>

            <button className="btn-putih" onClick={navigateLogin}>
              Kembali Ke Login
            </button>
          </form>
        </section>
        <section
          className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2"
          style={{ background: "#E6E6E6" }}
        >
          <img
            className="m-7 lg:h-96 lg:w-96 sm:w-56 sm:h-56 xs:w-1/3 xs:h-1/3"
            src={logoSaim}
            alt="SAIM"
          />

          <p className="absolute text-sm text-center xs:invisible lg:visible bottom-7 mt-7 text-merah">
            Copyright 2022. PT. Nafisha Universal Network
          </p>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
