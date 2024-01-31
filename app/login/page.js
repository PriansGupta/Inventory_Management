"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "@/Components/Backdrop";
import Link from "next/link";
import Image from "next/image";
import HBTUlogo from "@/Assets/HBTUlogo.png";
import HbtuImage from "@/Assets/hbtuImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const branchArray = [
  { name: "Electronics Engineering" },
  { name: "Computer Science Engineering" },
  { name: "Information Technology" },
  { name: "Mechanical Engineering" },
  { name: "Electrical Engineering" },
  { name: "Civil Engineering" },
  { name: "Paint Technology" },
  { name: "Chemical Engineering" },
  { name: "Bio Chemical Engineering" },
  { name: "Oil Technology" },
  { name: "Leather Technology" },
  { name: "Food Technology" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Branch, setBranch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const route = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
    const token = localStorage.getItem("token");
    if (token) {
      route.push("/account");
    }
  }, []);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        Branch,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Token:", token);
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
      route.push("/account");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
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
      console.error(
        "Login failed:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  useEffect(() => {
    if (Branch.length != 0 && email.length != 0 && password.length != 0)
      setError(false);
    else setError(true);
  }, [Branch, email, password]);

  return (
    <div>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className=" flex select-none">
        <div className="w-1/2">
          <Image
            className="h-[100vh] relative"
            src={HbtuImage}
            alt="HBTU"
          ></Image>
          <h1 className="absolute bottom-7 text-center leading-[5rem] w-2/5 text-white text-5xl font-bold font-mono">
            HBTU INVENTORY MANAGEMENT
          </h1>
        </div>
        <div className="w-1/2 p-8" style={{}}>
          <div className="flex justify-center ">
            <Image
              className="mx-auto mt-2"
              src={HBTUlogo}
              width="100"
              alt="HBTU"
            ></Image>
          </div>
          <div className="mb-4 px-32 mt-10">
            <input
              required
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValidEmail(validateEmail(email));
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {!isValidEmail ? (
              <p className="text-red-500 tracking-wide font-mono">
                Enter a valid email
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4 px-32 relative">
            <input
              required
              type={visible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <span className="cursor-pointer absolute top-2 right-[9rem]">
              {!visible ? (
                <RemoveRedEyeIcon
                  onClick={() => setVisible(!visible)}
                ></RemoveRedEyeIcon>
              ) : (
                <VisibilityOffIcon
                  onClick={() => setVisible(!visible)}
                ></VisibilityOffIcon>
              )}
            </span>
          </div>
          <div className="px-32 mb-4 ">
            <select
              required
              id="Branch"
              style={{
                paddingTop: "4px",
                paddingBottom: "4px",
              }}
              className="dropdown cursor-pointer"
              value={Branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="" disabled>
                Select Department
              </option>
              {branchArray?.map((item, idx) => {
                return (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-32">
            {error || !isValidEmail ? (
              <button
                disabled
                onClick={handleLogin}
                className="w-full px-4 py-2 bg-blue-300 text-white rounded"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Login
              </button>
            )}
          </div>

          <div className="mt-4 text-center">
            <Link className="text-blue-500" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>
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
}
