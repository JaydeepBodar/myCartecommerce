import { Globalthemeprovider } from "@/Context/Themeprovider";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Tostify = () => {
  const { theme } = Globalthemeprovider();
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={`${theme === false  ? "light" : "dark"}`}
    />
  );
};

export default Tostify;
