"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from "../../Container";
import Inputdata from "../../Inputdata";
import Sidebar from "../Sidebar";
import Validations from "../../Validation";
import { useRouter } from "next/navigation";
import Loader from "@/Component/Loader";

const Singleaddress = ({ addressdata }) => {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  // console.log("address", addressdata);
  const getdata = () => {
    setInput(addressdata);
  };
  useEffect(() => {
    if (address) {
      setloading(false);
      getdata();
    }
  }, [loading]);
  const [disable, setdisable] = useState(true);
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
        .put(
          `${process.env.API_URL}api/Address/${addressdata._id}`,
          {
            id: addressdata._id,
            ...Input,
          }
          // {headers: { "Content-type": "application/json" }}
        )
        .then((res) => console.log("updatedata", res))
        .catch((e) => console.log("e", e));
      router.push("/User");
    } else {
      setErrors(Validations(Input));
    }
  };
  return (
    <Container>
      <div className="flex py-10 h-[81.6vh] justify-between max-sm:flex-col max-sm:h-[auto]">
        <div className="max-sm:pb-4">
          <Sidebar />
        </div>
        <div className="basis-[75%]">
          {loading && <div className="flex items-center justify-center h-[60vh]"><Loader/></div>}
					{!loading && <form
            onSubmit={handleSubmit}
            className="rounded-lg w-[100%] max-w-[500px] max-sm:py-3 max-sm:px-3 py-6 px-10 bg-[#f2f2f2] flex gap-x-3 gap-y-2 justify-between mx-[auto] flex-wrap"
          >
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
                        title={disable === true && "disable"}
                        disabled={disable}
                        name={name}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setInput({ ...Input, [name]: value });
                        }}
                        value={value}
                        data={`${
                          disable === true ? "bg-[#9ca3af]" : "bg-[#fff]"
                        } max-sm:text-[14px] outline-none border-none px-3 py-[10px] max-sm:py-[5px] rounded-lg w-[100%]`}
                        placeholder={placeholder}
                      />
                      {error && <p className="text-red-600">{error}</p>}
                    </div>
                  </>
                );
              })}
            <div className="flex w-[100%] gap-x-2 justify-center">
              <div
                title="Edit"
                className="cursor-pointer w-[100%] max-w-[120px] max-sm:max-w-[80px] max-sm:text-[14px] text-center max-sm:py-[5px] py-[10px] border-[1px] border-[#dc2626] mt-2 mb-3 text-[#dc2626] font-semibold tracking-wide rounded-md"
                onClick={() => setdisable(false)}
              >
                Edit
              </div>
              <div
                title="delete"
                className="cursor-pointer w-[100%] max-w-[120px] max-sm:max-w-[80px] max-sm:text-[14px] text-center max-sm:py-[5px] py-[10px] border-[1px] border-[#dc2626] mt-2 mb-3 text-[#dc2626] font-semibold tracking-wide rounded-md"
                onClick={() => {
                  let text =
                    "if you really want to remove item from the cart ? if yes then press ok otherwise press cancle";
                  if (window.confirm(text) == true) {
                    axios
                      .delete(
                        `${process.env.API_URL}api/Address/${addressdata._id}`,
                        { id: addressdata._id, ...Input }
                      )
                      .then((res) => {
                        return res;
                      })
                      .catch((e) => {
                        return e;
                      });
                    router.push("/User");
                  }
                }}
              >
                Delete
              </div>
              <button className="w-[100%] max-w-[120px] max-sm:max-w-[80px] max-sm:text-[14px] text-center max-sm:py-[5px] py-[10px] border-[1px] border-[#dc2626] bg-[#dc2626] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md">
                Submit
              </button>
            </div>
          </form>}
        </div>
      </div>
    </Container>
  );
};

export default Singleaddress;
