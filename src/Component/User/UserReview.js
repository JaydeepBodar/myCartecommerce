"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const UserReview = ({
  review,
  user,
  product,
  handleEditing,
  show,
  showdata,
  getApi,
  handleOpen,
}) => {
  // console.log("user", user);
  // console.log("objectreviews", review._Id);
  const { comment, createdAt, userdata, rating, _id } = review;
  const { theme } = Globalthemeprovider();
  const deleteone = () => {
    axios
      .put(`${process.env.API_URL}api/products/Deletereview/${product._id}`, {
        id: _id,
      })
      .then((res) => toast.success(res.data?.message))
      .catch((e) => console.log("e", e));
  };
  return (
    <div
      className={`${
        theme === true ? "bg-[#f2f2f2] text-[#000]" : "bg-[#000] text-[#f2f2f2]"
      } border-[#f2f2f2] border-[1px]  p-3 mb-3 rounded-lg`}
    >
      <div className="flex gap-x-3 items-center leading-6 ">
        <div>
          <Image
            src={userdata?.avatar}
            alt={userdata?.name}
            height={40}
            width={40}
            className="rounded-full h-[40px] w-[40px]"
          />
        </div>
        <p>{userdata?.name}</p>
      </div>
      <div>
        {comment?.length > 0 && <p>Review :- {comment}</p>}
        <div className="flex">
          Rating : -{" "}
          <ReactStars
            edit={false}
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
          />
        </div>
        {userdata?._id === user && (
          <React.Fragment>
            <button
              className="w-[100%] mt-2 max-w-[70px] border-[1px] border-[#197693] text-[#197693] rounded-lg text-[14px] leading-7"
              onClick={() => {
                deleteone(), handleEditing();
              }}
            >
              delete
            </button>
            {!showdata && (
              <button
                onClick={async () => {
                  await getApi(_id), show(), handleOpen();
                }}
                className="w-[100%] ml-3 mt-2 max-w-[70px] border-[1px] border-[#197693] text-white bg-[#197693] rounded-lg text-[14px] leading-7"
              >
                Edit
              </button>
            )}
          </React.Fragment>
        )}
      </div>
      <p className="text-[14px] text-[gray] text-right">
        Created on : - {moment(createdAt).format("Do MMM YY,h:mm:ss a")}
      </p>
    </div>
  );
};

export default UserReview;
