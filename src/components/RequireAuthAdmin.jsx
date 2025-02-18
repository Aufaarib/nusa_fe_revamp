import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeSettings from "./ThemeSettings";

import { useStateContext } from "../contexts/ContextProvider";
import useAuth from "../hooks/useAuth";

const RequireAuthAdmin = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    errMsg,
    setErrMsg,
    successMsg,
    setSuccessMsg,
    successMsgSendVerify,
    setSuccessMsgSendVerify,
    isLoading,
  } = useStateContext();

  const { auth, setAuth } = useAuth();
  const location = useLocation();

  // const nama = JSON.parse(localStorage.getItem('NAMA'));
  // const role = JSON.parse(localStorage.getItem('ROLE'));
  // const email = JSON.parse(localStorage.getItem('EMAIL'));
  // const token = JSON.parse(localStorage.getItem('TOKEN'));
  // const verified = localStorage.getItem('VERIFIED');
  const nama = localStorage.getItem("NAMA");
  const role = localStorage.getItem("ROLE");
  const email = localStorage.getItem("EMAIL");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    setAuth({ nama, role, email });
  }, []);

  useEffect(() => {
    setTimeout(
      function () {
        setSuccessMsg("");
        setSuccessMsgSendVerify("");
      }.bind(this),
      7000
    );
  }, [successMsg, successMsgSendVerify]);

  return role === "ADMIN" ? (
    <div className={currentMode === "Dark" ? "dark" : " min-h-screen w-full"}>
      <div className="w-full flex flex-row justify-between min-h-screen dark:bg-gelap overflow-hidden max-h-screen">
        <div
          className={`${
            !activeMenu && "hidden"
          } bg-white w-72 sidebar dark:bg-terang z-[9999999]`}
        >
          <Sidebar />
        </div>

        <div
          className={`max-w-[82%] h-screen overflow-auto w-full ${
            activeMenu
              ? "dark:bg-gelap bg-krem min-h-screen"
              : "bg-krem dark:bg-gelap min-h-screen flex-2 "
          }`}
        >
          <div className="fixed md:static bg-krem dark:bg-gelap navbar">
            <Navbar />
          </div>

          {themeSettings && <ThemeSettings />}

          <div className="p-10 mb-7 mx-7 bg-white rounded-lg min-h-[100vh]">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuthAdmin;
