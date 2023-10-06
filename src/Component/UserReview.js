"use client";
import React from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
const UserReview = ({ review, user,product }) => {
  console.log("user", user);
  console.log("objectreviews", review._Id);
  const { comment, createdAt, userdata, rating, _id } = review;
  // const deleteone = (id) => {
  //   axios
  //     .delete(`${process.env.API_URL}api/products/${id}`)
  //     .then((res) => toast.success(res.data?.message))
  //     .catch((e) => console.log("e", e));
  // };
  return (
    <div className="bg-[#f2f2f2] p-3 mb-3 rounded-lg" key={_id}>
      <div className="flex gap-x-3 items-center leading-6 ">
        <div>
          <Image
            src={userdata?.avatar}
            height={40}
            alt="Profile image"
            width={40}
            className="rounded-full h-[40px] w-[40px]"
          />
        </div>
        <p>{userdata?.name}</p>
      </div>
      <div>
        {comment?.length > 0 && <p>Review : - {comment}</p>}
        <span className="flex">
          Rating : -{" "}
          <ReactStars
            edit={false}
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
          />
        </span>
        {/* {userdata?._id === user && <p onClick={() => deleteone(_id)}>delete</p>} */}
      </div>
      <p className="text-[14px] text-[gray] text-right">
        Created on : - {moment(createdAt).format("Do MMM YY,h:mm:ss a")}
      </p>
    </div>
  );
};

export default UserReview;
