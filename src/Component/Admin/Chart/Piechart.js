import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ chartdata, loading }) => {
  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Delivered", "Processing"],
    colors: ["#008000", "#e62626"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
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

  const series = [+chartdata?.orderbystatus1, +chartdata?.orderbystatus2];

  return (
    <>
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
            <h4 className="font-light">Order Progress Details</h4>
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              height={350}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PieChart;
