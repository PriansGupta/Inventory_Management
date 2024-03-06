"use client";
import Account from "../page";
import { useEffect, useState } from "react";
import SimpleBackdrop from "@/Components/Backdrop";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import Messages from "@/Components/Messages";

function Alerts() {
  const [isLoading, setLoading] = useState(true);
  const [messages, setMessages] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("messages"))
      : []
  );
  const [isRotate, setRotate] = useState(false);
  // console.log(messages);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))
      : "";

  const getAlerts = async () => {
    setRotate(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/get-alerts",
        {
          email: user.email,
        }
      );
      setMessages(response.data.messages);
      localStorage.setItem("messages", JSON.stringify(response.data.messages));
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(false);
    // if (messages?.length > 0) return;
    getAlerts();
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="h-full bg-gray-100 p-4">
        <div className="h-[90%] overflow-scroll">
          <div className="flex justify-around items-baseline p-2">
            <h2 className="text-center tracking-wider font-semibold text-3xl py-2">
              Messages({messages?.length})
            </h2>
            <div
              className={`cursor-pointer flex justify-center items-center ${
                isRotate ? "animate-spin infinite" : ""
              }`}
              onClick={getAlerts}
            >
              <RefreshIcon></RefreshIcon>
            </div>
          </div>
          {<Messages messages={messages}></Messages>}
        </div>
      </div>
    </Account>
  );
}

export default Alerts;
