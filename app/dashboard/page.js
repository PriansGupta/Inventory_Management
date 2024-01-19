"use client";
import Navbar from "@/Components/Navbar";
import NestedList from "@/Components/SIdeBar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SimpleBackdrop from "@/Components/Backdrop";

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

  if (loading) return <SimpleBackdrop open={loading}></SimpleBackdrop>;
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
