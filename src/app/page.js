"use client";
import React, { useState } from "react";
import Bannercarosel from "@/Component/Bannercarosel";
import Services from "@/Component/Services";
import Productcarosel from "@/Component/Productcarosel";
import Testmonalis from "@/Component/Testmonalis";
import Brand from "@/Component/Brand";
const Homepagedata = () => {
  const [categorydata, setcategorydata] = useState("laptops");
  const categorymap = ["laptops", "jewelery", "watch"];
  return (
    <>
      <Bannercarosel />
      <Services />
      <section>
        <h2 className="text-center font-bold text-3xl max-md:text-xl max-md:text-[22px]">
          Product Portfolio
        </h2>
        <ul className="flex justify-center gap-3">
          {categorymap.map((value, index) => {
            return (
              <li
                key={index}
                className={`${
                  categorydata === value &&
                  "text-[#197693] border-b-[1px] border-b-[#197693] font-semibold"
                } capitalize my-4 cursor-pointer text-lg px-3 max-md:text-sm `}
                onClick={() => setcategorydata(value)}
              >
                {value}
              </li>
            );
          })}
        </ul>
        {(() => {
          switch (categorydata) {
            case "laptops":
              return (
                <Productcarosel
                  category="laptops"
                  title="laptops"
                  path="/productcategory/laptops"
                />
              );
            case "jewelery":
              return (
                <Productcarosel
                  category="jewelery"
                  title="Jewelery"
                  path="/productcategory/jewelery"
                />
              );
            case "watch": 
              return (
                <Productcarosel category="watch" title="Watch" path="/productcategory/watch" />
              );
          }
        })()}
      </section>
      <Testmonalis />
      <Brand/>
    </>
  );
};

export default Homepagedata;
