"use client";
import React from "react";
import { Globalproductcontext } from "@/Context/Productprovider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-stars";
const Productcarosel = ({ category, title, path }) => {
  const { product, loading } = Globalproductcontext();
  const productdara = product?.products?.filter(
    (data) => data?.category === category
  );
  const settings = {
    nav: true,
    infinite: false,
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
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
  return (
    <>
      {!loading ? (
        <div className="product_carosel mb-20 max-md:mb-8">
          <Container>
            <div className="flex justify-between items-center mb-3 max-sm:mb-3">
              <h2 className="text-2xl font-semibold uppercase max-md:text-lg">
                {title} Deal
              </h2>
              <Link href={path} className="mr-12 tracking-wide uppercase">
                view all
              </Link>
            </div>
            <Slider {...settings}>
              {productdara?.slice(0, 5).map((val, index) => {
                const {
                  _id,
                  thumbnail,
                  title,
                  price,
                  rating,
                  stock,
                  discountPercentage,
                } = val;
                const withDiscount =
                  price - ((price * discountPercentage) / 100).toFixed(0);
                return (
                  <Link
                    href={`/productdata/${_id}`}
                    key={index}
                    className="px-2 rounded-lg mx-[-8px] flex h-[100%] flex-col justify-stretch"
                  >
                    <div className="w-[100%] h-[250px] overflow-hidden">
                      <Image
                        src={thumbnail}
                        width={300}
                        height={300}
                        className="object-fill w-[100%] h-[100%]"
                      />
                    </div>
                    <div className="pt-4 px-3 bg-[#f2f2f2]">
                      <h3 className="font-semibold text-lg max-sm:text-base capitalize">
                        {title}
                      </h3>
                      <div>
                        <ReactStars
                          edit={false}
                          count={5}
                          size={24}
                          value={rating}
                          color2={"#ffd700"}
                        />
                        <h4 className="text-[green] font-medium">
                          {discountPercentage}% OFF
                        </h4>
                        <del className="text-[gray]">{price}₹</del>
                        <span className="text-[green] pl-3">
                          {withDiscount}₹
                        </span>
                        <h4
                          className={`${
                            stock === "InStock" ? "text-[green]" : "text-[red]"
                          }`}
                        >
                          {stock}
                        </h4>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </Container>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[30vh]">
				<h2 className="text-2xl font-semibold uppercase max-md:text-lg">loading</h2>
        </div>
      )}
    </>
  );
};

export default Productcarosel;
