import { useRef, useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import logoSaim from "../../data/logo-saim.png";
import assalamualaikum from "../../data/assalamualaikum.png";

import { useStateContext } from "../../contexts/ContextProvider";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";
import { revalidateEmail, validateEmail } from "../../api/Registrasi";
import {
  AlertStatusVerified,
  AlertStatusVerifiedFailed,
} from "../../components/ModalPopUp";
import Countdown from "react-countdown";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const USER_REGEX = /^[A-z]{3}/;
// const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
// const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = "/api/register";

const UserVerification = () => {
  // const { resendEmailVerification } = useAuth();
  // const { isLoading, setIsLoading } = useStateContext();

  // const userRef = useRef();
  // const phoneRef = useRef();
  // const jumlahanakRef = useRef();
  // const emailRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState("");
  // const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  // const [phone, setPhone] = useState("");
  // const [validPhone, setValidPhone] = useState(false);
  // const [phoneFocus, setPhoneFocus] = useState(false);

  // const [jumlahanak, setJumlahAnak] = useState("");
  // const [validJumlahAnak, setValidJumlahAnak] = useState(false);
  // const [jumlahAnakFocus, setJumlahAnakFocus] = useState(false);

  // const [email, setEmail] = useState("");
  // const [emailVerify, setEmailVerify] = useState("");
  // const [validEmail, setValidEmail] = useState(false);
  // const [emailFocus, setEmailFocus] = useState(false);

  // const [pwd, setPwd] = useState("");
  // const [validPwd, setValidPwd] = useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setMatchPwd] = useState("");
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  // const [errMsg, setErrMsg] = useState("");
  // const [errMsgName, setErrMsgName] = useState("");
  // const [errMsgPhone, setErrMsgPhone] = useState("");
  // const [errMsgJumlahAnak, setErrMsgJumlahAnak] = useState("");
  // const [errMsgEmail, setErrMsgEmail] = useState("");
  // const [errMsgPwd, setErrMsgPwd] = useState("");
  // const [errMsgMatchPwd, setErrMsgMatchPwd] = useState("");
  // const [success, setSuccess] = useState(false);
  const [sts, setSts] = useState("");
  const [otp, setOtp] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 300000);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("OTP === ", otp);

  const verifiedEmail = () => {
    validateEmail(setSts, otp, navigates);
  };

  const navigates = () => {
    if (location.state.direct === "Reset Password") {
      navigate("/reset-pwd");
    } else if (location.state.direct === "Login") {
      navigate("/login");
    }
  };

  useEffect(() => {
    let countdownInterval;

    if (showCountdown) {
      countdownInterval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 100);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [showCountdown]);

  useEffect(() => {
    if (countdownTime > 0) {
      setShowCountdown(true);
    } else {
      setShowCountdown(false);
    }
  }, []);

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  const reverifiedEmail = () => {
    revalidateEmail(setSts);
    setCountdownTime(Date.now() + 300000);
    setShowCountdown(true);
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
            <section
              style={{
                display: "flex",
                justifyContent: "center", // Center items horizontally
                alignItems: "center", // Center items vertically
                flexDirection: "column", // Stack items vertically
              }}
              className="rounded-lg bg-krem p-7 m-7"
            >
              <div>
                <h2 className="text-center">Verifikasi Email Anda</h2>
                <br />
                <p>
                  Kami telah mengirimkan kode verifikasi ke{" "}
                  <span className="font-bold text-merah">
                    {location.state.email}
                  </span>
                </p>
                <br />
                <input
                  className="text-gray-700 bg-white bg-clip-padding border border-solid border-merah rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none"
                  style={{
                    margin: "auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                    width: "60%",
                    textAlign: "center", // Center the text within the input field
                    WebkitAppearance: "none" /* Chrome, Safari, Edge */,
                  }}
                  type="number"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  placeholder="Masukkan Kode"
                  required
                />
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                  }}
                  className="font-bold text-merah"
                >
                  <p>Input Sebelum :</p>
                  {showCountdown && (
                    <Countdown date={countdownTime} renderer={renderer} />
                  )}
                </div>
                <button className="btn-putih" onClick={verifiedEmail}>
                  {" "}
                  Verifikasi Akun
                </button>
                <br />
                <p>
                  Tidak menerima email? Periksa folder spam atau promosi Anda
                  atau :
                </p>
              </div>
              <button className="w-auto btn-merah" onClick={reverifiedEmail}>
                {" "}
                Kirim Ulang Kode
              </button>
            </section>
          </div>
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

export default UserVerification;
