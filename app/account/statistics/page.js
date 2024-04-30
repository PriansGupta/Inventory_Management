"use client";
import React, { useEffect, useState } from "react";
import Account from "../page";
import Menu from "@/Components/Menu";
import { BarChartRounded } from "@material-ui/icons";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "@/Components/Backdrop";

function Statistics({ children }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const pathname = window.location.pathname;
    const lastPath = pathname.split("/").pop();
    console.log(lastPath);
    if (lastPath === "statistics")
      router.push("/account/statistics/orders-stats");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="flex">
        {/* <div className="w-1/5 flex-col self-center">
          <Menu
            option="Orders-Stats"
            icon={<BarChartRounded></BarChartRounded>}
            action={() => {
              router.push("/account/statistics/orders-stats");
            }}
          ></Menu>
          <Menu
            option="Inventory-Stats"
            icon={<BarChartRounded></BarChartRounded>}
            action={() => {
              router.push("/account/statistics/inventory-stats");
            }}
          ></Menu>
          <Menu
            option="Miscell. Stats"
            icon={<BarChartRounded></BarChartRounded>}
            action={() => {
              router.push("/account/statistics/miscell");
            }}
          ></Menu>
        </div> */}
        <div className="w-4/5">{children}</div>
      </div>
    </Account>
  );
}

export default Statistics;
