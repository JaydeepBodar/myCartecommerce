"use client";
import React, { useState } from "react";
import Bannercarosel from "@/Component/Bannercarosel";
import Services from "@/Component/Services";
import Productcarosel from "@/Component/Productcarosel";
const Homepagedata = () => {
  const [categorydata, setcategorydata] = useState("laptops");
  const categorymap = ["laptops", "jewelery", "watch"];
  return (
    <section>
      <Bannercarosel />
      <Services />
      <section>
        <h2 className="text-center font-semibold text-3xl max-md:text-xl max-sm:text-lg">Featured Product</h2>
        <ul className="flex justify-center gap-3">
          {categorymap.map((value, index) => {
            return (
              <li
                key={index}
                className={`${
                  categorydata === value &&
                  "text-red-600 border-b-[1px] border-b-red-600 bg-[#f2f2f2] font-semibold"
                } capitalize my-4 cursor-pointer text-lg px-3 max-md:text-base`}
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
                  path="/Laptop"
                />
              );
            case "jewelery":
              return (
                <Productcarosel
                  category="jewelery"
                  title="Jewelery"
                  path="/Jewelery"
                />
              );
            case "watch":
              return (
                <Productcarosel category="watch" title="Watch" path="/Watch" />
              );
          }
        })()}
      </section>
    </section>
  );
};

export default Homepagedata;
