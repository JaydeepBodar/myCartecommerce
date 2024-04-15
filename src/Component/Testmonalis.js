"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Container from "./Container";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Testmonalis = () => {
  const [review, setreview] = useState([]);
  const [loading, setloading] = useState(true);
  const { theme } = Globalthemeprovider();
  const settings = {
    nav: false,
    dots: true,
    pauseOnHover: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 3,
    touchMove: true,

    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/Productreview`)
      .then((res) => setreview(res.data.productreview))
      .catch((e) => console.log("eeeee", e))
      .finally(() => setloading(false));
  }, []);
  return (
    <section className=" mb-20 max-md:mb-8 testmonalis_wrapper">
      <h2 className="text-center font-bold text-3xl max-md:text-xl max-md:text-[22px] capitalize pb-6">
        What our customers are saying
      </h2>
      <Container>
        {/* {!loading ? ( */}
        <Slider {...settings}>
          {!loading
            ? review?.map((value, index) => {
                const { reviews } = value;
                if (reviews.length > 0) {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-center my-[30px] px-2 relative z-0"
                    >
                      <div className="absolute top-[-20px] left-[43%] z-10">
                        <Image
                          src={reviews[0]?.userdata?.avatar}
                          width={70}
                          height={70}
                          className="w-[70px] h-[70px] object-fill mt-[-10px] rounded-full border-[1px] block border-[gray] text-center"
                        />
                      </div>
                      <div
                        className={`${
                          theme === true
                            ? "bg-[#f2f2f2] text-[#000]"
                            : "bg-[#000] text-[#f2f2f2]"
                        } border-[1px] border-[#f2f2f2] p-4 rounded-lg z-0`}
                      >
                        <p className="testmonalis pt-10 max-sm:text-[13px]">
                          {reviews[0]?.comment}
                        </p>
                        <h4 className="font-semibold text-right max-sm:text-sm">
                          -&nbsp;{reviews[0]?.userdata?.name}
                        </h4>
                      </div>
                    </div>
                  );
                }
              })
            : Array(4) // Adjust the array length based on the number of items you expect
                .fill()
                .map((_, index) => (
                  <div key={index} className="text-[#000] rounded-lg text-center">
                    <Skeleton
                      width={70}
                      height={70}
                      className="flex w-[70px] h-[70px] object-fill"
                      style={{borderRadius:"50%"}}
                    />
                    <Skeleton
                      height={100}
                      className="max-sm:text-[13px]"
                    />
                    <Skeleton
                      width={100}
                      className="font-semibold text-right max-sm:text-sm"
                    />
                  </div>
                ))}
        </Slider>
        {/* ) : (
          <div className="flex justify-center items-center h-[30vh]">
            <h2 className="text-2xl font-semibold uppercase max-md:text-lg">
              loading...
            </h2>
          </div>
        )} */}
      </Container>
    </section>
  );
};

export default Testmonalis;
