"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      route.push("/account");
    }
  }, []);

  return <main className="">cmd kvdkvdvk</main>;
}
