"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Inputdata from "../Inputdata";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Globalusercontext } from "@/Context/Userproider";
import { toast } from "react-toastify";
const Updateprofile = () => {
  const session=useSession()
  useEffect
  const{user,loading,loaduser,setuser}=Globalusercontext()
  const router=useRouter()
  // console.log("sesssssssssss", session);
  console.log("data",session.data)
  const [Input, setInput] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    if (session.data?.user) {
      setuser(user);
      setInput(session.data?.user)
    }
    loaduser()
  }, [user?.updatedAt]);
  // const [avatar, setAvtar] = useState("");
  // // console.log("Avtar", Avtar);
  // const [Avtarpreview, setAvtarpreview] = useState("/images/useravatar.png");
  const { name, email } = Input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  // const uploadImg = (pics) => {
  //   const data = new FormData();
  //   data.append("file", pics);
  //   data.append("upload_preset", "htepld3m");
  //   data.append("cloud_name", "dxlicroam");
  //   fetch("https://api.cloudinary.com/v1_1/dxlicroam/image/upload/myCartEcommerce/Userprofile", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPic(data.url.toString());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const onChange = (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvtarpreview(reader.result);
  //     }
  //   };

  //   setAvtar(e.target.files[0]);
  //   reader.readAsDataURL(e.target.files[0]);
  //   console.log("reader",reader)
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formdata=new FormData()
    // formdata.set("image",avatar)
    axios
      .put(`${process.env.API_URL}api/auth/Update`, {
        _id: session.data.user?._id,
        ...Input 
      })
      .then((res) =>   toast.success(res.data.message),loaduser(), router.push("/User"),)
      .catch((e) => console.log("e", e));
      // router.refresh()
    // console.log("valyesfsfsf", { ...Input, Avtar });
  };
  return (
    <React.Fragment>
      <div className="md:mb-[4px] py-5 flex flex-col justify-center items-center">
        <div className="bg-[#f2f2f2] mx-[auto] max-sm:px-8 max-sm:py-8 rounded-lg px-16 py-12">
          <h4 className="text-center font-semibold text-3xl max-sm:text-xl mb-4 tracking-normal">
            Upade Profile...
          </h4>
          <form onSubmit={handleSubmit}>
            <Inputdata
              type="text"
              onChange={handleChange}
              value={name}
              name="name"
              placeholder="Enter your Name..."
              label="Name"
              data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
              className="flex-col"
            />
            <Inputdata
              type="email"
              onChange={handleChange}
              value={email}
              name="email"
              placeholder="Enter your Email..."
              label="Email"
              data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
              className="flex-col"
            />
            {/* <div className="flex items-center gap-x-2 my-2">
              <Image
                src={Avtarpreview}
                width={80}
                height={80}
                className="w-[80px] h-[80px] object-cover rounded-full"
              />
              <Inputdata
                type="file"
                onChange={onChange}
                label="Upload Profile"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
              />
            </div> */}
            <button
              type="submit"
              className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#dc2626] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Updateprofile;
