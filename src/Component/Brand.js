"use client";
import React, { lazy } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import img1 from "../../public/images/brand/brand-01.png";
import img2 from "../../public/images/brand/brand-02.png";
import img3 from "../../public/images/brand/brand-03.png";
import img4 from "../../public/images/brand/brand-04.png";
import img5 from "../../public/images/brand/brand-05.png";
import img6 from "../../public/images/brand/brand-06.png";
import img7 from "../../public/images/brand/brand-07.png";
import img8 from "../../public/images/brand/brand-08.png";
import Container from "./Container";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Brand = () => {
  const {theme}=Globalthemeprovider()
  const path = [img1, img2, img3, img4, img5, img6, img7, img8];
  return (
    <section className="mb-20 max-md:mb-8">
      <h2 className="text-center font-bold text-3xl max-md:text-xl max-md:text-[22px] capitalize pb-6">
        top brands
      </h2>
      <Container>
        <div className="shadow-lg">
        <Marquee className="brand-logo">
          <div className={`${theme === true ? "bg-[#f2f2f2] text-[#000]" : "bg-[#000] text-[#f2f2f2]"} flex justify-center`}>
            {path?.map((val, index) => {
              return (
                <Image
                  key={index}
                  src={val}
                  width={50}
                  height={50}
                  className="w-[100%] p-8 max-sm:p-4 flex-1"
                />
              );
            })}
          </div>
        </Marquee>
        </div>
      </Container>
    </section>
  );
};

export default Brand;
