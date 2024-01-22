"use client";
import { useState } from "react";
import axios from "axios";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("priyanshg615@gmail.com");
  const [emailExists, setEmailExists] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function Reset() {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/check-email",
        {
          email,
        }
      );
      const { exists, user } = response.data;
      setEmailExists(exists);
      //   console.log(exists, user);
      if (exists) {
        // localStorage.setItem("email", email);
        localStorage.setItem("user", JSON.stringify(user));
        try {
          const response = await axios.post(
            "http://localhost:5000/api/send-otp",
            {
              email: JSON.parse(localStorage.getItem("user"))?.username,
            }
          );
          if (response) console.log(response);
          toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          router.push("/reset");
        } catch (error) {
          console.error(error);
        }
        // console.log("User found");
      } else {
        toast.error("User not found", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
    setLoading(false);
  }

  return (
    <div>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="container mx-auto p-8 max-w-md">
        <h1 className="text-3xl mb-6 text-center">Forgot Password</h1>
        <p className="mb-4 text-center">
          Enter your email address below, and we'll send you an OTP to verify
          your email
        </p>
        <div className="mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          onClick={Reset}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Verify Email
        </button>
      </div>
      <ToastContainer>
        position="bottom-right" autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce
      </ToastContainer>
    </div>
  );
};

export default ForgotPassword;
