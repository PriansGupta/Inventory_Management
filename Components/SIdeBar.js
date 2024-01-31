import * as React from "react";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "./Backdrop";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Settings } from "@mui/icons-material";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MessageIcon from "@mui/icons-material/Message";
import Menu from "./menu";
import { useState } from "react";

export default function SIdeBar() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  function Logouthandler() {
    setLoading(true);
    localStorage.removeItem("token");
    router.push("/login");
    setLoading(false);
  }

  const list = [
    {
      option: "Alert",
      icon: <AddAlertIcon />,
      action: Logouthandler,
    },
    {
      option: "Settings",
      icon: <Settings />,
      action: Logouthandler,
    },
    {
      option: "Statistics",
      icon: <BarChartIcon />,
      action: Logouthandler,
    },
    {
      option: "Logout",
      icon: <LogoutIcon />,
      action: Logouthandler,
    },
    {
      option: "Contact",
      icon: <ContactSupportIcon />,
      action: Logouthandler,
    },
    {
      option: "Suggestions",
      icon: <MessageIcon />,
      action: Logouthandler,
    },
  ];

  if (isLoading) return <SimpleBackdrop open={isLoading}></SimpleBackdrop>;
  else
    return (
      <div className="flex flex-col h-full ">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`w-[90%] transition-transform cursor-pointer mt-4 align-middle items-center font-bold tracking-wide text-xl text-green-500 mx-auto flex justify-evenly p-4 bg-green-100 rounded-2xl ${
            hover ? "scale-105 bg-green-200" : ""
          }`}
        >
          <LocalShippingIcon fontSize="large"></LocalShippingIcon>
          <p>Create New Order</p>
        </div>
        <div className="w-[90%] mt-2 mx-auto">
          {list.map((item) => {
            return (
              <Menu
                icon={item.icon}
                option={item.option}
                action={item.action}
              ></Menu>
            );
          })}
        </div>
      </div>
    );
}
