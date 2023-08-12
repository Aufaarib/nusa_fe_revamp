import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoSaim from "../../data/logo-saim.png";

import { useStateContext } from "../../contexts/ContextProvider";

import axios from "../../api/axios";
import { AlertStatusFailed } from "../../components/ModalPopUp";
import { TextInputPassword } from "../../components/TextInput";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z]{3}/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{4,12}$/;
const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
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

  const navigateLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    phoneRef.current.focus();
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const directTo = "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/user/register/parent",
        {
          fullname: user,
          phone: phone,
          email: email,
          password: pwd,
          password_confirmation: matchPwd,
        }
      );
      localStorage.setItem("TOKEN", response?.headers?.authorization);
      setIsLoading(false);
      navigate("/verify", {
        state: {
          email: email,
          direct: directTo,
        },
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        AlertStatusFailed("Koneksi Bermasalah", "Tutup");
      } else {
        AlertStatusFailed("Gagal", "Tutup");
      }
      setIsLoading(false);
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
          <form onSubmit={handleSubmit} className="block mt-1 mb-7">
            <div className="relative block xl:w-480">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <label
                  style={{
                    color: "#8F0D1E",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  Pendaftaran Akun Baru
                </label>
              </div>
            </div>
            {/* NAMA LENGKAP */}
            <div className="relative block w-full lg:w-480">
              <label htmlFor="username" className="flex mt-1 mb-1 form-label">
                Nama Lengkap
              </label>
              <div
                className="block w-full text-base font-normal text-gray-700 bg-white "
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: "16px",
                  borderRadius: "10px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                    padding: "10px",
                    outline: "none",
                    borderRadius: "10px",
                    background: "#E6E6E6",
                  }}
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="on"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </div>
              <FaCheckCircle
                className={
                  validName
                    ? "valid absolute top-11 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validName || !user
                    ? "hidden"
                    : "invalid absolute top-11 right-2 text-red-600"
                }
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Minimal 4 karakter.</span>
              </p>
            </div>

            {/* NOMOR TELEPON */}
            <div className="relative block xl:w-480">
              <label htmlFor="phone" className="flex mt-4 mb-1 form-label">
                No. Telepon
              </label>
              <div
                className="block w-full text-base font-normal text-gray-700 bg-white "
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: "16px",
                  borderRadius: "10px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                    padding: "10px",
                    outline: "none",
                    borderRadius: "10px",
                    background: "#E6E6E6",
                  }}
                  type="text"
                  id="phone"
                  ref={phoneRef}
                  autoComplete="on"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                  aria-invalid={validPhone ? "false" : "true"}
                  aria-describedby="phonenote"
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                />
              </div>
              <FaCheckCircle
                className={
                  validPhone
                    ? "valid absolute top-11 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validPhone || !phone
                    ? "hidden"
                    : "invalid absolute top-11 right-2 text-red-600"
                }
              />
              <p
                id="phonenote"
                className={
                  phoneFocus && phone && !validPhone
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Minimal 7 dan maksimal 15 angka.</span>
              </p>
            </div>

            {/* EMAIL */}
            <div className="relative block xl:w-480">
              <label htmlFor="email" className="flex mt-4 mb-1 form-label">
                E-mail
              </label>
              <div
                className="block w-full text-base font-normal text-gray-700 bg-white "
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: "16px",
                  borderRadius: "10px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                    padding: "10px",
                    outline: "none",
                    borderRadius: "10px",
                    background: "#E6E6E6",
                  }}
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </div>
              <FaCheckCircle
                className={
                  validEmail
                    ? "valid absolute top-11 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validEmail || !email
                    ? "hidden"
                    : "invalid absolute top-11 right-2 text-red-600"
                }
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions italic text-xs flex items-center py-1"
                    : "hidden"
                }
              >
                <FaInfoCircle className="mr-1" />
                <span>Format Email.</span>
              </p>
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
                    ? "valid absolute top-11 right-12 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validPwd || !pwd
                    ? "hidden"
                    : "invalid absolute top-11 right-12 text-red-600"
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
                    ? "valid absolute top-11 right-12 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validMatch || !matchPwd
                    ? "hidden"
                    : "invalid absolute top-11 right-12 text-red-600"
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
              disabled={
                !validName ||
                !validPhone ||
                !validEmail ||
                !validPwd ||
                !validMatch
                  ? true
                  : false
              }
              className="flex justify-center w-full py-3 my-6 mr-3 mt-11 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md disabled:bg-krem disabled:text-abu bg-merah px-7 hover:bg-gelap hover:shadow-lg focus:bg-merah focus:shadow-lg focus:outline-none focus:ring-0 active:bg-merah active:shadow-lg"
            >
              Daftar{" "}
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

export default Register;
