"use client";
import React from "react";
import ReactStars from "react-stars";
import Inputdata from "../Inputdata";
const Filter = () => {
  const checkbox = [
    { name: "category", value: "Smartphones", label: "Smartphones" },
    { name: "category", value: "laptops", label: "Laptops" },
    { name: "category", value: "fragrances", label: "Fragrances" },
    { name: "category", value: "skincare", label: "Skincare" },
    { name: "category", value: "groceries", label: "Groceries" },
    { name: "category", value: "home-decoration", label: "Home-decoration" },
    { name: "category", value: "men's clothing", label: "Men's clothing" },
    { name: "category", value: "jewelery", label: "Jewelery" },
    { name: "category", value: "electronics", label: "Electronics" },
    { name: "category", value: "women's clothing", label: "Women's clothing" },
  ];
  const star = [
    { val: 5, name: "rating" },
    { val: 4, name: "rating" },
    { val: 3, name: "rating" },
    { val: 2, name: "rating" },
    { val: 1, name: "rating" },
  ];
  return (
    <div className="border-[1px] newdata border-[#ebe6e6] px-3 py-5 max-lg:justify-between max-lg:gap-x-5 max-lg:flex-row max-lg:items-baseline max-lg:flex max-lg:w-[100%] max-md:flex-wrap max-md:gap-x-0">
      <div className="newdata1 pb-4 border-b-[1px] border-[#ebe6e6] max-lg:basis-[30%] max-lg:border-0">
        <h3 className="pl-2 font-semibold pb-2">Price($)</h3>
        <div className="flex gap-x-2 max-sm:flex-wrap max-sm:gap-y-2 max-sm:gap-x-[13px]">
          <input
            placeholder="MAX"
            className="outline-none bg-[#f2f2f2] max-sm:w-[70px] max-sm:py-1 max-sm:px-2 w-[80px] py-2 px-3 rounded-lg"
          />
          <input
            placeholder="MIN"
            className="outline-none bg-[#f2f2f2] w-[80px] py-2 px-3 rounded-lg max-sm:w-[70px] max-sm:py-1 max-sm:px-2"
          />
          <button className="max-sm:w-[100%] max-sm:py-1 max-sm:px-2 w-[80px] bg-red-600 px-2 text-white font-semibold rounded-lg">
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
                name={name}
                type="checkbox"
                className="flex-wrap gap-x-2 flex items-center flex-row-reverse justify-end"
              />
            </div>
          );
        })}
      </div>
      <div className="newdata2 pt-2 max-lg:basis-[30%]">
        <h3 className="pl-2 font-semibold pb-2">Rating</h3>
        {star.map((val, index) => {
          return (
            <div key={index} className="flex items-center gap-x-1">
              <input type='checkbox' name={val.name}/>
              <ReactStars
                key={index}
                edit={false}
                className="data"
                count={5}
                size={24}
                value={val.val}
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
