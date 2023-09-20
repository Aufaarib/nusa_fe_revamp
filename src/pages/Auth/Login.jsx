import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { AlertStatusFailed } from "../../components/ModalPopUp";
import { TextInputPassword } from "../../components/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";
import logoSaim from "../../data/logo-saim.png";

const Login = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const directTo = "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_BASE_URL + "/user/login", {
        email: user,
        password: pwd,
      })
      .then((res) => {
        setIsLoading(false);
        const role = res?.data?.body.role;
        const email = res?.data?.body.email;
        const verified = res?.data?.body.status;
        const token = res?.headers?.authorization;
        const nama = res?.data?.body.fullname;
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("NAMA", nama);
        localStorage.setItem("ROLE", role);
        localStorage.setItem("EMAIL", email);
        if (res.status === 200) {
          if (role === "ADMIN" && verified === 1) {
            navigate("/admin/list-data-registrasi", { replace: true });
          } else if (role === "USER" && verified === 1) {
            navigate("/pmb/list-calon-siswa", { replace: true });
          } else if (verified !== 1) {
            navigate("/verify", {
              state: {
                email: email,
                direct: directTo,
              },
            });
          } else {
            navigate("/login");
          }
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          AlertStatusFailed("Koneksi Bermasalah", "Tutup", "error");
        } else {
          AlertStatusFailed(
            "Email atau Password Tidak Sesuai",
            "Coba Lagi",
            "warning"
          );
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="justify-end lg:flex">
      <section className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2">
        <img className="logo-login" src={logoSaim} alt="SAIM" />
      </section>

      <section className="line-separator">
        <div className="line" />
      </section>

      <section
        style={{ display: "flex", flexDirection: "column" }}
        className="flex justify-center lg:min-h-screen lg:items-center lg:w-1/2 bg-putih"
      >
        <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7 py-0">
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
                Silahkan Masuk
              </label>
            </div>
          </div>

          {/* USER */}
          <div className="relative block xl:w-480">
            <label htmlFor="user" className="flex mt-2 mb-1 form-label">
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
                type="text"
                id="user"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <TextInputPassword
              label="Kata Sandi"
              setPwd={(e) => setPwd(e.target.value)}
              pwd={pwd}
            />
            <div className="flex justify-end">
              <Link
                to={"/forgot"}
                className="flex mt-2 mb-1 w-auto text-merah underline font-bold"
              >
                Lupa Kata Sandi?
              </Link>
            </div>
          </div>
          <button className="btn-merah">
            Masuk{" "}
            {isLoading ? (
              <CgSpinner className="ml-2 text-lg animate-spin" />
            ) : (
              ""
            )}
          </button>
          <div className="flex mt-7 justify-center">
            <Link
              to={"/register"}
              style={{ fontSize: "14px" }}
              className="text-merah underline font-bold"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </form>
        <p className="text-sm text-center py-4 text-merah">
          Copyright 2023 PT. Nafisha Universal Network
        </p>
      </section>
    </div>
  );
};

export default Login;
