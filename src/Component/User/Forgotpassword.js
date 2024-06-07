"use client";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Container from "../Container";
import Inputdata from "../Inputdata";
const Forgotpassword = ({ id, token }) => {
  const [password, setpassword] = useState("");
  const{theme}=Globalthemeprovider()
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}api/auth/forgotpassword/${id}/${token}`, {
        password,
      })
      .then((res) => {
        if (res) {
          toast.success(res.data.message), router.push("/Authentication/login");
        }
      })
      .catch((e) => toast.error(e.response.data.message));
  };
  useEffect(() => {
    axios
    .get(`${process.env.API_URL}api/auth/forgotpassword/${id}/${token}`)
    .then((res) => console.log("ressss", res))
    .catch((e) => {
      console.log("eeeee", e);
      router.push("/Linkexpired");
    });
  }, []);
  return (
    <React.Fragment>
      <Container>
        <div className="md:mb-[4px] pt-12 pb-14 flex flex-col justify-center items-center">
          <div className={`${
              theme === true
                ? "bg-[#f2f2f2] text-[#000]"
                : "bg-[#000] text-[#f2f2f2]"
            } w-[500px] border-[1px] border-[#f2f2f2] max-sm:max-w-[100%] mx-[auto] max-sm:px-8 max-sm:py-8 rounded-lg px-16 py-14`}>
            <h4 className="text-center font-semibold text-3xl mb-4 tracking-normal">
              Set New Password...
            </h4>
            <form onSubmit={handleSubmit}>
              <Inputdata
                type="password"
                value={password}
                onChange={(event) => setpassword(event.target.value)}
                placeholder="Enter Your Register password..."
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
              />
              <button
                type="submit"
                className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#197693] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Forgotpassword;
