import React, { useState } from "react";
import { GoMoveToTop } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import newsleter from "../../../public/images/newsletter.png";
import Container from "../Container";
import axios from "axios";
import { toast } from "react-toastify";
const Footer = () => {
  const date = new Date().getFullYear();
  const [email, setemail] = useState("");
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}api/Newsletter`, { email })
      .then((res) => toast.success(res.data.message))
      .catch((e) => {
        if (e.response.status === 409) {
          toast.warn(e.response.data.message);
        }
        if (e.response.status === 403) {
          toast.warn(e.response.data.message);
        }
        if (e.response.status === 500) {
          toast.error(e.response.data.message);
        }
      })
      .finally(() => setemail(""));
  };
  return (
    <>
      <div className="relative text-white bg-[#197693] py-10 max-sm:pt-5 max-sm:pb-2">
        <div
          title="back to top"
          className="absolute right-[30px] px-2 py-1 top-[-20px] bg-[#197693] cursor-pointer"
          onClick={scrollToTop}
        >
          <GoMoveToTop fill="white" className="text-xl font-bold" />
        </div>
        <Container>
          <div className="fotter_bottom">
            <div>
              <div className="flex justify-between flex-wrap gap-y-4 max-md:justify-center">
                <div className="flex gap-x-4 items-center">
                  <Image src={newsleter} />
                  <h4 className="font-bold tracking-wide text-2xl max-sm:text-lg">
                    Subscribe for Newsletter
                  </h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    value={email}
                    placeholder="Enter Your Email..."
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    className="border-[1px] border-[#f2f2f2] text-black py-2 rounded-bl-lg rounded-tl-lg rounded-tr-[0px] rounded-br-[0px] max-sm:p-1"
                  />
                  <button
                    type="submit"
                    className="border-[1px] border-[#f2f2f2] p-2 max-sm:p-1 font-bold rounded-tr-lg rounded-br-lg"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              <div className="grid grid-cols-4 gap-x-5 py-8 max-sm:pt-4 max-sm:px-9 max-sm:pb-2 max-md:grid-cols-2 max-md:gap-y-5 max-sm:gap-x-2 max-sm:gap-y-2 max-md:justify-between">
                <div>
                  <h4>Contact us</h4>
                  <p>
                    Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                    Bangalore-560016
                  </p>
                </div>
                <div>
                  <h4 className="max-sm:ml-[auto]">Information</h4>
                  <ul>
                    <li>
                      <Link href="/Privacypolicy">Privacy & Policy</Link>
                    </li>
                    <li>
                      <Link href="#">Refund Policy</Link>
                    </li>
                    <li>
                      <Link href="#">Shoping Policy</Link>
                    </li>
                    <li>
                      <Link href="#">Terms & Services</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>Accounts</h4>
                  <ul>
                    <li>
                      <Link href="#">Search</Link>
                    </li>
                    <li>
                      <Link href="#">About us</Link>
                    </li>
                    <li>
                      <Link href="/User">Account</Link>
                    </li>
                    <li>
                      <Link href="#">Contact us</Link>
                    </li>
                  </ul>
                </div>
                <div className="max-sm:ml-[auto]">
                  <h4>Quick Links</h4>
                  <ul>
                    <li>
                      <Link href="/productcategory/Headphone">Headphone</Link>
                    </li>
                    <li>
                      <Link href="/productcategory/home-decoration">
                        Home Decoration
                      </Link>
                    </li>
                    <li>
                      <Link href="/productcategory/fragrances">Fragrances</Link>
                    </li>
                    <li>
                      <Link href="/productcategory/skincare">Skin care</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center text-base my-3 pt-3 max-sm:pt-1 max-sm:mb-0  border-t-[1px] border-t-[#f2f2f2] font-bold">
              <p>©{date} all Copy rights are reserved @myCart</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
