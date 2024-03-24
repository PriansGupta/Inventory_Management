"use client";
import Account from "../page";
import { useEffect, useContext, useState } from "react";
import SimpleBackdrop from "@/Components/Backdrop";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import Messages from "@/Components/Messages";
import AlertContext from "@/Hooks/alertContext";

function Alerts() {
  const [isLoading, setLoading] = useState(true);
  const { alerts, fetchAlerts } = useContext(AlertContext);
  // console.log(alerts);
  const [isRotate, setRotate] = useState(false);

  const getAlerts = async () => {
    setRotate(true);
    fetchAlerts();
    setLoading(false);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(false);
    fetchAlerts();
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="h-full bg-gray-100 p-4">
        <div className="h-[90%] overflow-scroll">
          <div className="flex justify-around items-baseline p-2">
            <h2 className="text-center tracking-wider font-semibold text-3xl py-2">
              Messages({alerts?.length})
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
          {<Messages messages={alerts}></Messages>}
        </div>
      </div>
    </Account>
  );
}

export default Alerts;
