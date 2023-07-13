"use client";
import React, { useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-stars";
import { AiOutlineCaretDown } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import Filter from "./Filter";
import Custompagination from "../Custompagination";
import Loader from "../Loader";
const Productlist = ({ product, loading, urlParams }) => {
  const [open, setopen] = useState(false);
  const toogle = () => {
    setopen((prev) => !prev);
  };
  return (
    <Container>
      <div className="max-sm:block sm:hidden relative">
        <div className="absolute left-[220px] top-3">
          <AiOutlineCaretDown />
        </div>
        <button
          className="w-[100%] max-w-[250px] bg-[#f2f2f2] text-left px-3 py-2 rounded-lg mb-3"
          onClick={toogle}
        >
          Filter product
        </button>
      </div>
      <div
        className="flex gap-x-3 max-lg:flex-row max-lg:flex-wrap"
        style={{ alignItems: loading ? "center" : "" }}
      >
        <div
          className={`${
            open === true ? "max-sm:block" : "max-sm:hidden"
          } basis-[20%] max-lg:basis-[100%] max-lg:flex`}
        >
          <Filter />
        </div>
        <div className="basis-[80%] max-lg:basis-[100%]">
          {loading && (
            <div className="flex justify-center items-center h-[80vh]">
              <Loader />
            </div>
          )}
          {product.products?.length === 0 && (
            <div className="flex justify-center items-center h-[80vh]">
              <TypeAnimation
                sequence={["No product Found For Your Filter..."]}
                wrapper="span"
                speed={50}
                className="text-2xl font-bold"
                repeat={Infinity}
              />
            </div>
          )}
          {!loading &&
            product.products?.map((val) => {
              const {
                _id,
                title,
                thumbnail,
                discountPercentage,
                category,
                price,
                rating,
              } = val;
              return (
                <div
                  className="flex max-sm:flex-wrap gap-x-5 max-sm:gap-x-2 mb-3 bg-[#f2f2f2] rounded-lg border-[1px] border-[#e0dede]"
                  key={_id}
                >
                  <div className="basis-[30%] max-lg:basis-[40%] max-sm:basis-[100%]">
                    <Link href={`products/${_id}`}>
                      <Image
                        src={thumbnail}
                        width={300}
                        height={300}
                        className="flex items-stretch h-[250px] max-sm:w-[100%] max-sm:h-[280px] object-fill rounded-tl-lg rounded-bl-lg"
                        alt={title}
                      />
                    </Link>
                  </div>
                  <div className="basis-[50%] max-sm:px-2 max-sm:basis-[100%] max-sm:border-none max-lg:basis-[70%] py-4 border-r-[1px] border-[#e0dede]">
                    <Link href={`products/${_id}`}>
                      <h3 className="font-semibold text-2xl pb-2 max-sm:pb-1">
                        {title}
                      </h3>
                      <h4 className="text-xl font-semibold">
                        Discount :-{" "}
                        <span className="text-[green]">
                          {discountPercentage}%
                        </span>
                      </h4>
                      <p className="text-lg font-medium">
                        Category :- {category}
                      </p>
                      <ReactStars
                        edit={false}
                        count={5}
                        size={24}
                        value={rating}
                        color2={"#ffd700"}
                      />
                    </Link>
                    <div className="max-md:block md:hidden">
                      <h5 className="text-xl font-semibold">
                        Price:- {price}$
                      </h5>
                      <Link
                        href="/"
                        className="w-[100%] max-sm:text-[13px] max-sm:max-w-[80px] max-sm:py-1 max-sm:mt-2 max-w-[100px] bg-red-600 text-white py-2 block text-center mt-5 font-semibold tracking-wide rounded-lg"
                      >
                        Add Cart
                      </Link>
                    </div>
                  </div>
                  <div className="basis-[20%] max-md:hidden pt-6">
                    <h5 className="text-xl font-semibold max-sm:text-xl">
                      Price:- {price}$
                    </h5>
                    <Link
                      href="/"
                      className="w-[100%] max-w-[100px] bg-red-600 text-white py-2 block text-center mt-5 font-semibold tracking-wide rounded-lg"
                    >
                      Add Cart
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {!loading && product.products?.length !== 0 && (
        <Custompagination
          totalitem={product.filterproductscount}
          itemperpage={product.productperpage}
        />
      )}
    </Container>
  );
};

export default Productlist;
