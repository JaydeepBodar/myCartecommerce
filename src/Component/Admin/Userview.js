"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Tostify from "../Tostify";
import { useRouter } from "next/navigation";
const Userview = ({ user }) => {
  const [dropdown, setdropdown] = useState("");
	const router=useRouter()
  const updateDetail = async () => {
    await axios
      .put(`${process.env.API_URL}api/admin/${user._id}`, { role: dropdown })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((e) => console.log("e", e))
      .finally(() => {
        router.refresh();
        router.push("/User/Admin/Alluser");
      });
  };
  return (
    <React.Fragment>
			<Tostify/>
      <div className="bg-[#f2f2f2] p-3 rounded-lg mb-3 leading-6 flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <div>
            <Image
              alt={user?.name}
              src={user?.avatar}
              loading="lazy"
              height={80}
              width={80}
              className="w-[80px] h-[80px] rounded-full"
            />
          </div>
          <div>
            <h3>{user?.name}</h3>
            <h4>{user?.email}</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <h4>User role</h4>
          <select
            name="dropdown"
            value={dropdown ? dropdown : user?.role}
            className="p-2 rounded-lg bg-[#fff] text-[14px]"
            onChange={(e) => setdropdown(e.target.value)}
          >
            <option name="dropdown" value="Admin">
              Admin
            </option>
            <option name="dropdown" value="user">
              User
            </option>
          </select>
          <button
            onClick={updateDetail}
            className="text-[14px] w-[100%] max-w-[100px] bg-[red] text-white mt-2 py-1 font-semibold rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Userview;
