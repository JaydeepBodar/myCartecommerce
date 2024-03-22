import React from "react";
import Bannercarosel from "@/Component/Bannercarosel";
import Services from "@/Component/Services";
import Productcarosel from "@/Component/Productcarosel";
const homepageData = () => {
  return <section>
    <Bannercarosel />
    <Services/>
    <Productcarosel category="laptops" title="laptops" path="/Laptop"/>
    {/* <Productcarosel category="jewelery" title="Jewelery" path="/Jewelery"/> */}
  </section>;
};

export default homepageData;
