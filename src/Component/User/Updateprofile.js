"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, lazy } from "react";
import Inputdata from "../Inputdata";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Globalusercontext } from "@/Context/Userproider";
import { toast } from "react-toastify";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import Loader from "../Loader";
const Updateprofile = () => {
  const session = useSession();
  const { user, loading, loaduser } = Globalusercontext();
  const { theme } = Globalthemeprovider();
  const router = useRouter();
  // console.log("data", session.data);
  const [pic, setPic] = useState(user[0]?.avatar);
  const [Input, setInput] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    setInput({ name: user[0]?.name, email: user[0]?.email });
    loaduser();
  }, [user?.updatedAt, loading]);
  const { name, email } = Input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  const uploadImg = (pics) => {
    // console.log("picssssssssssssssssssss", pics);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "htepld3m");

    data.append(
      "public_id",
      "myCarteCommerce/Useprofile/" + name + "_" + new Date()
    );
    data.append("cloud_name", "dxlicroam");
    fetch("https://api.cloudinary.com/v1_1/dxlicroam/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.API_URL}api/auth/Update`,
        {
          _id: session?.data?.user?._id,
          ...Input,
          avatar: pic,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(
        (res) => toast.success(res.data.message),
        loaduser(),
        router.push("/User")
      )
      .catch((e) => console.log("e", e));
    // router.refresh()
    // console.log("valyesfsfsf", { ...Input, Avtar });
    // console.log("Avtar", avatar);
  };
  // const onChange = (e) => {
  //   console.log("e", e);
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvtarpreview(reader.result);
  //     }
  //   };

  //   setAvtar(e.target.files[0]);
  //   reader.readAsDataURL(e.target.files[0]);
  // };
  return (
    <React.Fragment>
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="md:mb-[4px] py-5 flex flex-col justify-center items-center max-sm:min-h-[60vh]">
          <div
            className={`${
              theme === true
                ? "bg-[#f2f2f2] text-[#000]"
                : "bg-[#000] text-[#f2f2f2]"
            } border-[1px] border-[#f2f2f2] mx-[auto] max-sm:px-8 max-sm:py-8 rounded-lg px-16 py-12`}
          >
            <h4 className="text-center font-semibold text-3xl max-sm:text-xl mb-4 tracking-normal">
              Update Profile...
            </h4>
            <form onSubmit={handleSubmit}>
              <Inputdata
                type="text"
                onChange={handleChange}
                value={name}
                name="name"
                placeholder="Enter your Name..."
                label="Name"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] text-[#000] rounded-lg outline-none"
                className="flex-col"
              />
              <Inputdata
                type="email"
                onChange={handleChange}
                value={email}
                name="email"
                placeholder="Enter your Email..."
                label="Email"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] text-[#000] rounded-lg outline-none"
                className="flex-col"
              />
              <div className="flex items-center gap-x-2 my-2">
                <Image
                  src={user ? user[0]?.avatar : pic}
                  alt={user[0]?.name}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="rounded-full object-fill w-[80px] h-[80px]"
                />
                <Inputdata
                  // name='image'
                  type="file"
                  onChange={(e) => uploadImg(e.target.files[0])}
                  id="formFile"
                  label="Upload Profile"
                  data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] text-[#000] rounded-lg outline-none"
                  className="flex-col"
                />
              </div>
              <button
                type="submit"
                className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#197693] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Updateprofile;
