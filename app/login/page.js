"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "@/Components/Backdrop";
import Link from "next/link";
import Image from "next/image";
import HBTUlogo from "../assets/HBTUlogo.png";
import HbtuImage from "../assets/HbtuImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const branchArray = [
  { name: "Electronics Engineering" },
  { name: "Computer Science" },
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [Branch, setBranch] = useState("");

  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      route.push("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
        Branch,
      });
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
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("Token:", token);
      route.push("/dashboard");
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
      console.error(
        "Login failed:",
        error.response ? error.response.data.error : error.message
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className=" flex ">
        <div className="w-1/2">
          <Image className="h-[100vh]" src={HbtuImage}></Image>
        </div>
        <div className="w-1/2 p-8" style={{}}>
          <div className="flex  justify-center ">
            <Image className="ml-6 mt-2" src={HBTUlogo} width="100"></Image>
          </div>
          <h1 className=" mb-6 text-center text-xl">
            HBTU Inventory Management
          </h1>
          <div className="mb-4 px-32">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4 px-32">
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="px-32 mb-4 ">
            <select
              id="Branch"
              style={{
                paddingTop: "4px",
                paddingBottom: "4px",
              }}
              className="dropdown cursor-pointer"
              value={Branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="Select message Branch">Select Department</option>

              {branchArray?.map((item, idx) => {
                return <option value={item.name}>{item.name}</option>;
              })}

              {/* {array_name?.map((item, idx) => {
              return (
                <option value={item.branch_name_key}>{Branch_name_key}</option>
              );
            })} */}
            </select>
          </div>
          <div className="px-32">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
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
