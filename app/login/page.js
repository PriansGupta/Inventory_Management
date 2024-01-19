"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "@/Components/Backdrop";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
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
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("Token:", token);
      route.push("/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.error : error.message
      );
    }
    setLoading(false);
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
