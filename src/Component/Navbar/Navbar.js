import React from "react";
import Container from "../Container";
import Image from "next/image";
import Img from "../../../public/images/logo.jpeg";
 import {MdAccountCircle} from 'react-icons/md'
 import {BsCart3} from 'react-icons/bs'
import Link from "next/link";
const Navbar = () => {
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center flex-wrap">
          <div className="max-lg:basis-[50%]">
          <Link href='/'><Image alt="logo" src={Img} className="w-40 object-fill h-13" /></Link>
          </div>
          <div className="flex max-lg:order-last max-lg:w-[100%] max-lg:mb-3">
            <input
              placeholder="Search..."
              className="rounded-tl-lg w-[400px] max-md:w-[100%] rounded-bl-lg border-none outline-none bg-slate-200 px-3 py-1"
            />
            <button className=" tracking-wide w-[100%] max-w-[80px] bg-red-600 py-1 font-semibold  text-[#fff] rounded-tr-lg rounded-br-lg">
              Search
            </button>
          </div>
          <div className="flex gap-x-3 max-lg:basis-[50%] justify-end">
              <Link href=""><MdAccountCircle className="w-6 h-6" title="Log in"/></Link>
              <Link href=""><BsCart3 title="Cart" className="w-6 h-6"/></Link>
            </div>                      
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
