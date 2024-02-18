"use client";
import { useEffect, useState } from "react";
import Account from "../page";
import SimpleBackdrop from "@/Components/Backdrop";
import Lottie from "react-lottie";
import NoHistory from "@/Assets/NoHistory.json";
import axios from "axios";

function Orders() {
  const [isLoading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))
      : "";

  const getAlerts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/get-alerts",
        {
          email: user.email,
        }
      );
      console.log(response.data.messages);
      setMessages(response.data.messages);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAlerts();
    setLoading(false);
  }, []);

  console.log(messages);
  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="h-full bg-gray-100 p-4">
        <div className="h-[90%] overflow-scroll">
          <h2 className="text-center tracking-wider font-semibold text-3xl py-2">
            Messages
          </h2>
          {messages.length == 0 ? (
            <div className="text-center mt-6">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: NoHistory,
                }}
                height={300}
                width={300}
              />
            </div>
          ) : (
            <ul>
              {messages.map((msg, index) => (
                <li key={index} className="border-b p-4">
                  <h3 className="text-lg font-semibold">From:{msg.from}</h3>
                  <p>Message: {msg.message}</p>
                  {/* Add other details if needed */}
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
