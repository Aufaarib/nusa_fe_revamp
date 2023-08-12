import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoSaim from "../../data/logo-saim.png";

import Countdown from "react-countdown";
import { revalidateEmail, validateOTP } from "../../api/Registrasi";

const UserVerification = () => {
  const [sts, setSts] = useState("");
  const [otp, setOtp] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 300000);
  const location = useLocation();
  const navigate = useNavigate();
  const directTo = location.state.direct;

  // console.log("OTP === ", otp);

  const verifiedEmail = () => {
    validateOTP(setSts, otp, navigates, directTo);
  };

  const navigates = () => {
    if (directTo === "Reset Password") {
      navigate("/reset-pwd");
    } else if (directTo === "Login") {
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
      <div className="justify-end lg:flex">
        <section className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2">
          <img className="logo-login" src={logoSaim} alt="SAIM" />
        </section>

        <section className="line-separator">
          <div className="line" />
        </section>

        <section className="flex justify-center lg:min-h-screen lg:items-center lg:w-1/2 bg-putih">
          <div className="relative block w-full text-center">
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
              <p className="text-sm text-center mt-9 text-merah">
                Copyright 2023 PT. Nafisha Universal Network
              </p>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserVerification;
