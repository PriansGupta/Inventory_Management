"use client";
import React, { useState, useEffect } from "react";
import UserData from "../data";
import BarChart from "@/Components/Barchart";
import LineChart from "@/Components/Linechart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Statistics from "../page";
import barColors from "../colors";

function OrderStatistics() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const orderCounts = UserData.reduce((acc, curr) => {
    const timestampParts = curr.timestamp.split("/");
    const monthIndex = parseInt(timestampParts[0]) - 1;
    const monthName = months[monthIndex];
    acc[monthName] = (acc[monthName] || 0) + curr.quantity;
    return acc;
  }, {});

  const sortedMonths = Object.keys(orderCounts).sort((a, b) => {
    return months.indexOf(a) - months.indexOf(b);
  });

  const lineChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Number of Orders",
        data: sortedMonths.map((month) => orderCounts[month]),
        backgroundColor: barColors.slice(0, sortedMonths.length),
      },
    ],
  };

  const barChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Number of Orders",
        data: sortedMonths.map((month) => orderCounts[month]),
        backgroundColor: barColors.slice(0, sortedMonths.length),
      },
    ],
  };

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setSlideIndex(index),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((slideIndex + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <Statistics>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center mb-4 mt-2 text-3xl w-full">
          Previous Order Stats
        </h1>
        <div className="w-4/5 mt-8">
          <Slider {...settings}>
            <div className="slide px-4">
              <BarChart chartData={barChartData} />
            </div>
            <div className="slide px-4">
              <LineChart chartData={lineChartData} />
            </div>
          </Slider>
        </div>
      </div>
    </Statistics>
  );
}

export default OrderStatistics;
