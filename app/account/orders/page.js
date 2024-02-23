"use client";
import { useEffect, useState } from "react";
import Account from "../page";
import axios from "axios";
import SimpleBackdrop from "@/Components/Backdrop";
import NoHistory from "@/Assets/NoHistory.json";
import Lottie from "react-lottie";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))
      : "";

  const GetOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/get-orders",
        {
          email: user.email,
        }
      );
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetOrders();
    setLoading(false);
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="h-full bg-gray-100 p-4">
        <div className="h-[90%] overflow-scroll">
          <h2 className="text-center tracking-wider font-semibold text-3xl py-2">
            Order History
          </h2>
          {orders.length == 0 ? (
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
              {orders.map((order, index) => (
                <li key={index} className="border-b p-4">
                  <h3 className="text-lg font-semibold">{order.title}</h3>
                  <p>Quantity: {order.quantity}</p>
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