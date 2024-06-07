"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { ImLocation } from "react-icons/im";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
// import Modal from 'react-modal';
import { Globalusercontext } from "@/Context/Userproider";
const Profile = ({ address }) => {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const { user,loaduser } = Globalusercontext();
  const { data } = useSession();
  // for download images
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const downloadImage = () => {
  //   const link = document.createElement('a');
  //   link.href = user ? user?.avatar : data?.user?.avatar;
  //   link.download = 'image.jpg'; // Set the filename for the downloaded image
  //   link.click();
  // };

  useEffect(() => {
    if (address) {
      setloading(false);
    }
    loaduser();
    router.refresh();
  }, [loading]);
  // console.log("data", data);
  const date=user?.length > 0 ? user[0]?.createdAt : data?.user?.createdAt
  const month = new Date(date).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return (
    <React.Fragment>
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="max-sm:min-h-[60vh] flex items-center">
          <div className="p-4 max-md:p-2 border-[1px] border-[#cecbcb] rounded-lg w-[100%]">
            <div className="flex items-center gap-x-7 pb-5 max-md:gap-x-2	">
              {/*   onClick={openModal} add on click for modal */}
              <div className="max-sm:basis-[80px]">
                <Image
                  src={user?.length > 0 ? user[0]?.avatar : data?.user?.avatar}
                  loading="lazy"
                  width={100}
                  height={100}
                  alt={data?.user?.name}
                  className="w-[100px] h-[100px] max-sm:w-[60px] max-sm:h-[60px] rounded-full"
                />
                {/* for download image */}
                {/* <Modal isOpen={isModalOpen}>
            <img src={user ? user?.avatar : data?.user?.avatar} alt="Image" className="modal-image" />
            <button onClick={closeModal}>Close</button>
            <button onClick={downloadImage}>Download</button>
          </Modal> */}
              </div>
              <div className="text-[18px] max-md:text-[15px]">
                <h4 className="capitalize font-semibold">{user[0]?.name}</h4>
                <div className="flex gap-x-3 flex-wrap items-center">
                  <h5>
                    <span className="font-semibold">Email:-&nbsp;</span>
                    {user?.length > 0 ? user[0]?.email : data?.user?.email }
                  </h5>
                  <h5>
                    <span className="font-semibold">Joined on:-&nbsp;</span>
                    {day}&nbsp;{month}&nbsp;{year}
                  </h5>
                </div>
              </div>
            </div>
            <div className="py-4 max-md:py-2 border-t-[1px] border-b-[1px] border-[#cecbcb] ">
              {address?.map((add, index) => {
                {/* console.log("add", add); */}
                const { street, city, country, phoneNo, state, zipcode, _id } =
                  add;
                return (
                  <div key={index} className="pb-4 max-sm:text-[14px]">
                    <Link
                      href={`/Address/${_id}`}
                      className="leading-[25px] flex gap-x-4"
                      title="address"
                    >
                      <ImLocation className="w-[50px] h-[40px] fill-[#197693]" />
                      <div>
                        <p>
                          {street}, {city},
                        </p>{" "}
                        <p>
                          {state} ,{country},
                        </p>{" "}
                        <p>
                          Contact:-{phoneNo} ,Postalcode:-{zipcode};
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
              <Link
                href="/Address/New"
                className="w-[100%] text-center max-w-[160px] max-sm:text-[14px] max-sm:max-w-[120px] text-[17px] py-1 rounded-lg border-[1px] border-[#197693] text-[#197693] block"
              >
                <button className="flex items-center justify-center w-[100%] gap-x-2 max-md:gap-x-[2px]">
                  <AiOutlinePlus />
                  Add Address
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
