"use client";
import Account from "../../page";
import { useState, useEffect } from "react";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SingleMessage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState({});
  const [messages, setMessage] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("messages"))
      : {}
  );

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    setMessageData(messages.find((message) => message._id === id));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="mx-auto w-[90%] mt-8 bg-white rounded-lg overflow-hidden shadow-lg">
        <div onClick={() => router.back()} className="px-6 pt-4 cursor-pointer">
          <ArrowBackIcon></ArrowBackIcon>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Message Details</div>
          <p className="text-gray-700 text-base">
            <span className="font-bold text-gray-800">From:</span>{" "}
            {messageData.from}
          </p>
          <p className="text-gray-700 text-base mt-2">
            <span className="font-bold text-gray-800">Message:</span>{" "}
            {messageData.message}
          </p>
          <p className="text-gray-700 text-base mt-2">
            <span className="font-bold text-gray-800">Timestamp:</span>{" "}
            {messageData.timestamp}
          </p>
        </div>
      </div>
    </Account>
  );
}

export default SingleMessage;
