"use client";
import React, { useContext, useEffect, useState } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Account from "../page";
import CartContext from "@/Hooks/cartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SimpleBackdrop from "@/Components/Backdrop";
import { client } from "@/utils/configSanity";
import NoResult from "@/Components/noResult";
import Fuse from "fuse.js";

const InventoryData = () => {
  const [products, setProducts] = useState([]);
  const [dummyProducts, setDummyProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))
      : "";

  const fetchData = async () => {
    const query = `*[_type=='inventory']`;
    let data = await client.fetch(query);
    data = data.filter(
      (item) => item.department === user.branch.toLowerCase().replace(/ /g, "_")
    );
    setProducts(data);
    setDummyProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [isLoading, setLoading] = useState(true);

  const getCountForProduct = (productId) => {
    if (typeof window !== "undefined") return cartItems[productId]?.count ?? 0;
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    console.log(term);
    setSearchTerm(term);

    if (term === "") {
      fetchData();
    } else {
      const fuse = new Fuse(dummyProducts, {
        keys: ["title"],
        threshold: 0.4, // Adjust the threshold value (0 to 1)
        distance: 100, // Adjust the distance value
        minMatchCharLength: 1,
      });
      const searchResults = fuse.search(term);
      setProducts(searchResults.map((result) => result.item));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="container mx-auto mt-8 mb-12 w-[90%] max-h-[90%] overflow-scroll">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
          style={{
            width: "100%",
            maxWidth: "300px",
          }}
        />
        {products.length ? (
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
                      onClick={() => removeFromCart(product)}
                      className="hover:bg-gray-700 flex justify-center align-middle hover:text-white py-2 rounded-l-3xl px-1 w-1/3"
                    >
                      <RemoveIcon></RemoveIcon>
                    </div>
                    <p className="font-bold w-1/3 text-center">
                      {getCountForProduct(product.id)}
                    </p>
                    <div
                      onClick={() => addToCart(product)}
                      className="hover:bg-gray-700 flex justify-center align-middle hover:text-white rounded-r-3xl py-2 px-1 w-1/3"
                    >
                      <AddIcon></AddIcon>
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
        ) : (
          <NoResult></NoResult>
        )}
      </div>
    </Account>
  );
};

export default InventoryData;
