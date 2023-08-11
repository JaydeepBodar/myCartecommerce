"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Inputdata from "../Inputdata";
const Userupdatepassword = () => {
  const router = useRouter();
  const { data } = useSession();
  const [Input, setInput] = useState({
    currentpassword: "",
    newpassword: "",
  });
  const { currentpassword, newpassword } = Input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentpassword || !newpassword) {
      toast.error("All Field are Required");
    } else {
      await axios
        .put(`${process.env.API_URL}api/auth/Updatepassword`, {
          id: data?.user?._id,
          currentpassword:currentpassword,
          newpassword,
        })
        .then((res) => {
          toast.success(res.data.message);
          if (res.data) {
            router.push("/User");
          }
        })
        .catch((e) => toast.error(e.response.data.message));
    }
  };
  return (
    <React.Fragment>
      <div className="md:mb-[4px] py-5 flex flex-col justify-center items-center max-sm:min-h-[60vh]">
        <div className="bg-[#f2f2f2] mx-[auto] max-sm:px-8 max-sm:py-8 rounded-lg px-16 py-12">
          <h4 className="text-center font-semibold text-3xl max-sm:text-xl mb-4 tracking-normal">
            Upade Password...
          </h4>
          <form onSubmit={handleSubmit}>
            <Inputdata
              type="password"
              onChange={handleChange}
              value={currentpassword}
              name="currentpassword"
              placeholder="Enter your Current Password..."
              label="Current Password:-"
              data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
              className="flex-col"
            />
            <Inputdata
              type="password"
              onChange={handleChange}
              value={newpassword}
              name="newpassword"
              placeholder="Enter your New Password..."
              label="New Password:-"
              data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
              className="flex-col"
            />
            <button
              type="submit"
              className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#dc2626] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Userupdatepassword;
