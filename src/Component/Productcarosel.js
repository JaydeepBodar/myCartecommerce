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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Notfound from "../../public/images/Noimage.jpg"
const Productcarosel = ({ category, title, path }) => {
  const { product, loading } = Globalproductcontext();
  const productdara = product?.products?.filter(
    (data) => data?.category === category
  );
  const settings = {
    nav: true,
    pauseOnHover: false,
    slidesToShow: 4,
    margin:15,
    slidesToScroll: 4,
    touchMove: true,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
  return (
    <>
      <div className="product_carosel mb-20 max-md:mb-8">
        <Container>
          <div className="flex justify-between items-center mb-3 max-sm:mb-3">
            <h2 className="text-2xl font-semibold uppercase max-md:text-lg">
              {title} Deal
            </h2>
            <Link
              href={path}
              className="mr-12 tracking-wide uppercase max-sm:text-[13px]"
            >
              view all
            </Link>
          </div>
          <Slider {...settings}>
            {!loading
              ? productdara?.slice(0, 5).map((val, index) => {
                  const {
                    _id,
                    thumbnail,
                    title,
                    price,
                    category,
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
                      className="px-2 rounded-lg mx-[-8px] block"
                    >
                      <div className="flex flex-col flex-wrap">
                        <div className="flex flex-1 flex-col">
                          <Image
                            src={thumbnail?.includes("https://cdn.dummyjson.com/") ? Notfound : thumbnail}
                            width={300}
                            height={250}
                            className="object-fill w-[100%] h-[250px]"
                          />
                        </div>
                        <div className="pt-4 px-3 flex flex-col flex-1">
                          <h3 className="font-semibold text-lg max-sm:text-base capitalize">
                            {title}
                          </h3>
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
                          <div>
                            <del className="text-[gray]">{price}₹</del>
                            <span className="text-[green] pl-3">
                              {withDiscount}₹
                            </span>
                          </div>
                          <h4
                            className={`${
                              stock === "InStock"
                                ? "text-[green]"
                                : "text-[red]"
                            }`}
                          >
                            {stock}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : Array(5) // Adjust the array length based on the number of items you expect
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="px-2 mx-[-8px]">
                      <div className="flex flex-col">
                        <Skeleton
                          width={300}
                          height={250}
                          className="object-fill w-full h-[250px] mx-[-8px]"
                        />
                      </div>
                      <div className="pt-4 px-3 flex flex-col">
                        <Skeleton height={30} width={200} />
                        <Skeleton height={24} width={100} />
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={120} />
                      </div>
                    </div>
                  ))}
          </Slider>
        </Container>
      </div>
    </>
  );
};

export default Productcarosel;
