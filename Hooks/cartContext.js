"use client";
import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      try {
        return storedCartItems ? JSON.parse(storedCartItems) : {};
      } catch (error) {
        console.error("Error parsing cartItems from localStorage:", error);
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };

      if (updatedItems[item.id]) {
        updatedItems[item.id] = {
          item,
          count: updatedItems[item.id].count + 1,
        };
      } else {
        updatedItems[item.id] = { item, count: 1 };
      }

      return updatedItems;
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[item.id]) {
        updatedItems[item.id] = {
          ...updatedItems[item.id],
          count: updatedItems[item.id].count - 1,
        };
        if (updatedItems[item.id].count === 0) {
          delete updatedItems[item.id];
        }
      }
      return updatedItems;
    });
  };

  const emptyCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
