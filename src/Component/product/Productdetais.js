"use client";
import React, { useState } from "react";
import ReactStars from "react-stars";
import Image from "next/image";
import Container from "../Container";
import Loader from "../Loader";
import Link from "next/link";
import { CartgloblContext } from "@/Context/Cartcontext";
const Productdetais = ({ singleproduct, loading }) => {
  const { cart, addItemtocart, deletItem } = CartgloblContext();
  const [img, setimg] = useState("");
  const [btn, setbtn] = useState("Add Cart");
  console.log("singleproduct", singleproduct);
  const Removeitem = () => {
    let text =
      "if you really want to remove item from the cart ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      deletItem(singleproduct?.products?._id);
      setbtn("Add Cart");
    }
  };
  const productbtn = cart?.cartItems?.some(
    (item) => item._id === singleproduct?.products?._id
  );
  return (
    <Container>
      {loading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="grid grid-flow-col grid-col-2 gap-x-6 max-md:grid-flow-row mb-3 py-6">
          <div>
            <Image
              alt={singleproduct?.products?.title}
              src={img ? img : singleproduct?.products?.thumbnail}
              width={300}
              height={400}
              className="w-[100%] h-[400px] object-fill rounded-lg border-[1px] border-[#000]"
            />
            <div className="flex gap-x-2 mt-4 justify-center">
              {singleproduct?.products?.images
                ?.slice(0, 3)
                .map((img, index) => {
                  return (
                    <Image
                      alt={singleproduct?.products?.title}
                      width={150}
                      height={100}
                      className="max-sm:w-[100px] border-[1px] border-[#000] h-[100px] rounded-lg object-fill cursor-pointer"
                      onClick={() => setimg(img)}
                      src={img}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
          <div className="px-2 py-2">
            <h3 className="font-semibold text-2xl pb-2 pt-10">
              {singleproduct?.products?.title}
            </h3>
            <h4 className="text-xl font-semibold">
              Discount :-{" "}
              <span className="text-[green]">
                {singleproduct?.products?.discountPercentage}%
              </span>
            </h4>
            <p className="text-lg font-medium">
              Category :- {singleproduct?.products?.category}
            </p>
            <ReactStars
              edit={false}
              count={5}
              size={24}
              value={singleproduct?.products?.rating}
              color2={"#ffd700"}
            />
            <p>Description :- {singleproduct?.products?.description}</p>
            <h5 className="text-xl font-semibold">
              <span className="text-[green]">
                DiscountPrice:-
                {(
                  (singleproduct?.products?.price *
                    singleproduct?.products?.discountPercentage) /
                  100
                ).toFixed(0)}
                $
              </span>
            </h5>
            <h5 className="text-xl font-semibold">
              Price:- {singleproduct?.products?.price}$
            </h5>
            <div className="flex items-center gap-x-3 mt-5">
              <button
                onClick={() => {
                  addItemtocart({
                    _id: singleproduct?.products?._id,
                    title: singleproduct?.products?.title,
                    thumbnail: singleproduct?.products?.thumbnail,
                    category: singleproduct?.products?.category,
                    discountPercentage:
                      singleproduct?.products?.discountPercentage,
                    price: singleproduct?.products?.price,
                  });
                  if (productbtn === true || cart?.cartItems?.length >= 0) {
                    setbtn("Go to Cart");
                  } else {
                    setbtn("Add Cart");
                  }
                }}
                className="w-[100%] max-w-[100px] bg-red-600 text-white py-2 block text-center font-semibold tracking-wide rounded-lg border-[1px] border-red-600"
              >
                {btn}
              </button>
              {btn === "Go to Cart" && (
                <div
                  className={`${
                    productbtn === false && "hidden"
                  } text-center py-2 w-[100%] max-w-[100px] border-[1px] border-red-600 text-red-600 rounded-lg tracking-wide`}
                  onClick={Removeitem}
                >
                  Remove
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Productdetais;
