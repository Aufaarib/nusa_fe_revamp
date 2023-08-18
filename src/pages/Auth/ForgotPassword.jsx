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
          <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-12">
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
              className={!validEmail ? "btn-disabled" : "btn-merah"}
            >
              Kirim{" "}
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

export default ForgotPassword;
