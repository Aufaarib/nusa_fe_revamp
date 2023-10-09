import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoSaim from "../../data/logo-saim.png";

import { useStateContext } from "../../contexts/ContextProvider";

import axios from "../../api/axios";
import { AlertStatusFailed } from "../../components/ModalPopUp";
import { TextInputPassword } from "../../components/TextInput";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z]{3}/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{4,12}$/;
// const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const location = useLocation();

  const userRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  // const errRef = useRef();

  const [user, setUser] = useState(location.state?.fullname);
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState(location.state?.phone);
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [jumlahanak, setJumlahAnak] = useState("");

  const [email, setEmail] = useState(location.state?.email);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState(location.state?.password);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState(location.state?.matchPwd);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  console.log(location.state?.password);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

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
          fullname: user,
          email: email,
          phone: phone,
          password: pwd,
          matchPwd: matchPwd,
          direct: directTo,
        },
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        AlertStatusFailed("Koneksi Bermasalah", "Tutup", "error");
      } else {
        AlertStatusFailed(
          "Email Atau No.Telp Sudah Terdaftar",
          "Coba Lagi",
          "warning",
          "Silahkan Login"
        );
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

        <section
          style={{ display: "flex", flexDirection: "column" }}
          className="justify-center lg:min-h-screen lg:items-center lg:w-1/2 bg-putih"
        >
          <form onSubmit={handleSubmit} className="block px-12">
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
            <div className="relative block w-full xl:w-480">
              <label htmlFor="username" className="flex mt-2 mb-1 form-label">
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
              <label htmlFor="phone" className="flex mt-2 mb-1 form-label">
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
                  placeholder="081234567890"
                  value={phone}
                  required
                  // aria-invalid={validPhone ? "false" : "true"}
                  // aria-describedby="phonenote"
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
              <label htmlFor="email" className="flex mt-2 mb-1 form-label">
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
                  placeholder="contoh@gmail.com"
                  // aria-invalid={validEmail ? "false" : "true"}
                  // aria-describedby="emailnote"
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

            {/* PASSWORD */}
            <div className="relative block xl:w-480">
              <TextInputPassword
                label="Kata Sandi"
                setPwd={(e) => setPwd(e.target.value)}
                pwd={pwd}
                placeholder="Contoh123!"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
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
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
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
                <span>Harus sesuai dengan kata sandi sebelumnya.</span>
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
              className={
                !validName ||
                !validPhone ||
                !validEmail ||
                !validPwd ||
                !validMatch
                  ? "btn-disabled"
                  : "btn-merah"
              }
            >
              Daftar{" "}
              {isLoading ? (
                <CgSpinner className="ml-2 text-lg animate-spin" />
              ) : (
                ""
              )}
            </button>

            <div className="flex mt-7 justify-center">
              <Link
                to={"/login"}
                style={{ fontSize: "14px" }}
                className="text-merah underline font-bold"
              >
                Kembali Ke Login
              </Link>
            </div>
          </form>
          <p className="text-sm text-center py-4 text-merah">
            Copyright 2023 PT. Nafisha Universal Network
          </p>
        </section>
      </div>
    </>
  );
};

export default Register;
