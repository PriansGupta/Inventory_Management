"use client";
import React, { createContext, useState } from "react";
import axios from "axios";
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("messages"))
      : []
  );

  const fetchAlerts = async () => {
    const user =
      typeof window !== "undefined"
        ? JSON.parse(localStorage?.getItem("user"))
        : "";
    try {
      const response = await axios.post(
        "https://inventory-backend-latest.vercel.app/api/get-alerts",
        {
          email: user.email,
        }
      );
      setAlerts(response.data.messages);
      localStorage.setItem("messages", JSON.stringify(response.data.messages));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertContext.Provider value={{ alerts, fetchAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
