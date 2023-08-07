import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import assalamualaikum from "../../data/assalamualaikum.png";
import logoSaim from "../../data/logo-saim.png";

import { useStateContext } from "../../contexts/ContextProvider";

import axios from "../../api/axios";
import { AlertUploadInvoiceFailed } from "../../components/ModalPopUp";
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const ForgotPassword = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const directTo = "Reset Password";

  const navigateLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/user/forgot/password",
        {
          email: email,
        },
        { headers: { authorization: localStorage.getItem("TOKEN") } }
      )
      .then((response) => {
        // Handle success response if needed
        localStorage.setItem("TOKEN", response?.headers?.authorization);
        setIsLoading(false);
        navigate("/verify", {
          state: {
            email: email,
            direct: directTo,
          },
        });
      })
      .catch((error) => {
        // Handle error response if needed
        console.error("Error uploading file:", error);
        AlertUploadInvoiceFailed();
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="justify-end min-h-screen lg:flex">
        <section className="flex flex-wrap justify-center lg:items-center lg:w-1/2 bg-putih">
          <form onSubmit={handleSubmit} className="block">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "15px",
              }}
            >
              <label
                style={{
                  color: "#8F0D1E",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                Lupa Kata Sandi
              </label>
              <label
                style={{
                  color: "#8F0D1E",
                  fontSize: "18px",
                }}
              >
                Isi E-mail Untuk Pengiriman Kode Verifikasi Reset Kata Sandi
              </label>
            </div>
            {/* EMAIL */}
            <div className="relative xl:w-480">
              <label htmlFor="email" className="flex mb-1 form-label">
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
                    ? "valid absolute top-10 right-2 text-green-600"
                    : "hidden"
                }
              />
              <FaTimesCircle
                className={
                  validEmail || !email
                    ? "hidden"
                    : "invalid absolute top-10 right-2 text-red-600"
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
            <button
              disabled={!validEmail ? true : false}
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
          </form>
        </section>

        <section className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2">
          <img
            className="lg:h-96 lg:w-96 sm:w-56 sm:h-56 xs:w-1/3 xs:h-1/3"
            src={logoSaim}
            alt="SAIM"
          />

          <p className="absolute text-sm text-center xs:invisible lg:visible bottom-7 mt-7 text-merah">
            Copyright 2023 PT. Nafisha Universal Network
          </p>
        </section>

        <section
          style={{ left: "678px" }}
          className="top-0 flex items-center justify-center min-h-full lg:fixed"
        >
          <div style={{ borderRight: "1px solid #8F8F8F", height: "500px" }} />
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
