"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactStars from "react-stars";
import Image from "next/image";
import { CartgloblContext } from "@/Context/Cartcontext";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import Notfound from "../../../public/images/Noimage.jpg"

const Item = ({ product, loading }) => {
  // console.log("product", product._id);
  const { cart, addItemtocart, deletItem } = CartgloblContext();
  const [btn, setbtn] = useState("Add Cart");
  const {
    _id,
    title,
    thumbnail,
    discountPercentage,
    category,
    price,
    rating,
    stock,
  } = product;
  const discount = parseInt(
    (price - (price * discountPercentage) / 100).toFixed(0)
  );
  // console.log("discount",typeof discount)
  const productbtn = cart?.cartItems?.some((item) => item._id === _id);
  const Additem = () => {
    addItemtocart({
      _id,
      title,
      thumbnail,
      category,
      discountPercentage,
      price,
      discountprice: discount,
      onlydiscount: price - discount,
    });
    if (productbtn === true || cart?.cartItems?.length >= 0) {
      setbtn("Go to Cart");
    } else {
      setbtn("Add Cart");
    }
  };

  const Removeitem = () => {
    let text =
      "if you really want to remove item from the cart ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      deletItem(_id);
      setbtn("Add Cart");
    }
  };
  // console.log("prductbtn", productbtn);
  const { theme } = Globalthemeprovider();
  return (
    <div
      className={`${
        theme === true ? "bg-[#f2f2f2] text-[#000]" : "bg-[#000] text-[#f2f2f2]"
      } img-hover flex max-sm:flex-wrap gap-x-5 max-sm:gap-x-2 mb-3 rounded-lg border-[1px] border-[#e0dede]`}
    >
      <div className="basis-[30%] max-lg:basis-[40%] max-sm:basis-[100%]">
        <Link href={`productdata/${_id}`} className="block overflow-hidden">
          <Image
            src={product?.thumbnail?.includes("https://cdn.dummyjson.com/") ? Notfound :product?.thumbnail}
            width={300}
            loading="lazy"
            height={300}
            className={`${thumbnail?.includes("https://cdn.dummyjson.com/") === false && "hover-img"} flex items-stretch h-[250px] max-sm:w-[100%] max-sm:h-[280px] object-fill rounded-tl-lg rounded-bl-lg`}
            alt={title}
          />
        </Link>
      </div>
      <div className="basis-[50%] max-sm:px-2 max-sm:basis-[100%] max-sm:border-none max-lg:basis-[70%] py-4 border-r-[1px] border-[#e0dede]">
        <Link href={`productdata/${_id}`}>
          <h3 className="font-semibold text-2xl pb-2 max-sm:pb-1">{title}</h3>
          <h4 className="text-xl font-semibold">
            Discount :-{" "}
            <span className="text-[green]">{discountPercentage}%</span>
          </h4>
          <p className="text-lg font-medium">Category :- {category}</p>
          <div className="flex items-center">
            <ReactStars
              edit={false}
              count={5}
              size={24}
              value={rating}
              color2={"#ffd700"}
            />
            <h3 className="text-lg">
              (&nbsp;
              <span
                className={`${
                  rating <= 2.5 ? "text-[#DC2626]" : "text-[#008000]"
                }`}
              >
                {rating.toFixed(2)}
              </span>{" "}
              Out of 5&nbsp;)
            </h3>
          </div>
        </Link>
        <div className="max-md:block md:hidden">
          <h5 className="text-lg font-semibold">Price:- {price}₹</h5>
          <h5 className="text-lg font-semibold">
            <span className="text-[green]">
              Discount:-
              {((price * discountPercentage) / 100).toFixed(0)}₹
            </span>
          </h5>
          {stock === "InStock" ? (
            <div className="max-md:flex max-md:gap-x-2 items-baseline">
              <button
                onClick={Additem}
                href="#"
                className="w-[100%] max-sm:text-[13px] max-sm:max-w-[80px] max-sm:py-1 max-sm:mt-2 max-w-[100px] bg-[#197693] text-white py-2 block text-center mt-5 font-semibold tracking-wide rounded-lg"
              >
                {btn}
              </button>
              {btn === "Go to Cart" && (
                <div
                  className={`${
                    productbtn === false && "hidden"
                  } max-sm:text-[13px] max-sm:max-w-[80px] max-md:mt-[4px] max-sm:py-[3px] mt-2 text-center py-[6px] w-[100%] max-w-[100px] border-[1px] border-[#197693] text-[#197693] rounded-lg`}
                  onClick={Removeitem}
                >
                  Remove
                </div>
              )}
            </div>
          ) : (
            <h2 className="text-red-600 font-semibold">
              Currently Out of Stock
            </h2>
          )}
        </div>
      </div>
      <div className="basis-[20%] max-md:hidden pt-6">
        <h5 className="text-lg font-semibold max-sm:text-xl">
          Price:-{price}₹
        </h5>
        <h5 className="text-lg font-semibold max-sm:text-xl">
          <span className="text-[green]">
            Discount:-
            {((price * discountPercentage) / 100).toFixed(0)}₹
          </span>
        </h5>
        {stock === "InStock" ? (
          <React.Fragment>
            <Link
              onClick={Additem}
              href={`${btn === "Go to Cart" ? "Cart" : ""}`}
              className="w-[100%] max-w-[100px] bg-[#197693] text-white py-2 block text-center mt-5 font-semibold tracking-wide rounded-lg"
            >
              {btn}
            </Link>
            {btn === "Go to Cart" && (
              <button
                className={`${
                  productbtn === false && "hidden"
                } mt-2 text-center py-[6px] w-[100%] max-w-[100px] border-[1px] border-[#197693] text-[#197693] rounded-lg`}
                onClick={Removeitem}
              >
                Remove
              </button>
            )}
          </React.Fragment>
        ) : (
          <h2 className="text-red-600 font-semibold leading-6">
            Currently Out of Stock
          </h2>
        )}
      </div>
    </div>
  );
};

export default Item;
