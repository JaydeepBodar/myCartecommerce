"use client";
import React, { useState } from "react";
import Loader from "../Loader";
import Link from "next/link";
import ReactStars from "react-stars";
import Image from "next/image";
import { CartgloblContext } from "@/Context/Cartcontext";
const Item = ({ product, loading }) => {
  console.log("product", product._id);
  const { cart, addItemtocart } = CartgloblContext();
  const [btn, setbtn] = useState("Add Cart");
  const { _id, title, thumbnail, discountPercentage, category, price, rating } =
    product;
  return (
    <div className="flex max-sm:flex-wrap gap-x-5 max-sm:gap-x-2 mb-3 bg-[#f2f2f2] rounded-lg border-[1px] border-[#e0dede]">
      <div className="basis-[30%] max-lg:basis-[40%] max-sm:basis-[100%]">
        <Link href={`products/${_id}`}>
          <Image
            src={product.thumbnail}
            width={300}
            height={300}
            className="flex items-stretch h-[250px] max-sm:w-[100%] max-sm:h-[280px] object-fill rounded-tl-lg rounded-bl-lg"
            alt={title}
          />
        </Link>
      </div>
      <div className="basis-[50%] max-sm:px-2 max-sm:basis-[100%] max-sm:border-none max-lg:basis-[70%] py-4 border-r-[1px] border-[#e0dede]">
        <Link href={`products/${_id}`}>
          <h3 className="font-semibold text-2xl pb-2 max-sm:pb-1">{title}</h3>
          <h4 className="text-xl font-semibold">
            Discount :-{" "}
            <span className="text-[green]">{discountPercentage}%</span>
          </h4>
          <p className="text-lg font-medium">Category :- {category}</p>
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
            Price:- <del className="text-[red]">{price}$</del>
          </h5>
          <h5 className="text-xl font-semibold max-sm:text-xl">
            <span className="text-[green]">
              DiscountPrice:-
              {(price - (price * discountPercentage) / 100).toFixed(0)}$
            </span>
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
          Price:- <del className="text-[red]">{price}$</del>
        </h5>
        <h5 className="text-xl font-semibold max-sm:text-xl">
          <span className="text-[green]">
            DiscountPrice:-
            {(price - (price * discountPercentage) / 100).toFixed(0)}$
          </span>
        </h5>
        <div
          onClick={() => {
            addItemtocart({
              _id,
              title,
              thumbnail,
              category,
              discountPercentage,
              price,
            });
            const prductbtn = cart?.cartItems?.some((item) => item._id === _id || cart?.cartItems?.length >= 0 ) ;
            console.log("prductbtn", prductbtn);
            if (prductbtn === true) {
              setbtn("Go to Cart");
            } else {
              setbtn("Add Cart");
            }
          }}
          href="/"
          className="w-[100%] max-w-[100px] bg-red-600 text-white py-2 block text-center mt-5 font-semibold tracking-wide rounded-lg"
        >
          {btn}
        </div>
      </div>
    </div>
  );
};

export default Item;
