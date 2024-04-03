"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from "../../public/images/banner1.jpg";
import Banner2 from "../../public/images/banner2.jpg";
import Banner3 from "../../public/images/banner3.jpg";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
const Bannercarosel = () => {
  const settings = {
    nav: true,
    loop: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  const banerSlider = [
    {
      banertitle: "going,going,almost,gone",
      bannercontent: "above 20% off For special deal!",
      bannerbtn: "Shop deal",
      path: "/Specialdeal",
      inagepath: Banner1,
    },
    {
      banertitle: "going,fast and deal done",
      bannercontent: "Great Groceries deal for you!",
      bannerbtn: "get now",
      path: "/productcategory/groceries",
      inagepath: Banner2,
    },
    {
      banertitle: "Best,almost,gone",
      bannercontent: "above 15% off For all mobile deal",
      bannerbtn: "Buy now",
      path: "/productcategory/smartphones",
      inagepath: Banner3,
    },
  ];
  return (
    <div className="banner-carosel">
      <Slider {...settings}>
        {banerSlider?.map((value, index) => {
          const { banertitle, bannercontent, bannerbtn, path, inagepath } =
            value;
          return (
            <div className="w-[100%] relative" key={index}>
              <div className="object-cover">
                <Image
                  src={inagepath}
                  className="w-[100%] h-[450px] max-sm:w-[auto] max-sm:h-[250px] max-sm:object-fill"
                />
              </div>
              <div className="capitalize text-black absolute top-[30%] left-[10%] max-w-[500px] max-sm:max-w-[250px]">
                <h1 className="leading-[55px] font-semibold text-2xl max-md:text-lg max-sm:text-base">
                  {banertitle}
                </h1>
                <h1 className="font-bold text-3xl max-md:text-xl max-sm:text-lg">
                  {bannercontent}
                </h1>
                <div>
                  <Link
                    href={path}
                    className="leading-5 max-sm:leading-4 w-[100%] max-sm:mt-2 max-w-[150px] max-md:max-w-[100px] max-md:text-sm hover:bg-transparent border-[1px] border-white-600 hover:text-black hover:border-black transition-all duration-500 bg-white text-red-600 py-2 block text-center mt-5 font-semibold tracking-wide uppercase"
                  >
                    {bannerbtn}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Bannercarosel;
