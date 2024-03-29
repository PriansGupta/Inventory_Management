"use client";
import Account from "../page";
import SuccessAnimation from "@/Assets/Success.json";
import Lottie from "react-lottie";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import CartContext from "@/Hooks/cartContext";

function Success() {
  const router = useRouter();
  const { emptyCart } = useContext(CartContext);

  useEffect(() => {
    emptyCart();
    setTimeout(() => {
      router.push("/account/get-started");
    }, [4000]);
  }, []);

  return (
    <Account>
      <div className="w-full h-full text-center flex-col justify-center align-middle items-center">
        <div className="mt-[10%]">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: SuccessAnimation,
            }}
            height={200}
            width={200}
          />
          <h1 className="text-2xl font-bold">Message Sent Successfully</h1>
        </div>
      </div>
    </Account>
  );
}

export default Success;
