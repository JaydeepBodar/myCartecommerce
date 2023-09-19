"use client";
import React from "react";
import Container from "../Container";
import Cartitem from "./Cartitem";
import Totalquantityt from "../Totalquantityt";
const cart = () => {
  return (
    <React.Fragment>
      <div className="max-lg:h-[auto]">
        <div className="tracking-[1.2px] bg-red-600 text-white font-semibold text-2xl py-5">
          <Container>
            <h3>
              {" "}
              items (<Totalquantityt />) in Cart
            </h3>
          </Container>
        </div>
        <Container>
            <Cartitem/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default cart;
