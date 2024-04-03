import React from "react";
import img1 from "../../public/images/service.svg";
import img2 from "../../public/images/service-02.svg";
import img3 from "../../public/images/service-03.svg";
import img4 from "../../public/images/service-04.svg";
import Container from "./Container";
import Image from "next/image";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Services = () => {
  const {theme}=Globalthemeprovider()
  const service = [
    {
      path: img1,
      title: "Free Shiping",
      contet: "From all order free delivery",
    },
    { path: img2, title: "Daily surprise Offers", contet: "Save upto 35% off" },
    {
      path: img3,
      title: "Affordable price",
      contet: "Our factory direct price",
    },
    { path: img4, title: "Secure Payments", contet: "100% Protected Payments" },
  ];
  return (
    <div className={`${theme === true ? "bg-[#f2f2f2]" : "bg-[#000]"}`}>
      <Container>
        <div className="flex justify-between flex-wrap max-md:gap-y-4 py-20 max-md:py-8  mb-20 max-md:mb-8">
          {service?.map((value, index) => {
            const { path, title, contet } = value;
            {/* console.log("pathpathpath",path) */}
            return (
              <div className="flex items-center gap-x-5 max-sm:basis-[100%]" key={index}>
                <div className="w-[50px] h-[50px] leading-[50px] text-center bg-[#f2f2f2] rounded-full">
                  <Image className="inline-block" src={path} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold max-sm:text-sm max-sm:leading-5">{title}</h3>
                  <h4 className="max-sm:text-[13px] max-sm:leading-5">{contet}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Services;
