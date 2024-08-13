"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactStars from "react-stars";
import { usePathname } from "next/navigation";
import Notfound from "../../../public/images/Noimage.jpg"

const Productcard = ({ product,key,grid }) => {
  const pathname = usePathname();
  const {
    _id,
    thumbnail,
    title,
    price,
    rating,
    stock,
    discountPercentage,
    retailer,
    category,
  } = product;
  // console.log("productproductproduct",product)
  const withDiscount = price - ((price * discountPercentage) / 100).toFixed(0);
  return (
    <Link
      href={`/productdata/${_id}`}
      key={key}
      className={`border-[1px] rounded-lg overflow-hidden h-[100%] ${
        pathname === `/productcategory/${category}`
          ? grid === 1
            ? "flex gap-x-3"
            : "flex flex-col"
          : ""
      } ${thumbnail?.includes("https://cdn.dummyjson.com/") === false && "img-hover"}`}
    >
      <div className="relative">
        <div className={`h-[250px] max-sm:h-[180px] overflow-hidden flex-1`}>
          <Image
            src={thumbnail?.includes("https://cdn.dummyjson.com/") ? Notfound : thumbnail}
            className={`${ pathname === `/productcategory/${category}`
          ?
              grid === 1 ? "" : "w-[100%]" :"w-[100%]"
            } object-fill h-[100%] ${thumbnail?.includes("https://cdn.dummyjson.com/") === false && "hover-img"}`}
            width={200}
            height={200}
          />
        </div>
        {retailer?.name?.length > 0 && rating >= 4 && (
          <h4 className="absolute left-0 top-3 uppercase img_clip text-[14px] max-sm:text-[8px] py-[2px] max-sm:px-1 max-sm:leading-4 rounded-tr-lg rounded-br-lg px-2 tracking-wide text-[#f2f2f2] font-extrabold bg-red-500">
            bestseller
          </h4>
        )}
      </div>
      <div className={` ${
        pathname === `/productcategory/${category}`
          ? grid === 1 ? "" : "flex flex-col" :"flex flex-col" } pt-4 px-3 flex flex-col flex-1 w-[100%] justify-between`}>
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
          <span className="text-[green] pl-3">{withDiscount}₹</span>
          <h4
            className={`${stock === "InStock" ? "text-[green]" : "text-[red]"}`}
          >
            {stock === "InStock" ? (
              <span>{stock}</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </h4>
          {retailer?.name?.length > 0 && (
            <h4 className="capitalize text-[#197693]">
              seller:-{retailer?.name}
            </h4>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
