import * as React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "./Backdrop";
import MailIcon from "@mui/icons-material/Mail";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import Menu from "./Menu";
import { useState } from "react";
import CartContext from "@/Hooks/cartContext";
import AlertContext from "@/Hooks/alertContext";

export default function SIdeBar() {
  const { cartItems } = useContext(CartContext);
  const { alerts } = useContext(AlertContext);
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const list = [
    {
      option: "Inventory",
      icon: <CategoryIcon />,
      action: () => router.push("/account/inventory/"),
    },
    {
      option: "Alerts",
      icon: (
        <Badge badgeContent={alerts.length} color="secondary">
          <MailIcon />
        </Badge>
      ),
      action: () => router.push("/account/alerts/"),
    },
    {
      option: "Statistics",
      icon: <BarChartIcon />,
      action: () => router.push("/account/statistics/"),
    },
    {
      option: "Orders",
      icon: <HistoryIcon />,
      action: () => router.push("/account/orders"),
    },
    {
      option: "Contact",
      icon: <ContactSupportIcon />,
      action: () => router.push("/contact-us"),
    },
  ];

  if (isLoading) return <SimpleBackdrop open={isLoading}></SimpleBackdrop>;
  else
    return (
      <div className="flex flex-col h-full ">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => router.push("/account/cart/")}
          className={`w-[60%] custom-card transition-transform cursor-pointer mt-3 align-middle items-center font-bold tracking-wide text-md text-green-500 mx-auto flex justify-evenly p-2 bg-green-100 rounded-2xl ${
            hover ? "scale-105 bg-green-200" : ""
          }`}
        >
          <Badge
            badgeContent={Object.values(cartItems).length}
            color="secondary"
          >
            <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
          </Badge>
          <p>Go to Cart</p>
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
