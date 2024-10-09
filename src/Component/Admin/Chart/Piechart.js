"use client";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loader from "@/Component/Loader";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const PieChart = ({ chartdata, loading }) => {
  const { theme } = Globalthemeprovider();
  const yearfull = new Date().getFullYear();
  const [year, setyear] = useState(yearfull);
  const yeardata = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  const yearwiseAnyalisis = chartdata?.resultWithAllMonthsAndYears?.filter(
    (item) => item?.year == year
  );
  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Processing", "Shipped", "Out for Delivery", "Delivered"],
    colors: ["#e62626", "#dba81a", "#1369b8", "#008000"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return value + "-" + "order";
        },
      },
    },
  };

  const series = [
    +chartdata?.orderbystatus2,
    +chartdata?.orderbystatus3,
    +chartdata?.orderbystatus4,
    +chartdata?.orderbystatus1,
  ];
  // for bar chart
  const options1 = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: yearwiseAnyalisis?.map((item) => item?.month),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value === 0 ? " " : value ;
        },
      },
    },
    tooltip: {
      theme: theme === true ? "light" : "dark",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "50%",
        borderRadius: 5,
      },
    },
  };

  const series1 = [
    {
      name: "Total Revenue",
      data: yearwiseAnyalisis?.map((item) => item?.totalRevenue + "" + "₹"),
    },
  ];
  return (
    <>
      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
       <>
          <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
            <h4 className="font-light">Order Progress Details</h4>
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              height={350}
              style={{ zIndex: "-1" }}
            />
          </div>
          <div className="mt-8">
            <select
              value={year}
              onChange={(e) => setyear(e.target.value)}
              className="rounded-lg ml-[auto] block px-10 py-3 border-[none] text-[#000] outline-none"
            >
              {yeardata.map((val, index) => {
                return (
                  <option name="year" value={val} key={index}>
                    {val}
                  </option>
                );
              })}
            </select>
            {yearfull >= year ? (
              <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
                <h4 className="font-light">Revenue Details</h4>
                <div className="w-[100%]">
                  <ReactApexChart
                    className="piechart"
                    options={options1}
                    series={series1}
                    type="bar"
                    height={350}
                    width={700}
                    style={{ zIndex: "-1", overflowX: "auto" }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold flex justify-center py-14 max-md:text-xl max-md:w-[350px] max-md:text-center">
                  Selection year is futuer not found any record
                </h2>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PieChart;
