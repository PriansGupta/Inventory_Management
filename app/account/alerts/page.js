"use client";
import { useEffect, useState } from "react";
import Account from "../page";
import SimpleBackdrop from "@/Components/Backdrop";
import Lottie from "react-lottie";
import NoMessages from "@/Assets/NoMessages.json";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";

function Orders() {
  const [isLoading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isRotate, setRotate] = useState(false);
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
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  useEffect(() => {
    getAlerts();
    setLoading(false);
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="h-full bg-gray-100 p-4">
        <div className="h-[90%] overflow-scroll">
          <div className="flex justify-around items-baseline p-2">
            <h2 className="text-center tracking-wider font-semibold text-3xl py-2">
              Messages({messages.length})
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
          {messages.length == 0 ? (
            <div className="text-center mt-6">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: NoMessages,
                }}
                height={300}
                width={300}
              />
            </div>
          ) : (
            <ul>
              {messages
                .slice()
                .reverse()
                .map((msg, index) => (
                  <li
                    key={index}
                    className="border-b mb-1 bg-white w-[90%] mx-auto p-4 shadow-md cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">
                        From : {msg.from}
                      </h3>
                      <h3 className="text-md font-bold">{msg.timestamp}</h3>
                    </div>
                    <p>Message : {msg.message}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </Account>
  );
}

export default Orders;
