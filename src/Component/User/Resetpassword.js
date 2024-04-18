"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Container from "../Container";
import Inputdata from "../Inputdata";
import Tostify from "../Tostify";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Resetpassword = () => {
  const [email, setemail] = useState("");
  const { theme } = Globalthemeprovider();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}api/auth/sendpassword`, { email })
      .then((res) => toast.success(res.data.message))
      .catch((e) => toast.error(e.response.data.message));
  };
  return (
    <React.Fragment>
      <Tostify />
      <Container>
        <div className="md:mb-[4px] pt-12 pb-14 flex flex-col justify-center items-center">
          <div
            className={`${
              theme === true
                ? "bg-[#f2f2f2] text-[#000]"
                : "bg-[#000] text-[#f2f2f2]"
            } w-[500px] max-sm:max-w-[100%] mx-[auto] border-[1px] border-[#f2f2f2] max-sm:px-8 max-sm:py-8 rounded-lg px-16 py-14`}
          >
            <h4 className="text-center font-semibold text-3xl mb-4 tracking-normal">
              Reset Password...
            </h4>
            <form onSubmit={handleSubmit}>
              <Inputdata
                type="email"
                value={email}
                onChange={(event) => setemail(event.target.value)}
                placeholder="Enter Your Register Email..."
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col text-[#000]"
              />
              <button
                type="submit"
                className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#197693] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Resetpassword;
