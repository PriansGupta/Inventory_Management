"use client";
import Navbar from "@/Components/Navbar";
import NestedList from "@/Components/SIdeBar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  if (loading)
    return (
      <div className="w-1/2 h-1/2 mx-auto my-auto">
        <Skeleton count={10}></Skeleton>;
      </div>
    );
  else
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="flex flex-row">
          <div className="w-1/4 h-[100vh] border-2 border-r border-black">
            <NestedList></NestedList>
          </div>
          <div className="w-3/4 h-[100vh]">
            <Navbar></Navbar>
          </div>
        </div>
      </ThemeProvider>
    );
}

export default dashboard;
