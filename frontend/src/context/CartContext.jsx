/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("homedine_cart");
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      return parsed
        .map((item) => ({
          ...item,
          numericPrice:
            typeof item.numericPrice === "number" && !isNaN(item.numericPrice)
              ? item.numericPrice
              : Number(String(item.price || 0).replace(/[^\d.]/g, "")) || 0,
        }))
        .filter((item) => item.numericPrice > 0);
    } catch {
      return [];
    }
  });

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem("homedine_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const productId = product._id || product.id;
    const price =
      typeof product.numericPrice === "number" && !isNaN(product.numericPrice)
        ? product.numericPrice
        : Number(String(product.price || 0).replace(/[^\d.]/g, "")) || 0;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prevCart,
        { ...product, id: productId, quantity, numericPrice: price },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.numericPrice * item.quantity,
      0,
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
