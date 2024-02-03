"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import HBTU_BG from "@/Assets/BG-HBTU.jpg";
import Link from "next/link";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      route.push("/account");
    }
  }, []);

  return (
    <main className="select-none">
      <Image
        src={HBTU_BG}
        alt="HBTU Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-black text-5xl font-bold mb-12">HBTU INVENTORY</h1>
        <div className="flex justify-center space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 w-1/3 text-white px-4 font-semibold tracking-wide hover:opacity-90 py-3 rounded-full"
          >
            Login
          </Link>
          <Link
            href="/contact-us"
            className="bg-yellow-500 w-1/3 text-white px-4 font-semibold tracking-wide hover:opacity-90 py-3 rounded-full"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
