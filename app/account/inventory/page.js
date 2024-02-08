"use client";
import React, { useContext, useEffect, useState } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Account from "../page";
import CartContext from "@/Hooks/cartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SimpleBackdrop from "@/Components/Backdrop";

const ProductSection = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [isLoading, setLoading] = useState(true);

  const getCountForProduct = (productId) => {
    if (typeof window !== "undefined") return cartItems[productId]?.count ?? 0;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  // console.log(cartItems);
  const products = [
    {
      id: 11,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/j/c/s-ts12-vebnor-original-imagp6jcsgekgda4.jpeg?q=70",
      category: "Electronics",
      title: "Assorted Wires (Pack of 50)",
      price: 250,
    },
    {
      id: 12,
      image: "https://example.com/capacitors.jpg",
      category: "Electronics",
      title: "Capacitor Kit (Assorted Values)",
      price: 150,
    },
    {
      id: 13,
      image: "https://example.com/breadboard.jpg",
      category: "Electronics",
      title: "Breadboard with Jumper Wires",
      price: 180,
    },
    {
      id: 14,
      image:
        "https://images.unsplash.com/photo-1586256053828-a36b572ab01d?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1031w",
      category: "Electronics",
      title: "Resistor Assortment (Pack of 100)",
      price: 120,
    },
    {
      id: 15,
      image: "https://example.com/oscilloscope.jpg",
      category: "Electronics",
      title: "Digital Oscilloscope",
      price: 5000,
    },
    {
      id: 16,
      image: "https://example.com/multimeter.jpg",
      category: "Electronics",
      title: "Digital Multimeter",
      price: 700,
    },
    {
      id: 17,
      image: "https://example.com/power-supply.jpg",
      category: "Electronics",
      title: "Variable Power Supply",
      price: 1500,
    },
    {
      id: 18,
      image: "https://example.com/function-generator.jpg",
      category: "Electronics",
      title: "Function Generator",
      price: 1200,
    },
    {
      id: 19,
      image: "https://example.com/logic-probe.jpg",
      category: "Electronics",
      title: "Logic Probe",
      price: 80,
    },
    {
      id: 20,
      image: "https://example.com/soldering-station.jpg",
      category: "Electronics",
      title: "Soldering Station",
      price: 300,
    },
  ];
  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="container mx-auto mt-8 mb-12 w-[90%] max-h-[90%] overflow-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-md shadow-lg overflow-hidden cursor-pointer ease-in-out transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-32 object-cover mb-4 ease-in-out transition-transform transform rounded-md hover:scale-110"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              {getCountForProduct(product?.id) > 0 ? (
                <div className="flex mt-4 justify-evenly items-center text-black hover:border-white rounded-3xl border-2 border-black">
                  <div
                    onClick={() => addToCart(product)}
                    className="hover:bg-gray-700 flex justify-center align-middle hover:text-white rounded-l-3xl py-2 px-1 w-1/3"
                  >
                    <AddIcon></AddIcon>
                  </div>
                  <p className="font-bold w-1/3 text-center">
                    {getCountForProduct(product.id)}
                  </p>
                  <div
                    onClick={() => removeFromCart(product)}
                    className="hover:bg-gray-700 flex justify-center align-middle hover:text-white py-2 rounded-r-3xl px-1 w-1/3"
                  >
                    <RemoveIcon></RemoveIcon>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 justify-between flex text-black py-2 px-4 rounded-3xl border-2 border-black hover:bg-gray-700 hover:text-white"
                >
                  <ShoppingBagOutlinedIcon />
                  <p className="ml-2 font-bold tracking-wide">Add to cart</p>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Account>
  );
};

export default ProductSection;
