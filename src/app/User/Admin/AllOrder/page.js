"use client";
import React, { useState, useEffect } from "react";
import Allorder from "@/Component/Admin/Allorder";
import axios from "axios";

const Order = () => {
  const [loading, setloading] = useState(true);
  const [order, setorder] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/Order/Allorderdata`)
      .then((response) => setorder(response.data.order))
      .catch((e) => console.log("error", e))
      .finally(() => setloading(false));
  }, [loading]);
  return <Allorder order={order} loading={loading}/>;
};

export default Order;
