"use client";
import React, { useState } from "react";
import ReactStars from "react-stars";
import Image from "next/image";
import Container from "../Container";
import Loader from "../Loader";
import Link from "next/link";
const Productdetais = ({ singleproduct, loading }) => {
  const [img, setimg] = useState("");
  // const {
  //   title,
  //   description,
  //   thumbnail,
  //   category,
  //   images,
  //   price,
  //   rating,
  //   discountPercentage,
  // } = 
  return (
    <Container>
    {loading && <div className="flex justify-center items-center h-[80vh]"><Loader/></div>}
      {!loading && (
        <div className="grid grid-flow-col grid-col-2 gap-x-6 max-md:grid-flow-row mb-3 md:h-[80vh]">
          <div>
            <Image
              alt={singleproduct?.title}
              src={img ? img : singleproduct?.thumbnail}
              width={300}
              height={400}
              className="w-[100%] h-[400px] object-fill rounded-lg border-[1px] border-[#000]"
            />
            <div className="flex gap-x-2 mt-4 justify-center">
              {singleproduct?.images.slice(0, 3).map((img, index) => {
                return (
                  <Image
                    alt={singleproduct?.title}
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
            <h3 className="font-semibold text-2xl pb-2 pt-10">{singleproduct?.title}</h3>
            <h4 className="text-xl font-semibold">
              Discount :-{" "}
              <span className="text-[green]">{singleproduct?.discountPercentage}%</span>
            </h4>
            <p className="text-lg font-medium">Category :- {singleproduct?.category}</p>
            <ReactStars
              edit={false}
              count={5}
              size={24}
              value={singleproduct?.rating}
              color2={"#ffd700"}
            />
            <p>Description :- {singleproduct?.description}</p>
            <h5 className="text-xl font-semibold">Price:- {singleproduct?.price}$</h5>
            <Link
              href="/"
              className="w-[100%] max-w-[100px] bg-red-600 text-white py-2 block text-center mt-5 font-semibold tracking-wide rounded-lg"
            >
              Add Cart
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Productdetais;
