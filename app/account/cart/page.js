"use client";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "@/Hooks/cartContext";
import Account from "../page";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import emptyCartAnimation from "@/Assets/CartAnimation.json";
import Success from "@/Assets/Success.json";
import Lottie from "react-lottie";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  // console.log(cartItems);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="h-full bg-gray-100 p-4">
        <div className="h-[90%] overflow-scroll">
          {Object.values(cartItems).length === 0 ? (
            <div className="text-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: emptyCartAnimation,
                }}
                height={300}
                width={300}
              />
              <p className="text-black font-semibold tracking-wider text-3xl">
                Your cart is empty
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-center tracking-wider font-semibold text-3xl py-2">
                Items Selected
              </h2>
              {Object.values(cartItems).map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="p-4 border border-gray-300 mb-4 bg-white rounded-md shadow-md"
                >
                  <div className="flex items-center">
                    <div className="w-20 h-20 mr-4 relative">
                      <Image
                        src={cartItem.item.image}
                        alt={cartItem.item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">
                        {cartItem.item.title}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        Quantity: {cartItem.count}
                      </p>
                      <div className="flex mt-2 space-x-2">
                        <button
                          onClick={() => removeFromCart(cartItem.item)}
                          className="bg-gray-500 text-white px-2 py-1 hover:bg-gray-600"
                        >
                          <RemoveIcon />{" "}
                        </button>
                        <button
                          onClick={() => addToCart(cartItem.item)}
                          className="bg-gray-500 text-white px-2 py-1 hover:bg-gray-600"
                        >
                          <AddIcon />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                style={{ backgroundColor: "#ff4081" }}
                onClick={() => router.push("/account/success/")}
              >
                Checkout
              </Button>
            </>
          )}
        </div>
      </div>
    </Account>
  );
};

export default Cart;
