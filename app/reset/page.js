"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  console.log(email);

  async function SendOTP() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", {
        email,
      });
      const { exists } = response.data;
      setEmailExists(exists);
      console.log(exists);
      if (exists) {
        localStorage.setItem("email", email);
        router.push("/reset");
        console.log("User found");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (email) {
      setLoading(false);
      SendOTP();
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
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Password
          </button>
        </div>
      </div>
    );
};

export default ResetPassword;
