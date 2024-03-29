"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Container from "../../Container";
import Inputdata from "../../Inputdata";
import Sidebar from "../Sidebar";
import Validations from "../../Validation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Address = () => {
  const router=useRouter()
  const { data } = useSession();
  const {theme}=Globalthemeprovider()
  const [Input, setInput] = useState({
    street: "",
    country: "",
    phoneNo: "",
    state: "",
    zipcode: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const { street, state, country, phoneNo, zipcode, city } = Input;
  const address = [
    {
      name: "street",
      placeholder: "Enter your Street...",
      value: street,
      error: errors.street,
    },
    {
      name: "city",
      placeholder: "Enter your City...",
      value: city,
      error: errors.city,
    },
    {
      name: "zipcode",
      placeholder: "Enter your Zipcode...",
      value: zipcode,
      error: errors.zipcode,
    },
    {
      name: "state",
      placeholder: "Enter your State...",
      value: state,
      error: errors.state,
    },
    {
      name: "country",
      placeholder: "Enter your Country...",
      value: country,
      error: errors.country,
    },
    {
      name: "phoneNo",
      placeholder: "Enter your Phone No...",
      value: phoneNo,
      error: errors.phoneNo,
    },
  ];
  const handleSubmit = (e) => {
    // console.log("...Input", { ...Input });
    e.preventDefault();
    if (
      street !== "" &&
      city !== "" &&
      state !== "" &&
      country !== "" &&
      zipcode !== "" &&
      phoneNo !== ""
    ) {
      axios
        .post(`${process.env.API_URL}api/Address`, {
          ...Input,user:data?.user?._id 
        })
        .then((res) => toast.success(res?.data?.message),router.push('/User'))
        .catch((e) => console.log("e", e));
    } else {
      setErrors(Validations(Input));
    }
  };
  return (
    <Container>
      <div className="flex py-10 justify-between max-sm:flex-col max-sm:justify-self">
        <div className="max-sm:pb-4 sm:h-[81vh]">
          <Sidebar />
        </div>
        <div className="basis-[75%]">
          <form
            onSubmit={handleSubmit}
            className={`${theme === true ? "bg-[#f2f2f2] text-[#000]" : "bg-[#000] text-[#f2f2f2]"} rounded-lg w-[100%] max-w-[500px] max-sm:py-3 max-sm:px-3 py-6 px-10 border-[#f2f2f2] border-[1px] flex gap-x-3 gap-y-2 justify-between mx-[auto] flex-wrap`}
          >
          <h2 className="mx-[auto] font-semibold text-lg">Add Address</h2>
            {address.map((val, index) => {
              const { name, placeholder, value, error } = val;
              return (
                <>
                  <div
                    className={`${
                      index === 0 || index === 5
                        ? "basis-[100%]"
                        : "basis-[48%] max-sm:basis-[100%]"
                    }`}
                  >
                    <Inputdata
                      name={name}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setInput({ ...Input, [name]: value });
                      }}
                      value={value}
                      data={`bg-[#fff] text-[#000] border-[1px] outline-none px-[6px] py-[10px] max-sm:py-[5px] border-[1px] rounded-lg w-[100%]`}
                      placeholder={placeholder}
                    />
                    {error && <p className="text-red-600">{error}</p>}
                  </div>
                </>
              );
            })}
            <button className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#dc2626] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Address;
