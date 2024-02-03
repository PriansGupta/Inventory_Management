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
import Menu from "./Menu";
import { useState } from "react";

export default function SIdeBar() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  function Dummy() {
    setLoading(true);
    console.log("Clicked");
    setLoading(false);
  }

  const list = [
    {
      option: "Alert",
      icon: <AddAlertIcon />,
      action: Dummy,
    },
    {
      option: "Settings",
      icon: <Settings />,
      action: Dummy,
    },
    {
      option: "Statistics",
      icon: <BarChartIcon />,
      action: Dummy,
    },
    {
      option: "Contact",
      icon: <ContactSupportIcon />,
      action: Dummy,
    },
    {
      option: "Suggestions",
      icon: <MessageIcon />,
      action: Dummy,
    },
  ];

  if (isLoading) return <SimpleBackdrop open={isLoading}></SimpleBackdrop>;
  else
    return (
      <div className="flex flex-col h-full ">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`w-[85%] transition-transform cursor-pointer mt-3 align-middle items-center font-bold tracking-wide text-md text-green-500 mx-auto flex justify-evenly p-2 bg-green-100 rounded-2xl ${
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
                key={item.option}
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
