import React from "react";
import img1 from "../../public/images/service.png";
import img2 from "../../public/images/service-02.png";
import img3 from "../../public/images/service-03.png";
import img4 from "../../public/images/service-04.png";
import Container from "./Container";
import Image from "next/image";
const Services = () => {
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
    <div className="bg-[#f2f2f2]">
      <Container>
        <div className="flex justify-between flex-wrap max-md:gap-y-4 py-20 max-md:py-8  mb-20 max-md:mb-8">
          {service?.map((value, index) => {
            const { path, title, contet } = value;
            return (
              <div className="flex items-center gap-x-5" key={index}>
                <div>
                  <Image src={path} />
                </div>
                <div>
                  <h3 className="text-lg font-normal">{title}</h3>
                  <h4>{contet}</h4>
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
