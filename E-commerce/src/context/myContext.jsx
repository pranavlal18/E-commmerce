import { createContext, useState } from "react";

const myContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getAllProduct, setAllProduct] = useState([]);

  // Define the addToCart function
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    console.log("Item added to cart:", item); // Debugging
  };

  // Pass the addToCart function in the context value
  return (
    <myContext.Provider
      value={{ getAllProduct, loading, cart, addToCart }} // Ensure addToCart is included
    >
      {children}
    </myContext.Provider>
  );
};

export default myContext;