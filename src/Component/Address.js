"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Inputdata from "./Inputdata";
import Validations from "./Validation";
const Address = () => {
	const {data}=useSession()
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
		console.log("...Input",{...Input})
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
        .post(`${process.env.API_URL}api/Address`, { ...Input,user:data?.user?._id })
        .then((res) => console.log("res", res))
        .catch((e) => console.log("e", e));
    } else {
      setErrors(Validations(Input));
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-lg w-[100%] max-w-[500px] max-sm:py-3 max-sm:px-3 py-6 px-10 bg-[#f2f2f2] flex gap-x-3 gap-y-2 justify-between mx-[auto] flex-wrap"
      >
        {address.map((val, index) => {
          const { name, placeholder, value, error } = val;
          return (
            <>
              <div
                className={`${
                  index === 0 || index === 5 ? "basis-[100%]" : "basis-[48%] max-sm:basis-[100%]"
                }`}
              >
                <Inputdata
                  name={name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setInput({ ...Input, [name]: value });
                  }}
                  value={value}
                  data="bg-[#fff] outline-none border-none px-[6px] py-[10px] max-sm:py-[5px] rounded-lg w-[100%]"
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
  );
};	

export default Address;
