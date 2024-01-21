"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  //   console.log(JSON.parse(localStorage.getItem("user")).username);
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user"))?.username
  );
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();
  //   console.log(email);

  async function handleSendOTP() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", {
        email,
      });
      if (response) console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        {
          email,
          otp,
          password,
        }
      );
      console.log(response.data.message);
      setMessage(response.data.message);
      router.push("/login");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Error verifying OTP");
    }
  };

  useEffect(() => {
    if (email) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  if (isLoading) return <SimpleBackdrop open={isLoading}></SimpleBackdrop>;
  else
    return (
      <div>
        <SimpleBackdrop open={isLoading}></SimpleBackdrop>
        <div className="container mx-auto p-8 max-w-md">
          <h1 className="text-3xl mb-6 text-center">Reset Password</h1>
          <p className="mb-4 text-center">Enter the new Password</p>
          <div className="mb-4">
            <input
              onChange={(e) => setOTP(e.target.value)}
              type="text"
              value={otp}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full px-4 py-2 border rounded mt-2"
            />
            <input
              type="text"
              placeholder="Enter New Password"
              className="w-full px-4 py-2 border rounded mt-2"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Confirm new Password"
              className="w-full px-4 py-2 border rounded mt-2"
            />
          </div>
          <button
            onClick={handleSendOTP}
            className="cursor-pointer text-blue-700 mb-2"
          >
            Resend OTP
          </button>
          <button
            onClick={handleVerifyOtp}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Password
          </button>
        </div>
      </div>
    );
};

export default ResetPassword;
