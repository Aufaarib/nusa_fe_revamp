import { IconButton, Input, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaLowVision } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { AlertLoginFailed } from "../../components/ModalPopUp";
import { useStateContext } from "../../contexts/ContextProvider";
import assalamualaikum from "../../data/assalamualaikum.png";
import logoSaim from "../../data/logo-saim.png";

const Login = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const [sccsMsg, setSccsMsg] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  const directTo = "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/user/login",
        {
          email: user,
          password: pwd,
        }
      );

      const role = response?.data?.body.role;
      const email = response?.data?.body.email;
      const verified = response?.data?.body.status;
      const token = response?.headers?.authorization;
      const nama = response?.data?.body.fullname;
      localStorage.setItem("TOKEN", token);
      localStorage.setItem("NAMA", nama);
      localStorage.setItem("ROLE", role);
      localStorage.setItem("EMAIL", email);

      setIsLoading(false);

      if (response.status === 200) {
        if (role === "ADMIN" && verified === 1) {
          navigate("/admin/dashboard", { replace: true });
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
    } catch (err) {
      AlertLoginFailed();
      setIsLoading(false);
    }
  };

  return (
    <div className="justify-end lg:min-h-screen lg:flex lg:bg-krem">
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

      <section className="flex justify-center lg:min-h-screen lg:items-center lg:w-1/2 bg-putih">
        <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7">
          <div className="relative block text-center xl:w-480 mb-9">
            <img
              className="m-auto mb-3 h-200 w-200 xs:hidden lg:block"
              src={assalamualaikum}
              alt="Assalamuálaikum"
            />
            <h4>Selamat Datang di Web Penerimaan Murid Baru</h4>
          </div>

          <h2 className="text-center mt-7 mb-7">Silahkan Masuk</h2>

          {/* USER */}
          <div className="relative block xl:w-480">
            <label htmlFor="user" className="flex mt-4 mb-1 form-label">
              Email
            </label>
            <Input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
              type="text"
              id="user"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="flex mt-4 mb-1 form-label">
              Password
            </label>
            <Input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
              type={values.showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required={true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {values.showPassword ? <FaLowVision /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <div className="flex justify-end">
              <Link to={"/forgot"} className="flex mt-2 mb-1 btn-mrh">
                Lupa Password
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
          <button className="btn-putih" onClick={navigateRegister}>
            Daftar Akun Baru
          </button>
        </form>
      </section>
      <p className="py-4 text-sm text-center lg:hidden text-merah">
        Copyright 2022. PT. Nafisha Universal Network
      </p>
    </div>
  );
};

export default Login;
