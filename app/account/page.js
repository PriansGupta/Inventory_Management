"use client";
import Navbar from "@/Components/Navbar";
import NestedList from "@/Components/SIdeBar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SimpleBackdrop from "@/Components/Backdrop";
import AvatarIcon from "@/Components/Avatar";
import SIdeBar from "@/Components/SIdeBar";

function Account({ children }) {
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

  if (loading) return <SimpleBackdrop open={loading}></SimpleBackdrop>;
  else
    return (
      <div className="flex h-[100vh] select-none">
        <div className="w-[25%] flex-col h-full">
          <AvatarIcon></AvatarIcon>
          <div className="bg-gray-100 w-full h-1"></div>
          <SIdeBar></SIdeBar>
        </div>
        <div className="bg-gray-100 w-[75%] h-full">{children}</div>
      </div>
    );
}

export default Account;
