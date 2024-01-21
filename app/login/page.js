"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "@/Components/Backdrop";
import Link from "next/link";

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
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("Token:", token);
      route.push("/dashboard");
      setLoading(false);
    } catch (error) {
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
      <div className="container mx-auto p-8 max-w-md">
        <h1 className="text-3xl mb-6 text-center">Login</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <select
          id="Branch"
          className="dropdown"
          value={Branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option value="Select message Branch">Select Department</option>
          <option value="Electronics Engineering">
            Electronics Engineering
          </option>
          <option value="Computer Science Engineering">
            Computer Science Engineering
          </option>
          <option value="Chemical Engineering">Chemical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Other">Other</option>
        </select>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link className="text-blue-500" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
