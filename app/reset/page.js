"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  //   console.log(JSON.parse(localStorage.getItem("user")).username);
  const [email, setEmail] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))?.email
      : ""
  );
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (
      password != confirmPassword ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      return 0;
    }
    setLoading(true);
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
      setMessage(
        <p className="tracking-wide font-mono text-green-500">
          {response.data.message}
        </p>
      );
      router.push("/login");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage(
        <p className="tracking-wide font-mono text-red-500">
          Error verifying OTP
        </p>
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (email) {
      toast.success("OTP sent Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
        <div className="container mx-auto p-8 max-w-md select-none">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-2"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm new Password"
              className={`w-full px-4 py-2 border rounded mt-2 ${
                password != confirmPassword ? "border-2 border-red-600" : ""
              }`}
            />
            {password != confirmPassword ? (
              <p className="text-red-500 tracking-wide font-mono">
                Password does not match
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={handleSendOTP}
            className="cursor-pointer text-blue-700 mb-2"
          >
            Resend OTP
          </button>
          {message}
          {password != confirmPassword ||
          password.length == 0 ||
          confirmPassword == 0 ||
          otp.length != 6 ? (
            <button
              disabled
              onClick={handleVerifyOtp}
              className={`w-full px-4 py-2 bg-blue-300 text-white rounded`}
            >
              Update Password
            </button>
          ) : (
            <button
              onClick={handleVerifyOtp}
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded`}
            >
              Update Password
            </button>
          )}
        </div>
        <ToastContainer>
          position="bottom-right" autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="light"
          transition:Bounce
        </ToastContainer>
      </div>
    );
};

export default ResetPassword;
