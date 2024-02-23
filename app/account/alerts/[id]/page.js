"use client";
import { useEffect, useState } from "react";
import Account from "../../page";
import { useRouter } from "next/navigation";

export default function Message() {
  const router = useRouter();
  const [id, setId] = useState("");
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/").pop();
    console.log("ID from pathname:", id);
    setId(id);
  }, []);
  return (
    <Account>
      <p>{id}</p>
      <button
        onClick={() => {
          router.push("/account/alerts");
        }}
      >
        Back
      </button>
    </Account>
  );
}
