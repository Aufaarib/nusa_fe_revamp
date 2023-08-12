import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoSaim from "../../data/logo-saim.png";

import { useStateContext } from "../../contexts/ContextProvider";
import axios from "../../api/axios";
import {
  AlertStatusFailed,
  AlertStatusSuccess,
} from "../../components/ModalPopUp";
import { TextInputPassword } from "../../components/TextInput";

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
      AlertStatusSuccess(
        navigateLogin,
        "Password Berhasil Diubah",
        "Kembali Ke Halaman Login"
      );
    } catch (err) {
      setIsLoading(false);
      AlertStatusFailed("Ubah Status Gagal", "Coba Lagi");
    }
  };

  return (
    <>
      <div className="justify-end lg:flex">
        <section className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2">
          <img className="logo-login" src={logoSaim} alt="SAIM" />
        </section>

        <section className="line-separator">
          <div className="line" />
        </section>

        <section className="flex justify-center lg:min-h-screen lg:items-center lg:w-1/2 bg-putih">
          <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7">
            <div className="relative block xl:w-480">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
              >
                <label
                  style={{
                    color: "#8F0D1E",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  Atur Ulang Kata Sandi
                </label>
              </div>
            </div>
            <div className="relative block xl:w-480">
              <TextInputPassword
                label="Kata Sandi"
                setPwd={(e) => setPwd(e.target.value)}
                pwd={pwd}
              />
              <FaCheckCircle
                className={
                  validPwd
                    ? "valid absolute top-11 right-11 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validPwd || !pwd
                    ? "hidden"
                    : "invalid absolute top-11 right-11 text-red-600"
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
              <TextInputPassword
                label="Ulangi Kata Sandi"
                setPwd={(e) => setMatchPwd(e.target.value)}
                pwd={matchPwd}
              />
              <FaCheckCircle
                className={
                  validMatch && matchPwd
                    ? "valid absolute top-11 right-11 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validMatch || !matchPwd
                    ? "hidden"
                    : "invalid absolute top-11 right-11 text-red-600"
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

            <div className="flex mt-9 justify-center">
              <label className="text-hitam mr-1" style={{ fontSize: "14px" }}>
                Sudah Punya Akun?
              </label>
              <Link
                to={"/login"}
                style={{ fontSize: "14px" }}
                className="text-merah underline"
              >
                Login
              </Link>
            </div>
            <p className="text-sm text-center mt-9 text-merah">
              Copyright 2023 PT. Nafisha Universal Network
            </p>
          </form>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
