"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getPricequeryparams } from "@/helper/getPricequeryparams";
import ReactStars from "react-stars";
import { checkbox } from "./checkbox";
import Inputdata from "../Inputdata";
const Filter = () => {
  const router = useRouter();
  const [min, setmin] = useState("");
  const [max, setmax] = useState("");
  const star = [
    { value: 0, name: "rating" },
    { value: 5, name: "rating" },
    { value: 4, name: "rating" },
    { value: 3, name: "rating" },
    { value: 2, name: "rating" },
    { value: 1, name: "rating" },
  ];
  let queryParams;
  // for price
  const buttonClick = () => {
    // if (typeof window === "undefined") {
    queryParams = new URLSearchParams(window.location.search);
    queryParams = getPricequeryparams(queryParams, "min", min);
    queryParams = getPricequeryparams(queryParams, "max", max);
    // console.log("data", queryParams);
    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
    // }
  };
  // for category handler
  const handelClick = (checkBox) => {
    // if (typeof window !== "undefined") {
    queryParams = new URLSearchParams(window.location.search);
    // console.log("query", queryParams);
    // }
    const checkboxes = document.getElementsByName(checkBox.name);
    checkboxes.forEach((val) => {
      // console.log("val !== checkBox", val !== checkBox);
      if (val !== checkBox) val.checked === false;
    });
    if (checkBox.checked === false) {
      queryParams.delete(checkBox.name);
    } else {
      if (queryParams.has(checkBox.name)) {
        queryParams.set(checkBox.name, checkBox.value);
      } else {
        queryParams.append(checkBox.name, checkBox.value);
      }
    }
    if (checkBox.value === "all" || checkBox.value == 0) {
      // console.log("ggggggggggg")
      router.push("/Allshop");
    } else {
      const path = window.location.pathname+"?" + queryParams.toString();
      // console.log("qu", queryParams.toString());
      router.push(path);
    }
  };
  const checkHandler = (checkType, checkValue) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      const value = queryParams.get(checkType);
      // console.log("value", value);
      if (checkValue === value) {
        return true;
      }
      return false;
    }
  };
  return (
    <div className="border-[1px] newdata border-[#ebe6e6] px-3 py-5 max-lg:justify-between max-lg:gap-x-5 max-lg:flex-row max-lg:items-baseline max-lg:flex max-lg:w-[100%] max-md:flex-wrap max-md:gap-x-0">
      <div className="newdata1 pb-4 border-b-[1px] border-[#ebe6e6] max-lg:basis-[30%] max-lg:border-0">
        <h3 className="pl-2 font-semibold pb-2">Price(₹)</h3>
        <div className="flex gap-x-2 max-sm:flex-wrap max-sm:gap-y-2 max-sm:gap-x-[13px]">
          <input
            name="max"
            placeholder="MAX"
            value={max}
            onChange={(e) => setmax(e.target.value)}
            className="outline-none bg-[#f2f2f2] max-sm:w-[70px] max-sm:py-1 max-sm:px-2 w-[80px] py-2 px-3 rounded-lg"
          />
          <input
            name="min"
            placeholder="MIN"
            value={min}
            onChange={(e) => setmin(e.target.value)}
            className="outline-none bg-[#f2f2f2] w-[80px] py-2 px-3 rounded-lg max-sm:w-[70px] max-sm:py-1 max-sm:px-2"
          />
          <button
            onClick={buttonClick}
            className="max-sm:w-[100%] max-sm:py-1 max-sm:px-2 w-[80px] bg-[#197693] px-2 text-white font-semibold rounded-lg"
          >
            Go
          </button>
        </div>
      </div>
      <div className=" pb-4 pt-2 border-b-[1px] max-lg:flex max-md:-order-first max-md:border-t-[#ebe6e6] max-md:border-t-[1px] border-[#ebe6e6] max-lg:basis-[40%] max-lg:flex-wrap max-md:basis-[100%] max-lg:border-0">
        <h3 className="pl-2 font-semibold pb-2 max-lg:basis-[100%]">
          Category
        </h3>
        {checkbox.map((val, index) => {
          const { name, label, value } = val;
          return (
            <div
              key={index}
              className="flex gap-x-2 max-lg:flex-wrap max-lg:basis-[50%]"
            >
              <Inputdata
                label={label}
                value={value}
                defaultChecked={checkHandler(value, name)}
                onClick={(e) => handelClick(e.target)}
                name={name}
                type="radio"
                className="flex-wrap gap-x-2 flex items-center flex-row-reverse justify-end"
              />
            </div>
          );
        })}
      </div>
      <div className="newdata2 pt-2 max-lg:basis-[30%]">
        <h3 className="pl-2 font-semibold pb-2">Rating</h3>
        {star.map((val, index) => {
          const { name, value } = val;
          return (
            <div key={index} className="flex items-center gap-x-1">
              <input
                type="radio"
                value={value}
                name={name}
                defaultChecked={checkHandler(val.val, val.name)}
                onClick={(e) => handelClick(e.target)}
              />
              {index === 0 && <label className="pl-1">Reset</label>}
              <ReactStars
                key={index}
                edit={false}
                className={`${index === 0 && "hidden"}`}
                count={5}
                size={24}
                value={value}
                color2={"#ffd700"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
