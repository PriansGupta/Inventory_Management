"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";
import SimpleBackdrop from "@/Components/Backdrop";
import AvatarIcon from "@/Components/Avatar";
import SIdeBar from "@/Components/SIdeBar";
import LogoutIcon from "@mui/icons-material/Logout";

function Account({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))
      : "";

  function Logouthandler() {
    setLoading(true);
    localStorage.removeItem("token");
    router.push("/login");
    setLoading(false);
  }
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
          <AvatarIcon
            branch={user.branch}
            email={user.email}
            name={user.name}
          ></AvatarIcon>
          <div className="bg-gray-100 w-full h-1"></div>
          <SIdeBar></SIdeBar>
        </div>
        <div className="bg-gray-100 flex-col w-[75%]">
          <div className="w-full justify-between h-1/6 flex">
            <div className="w-3/4 flex justify-center align-center">
              <h1 className="text-3xl self-center font-semibold tracking-wide">
                Welcome to Dashboard, {user.name}
              </h1>
            </div>
            <div className="w-1/4 flex align-bottom justify-center">
              <div
                onClick={Logouthandler}
                className="mt-2 cursor-pointer transition-all align-middle font-medium items-center tracking-wide text-md mx-auto flex justify-start p-4 rounded-xl text-gray-500"
              >
                <LogoutIcon></LogoutIcon>
                <p className="ml-4 text-lg">Logout</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white h-1"></div>
          <div className="w-full h-5/6">{children}</div>
        </div>
      </div>
    );
}

export default Account;
