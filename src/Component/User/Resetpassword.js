"use client";
import React,{useState} from "react";
import Container from "../Container";
import Inputdata from "../Inputdata";
import Tostify from "../Tostify";
const Resetpassword = () => {
  const [email, setemail] = useState("");
  return (
    <React.Fragment>
      <Tostify />
      <Container>
        <div className="md:mb-[4px] py-5 flex flex-col justify-center items-center h-[78vh]">
          <div className="w-[500px] bg-[#f2f2f2] max-sm:max-w-[100%] mx-[auto] max-sm:px-8 max-sm:py-8 rounded-lg px-16 py-14">
            <h4 className="text-center font-semibold text-3xl mb-4 tracking-normal">
              Reset Password...
            </h4>
            <form>
              <Inputdata
                type="email"
                value={email}
                onChange={(event) => setemail(event.target.value)}
                placeholder="Enter Your Register Email..."
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
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
