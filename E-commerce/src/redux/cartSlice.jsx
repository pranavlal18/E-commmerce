import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage
const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

// Initial state for the cart
const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // If item already exists, increase quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // If item doesn't exist, add it to the cart
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update localStorage
    },

    // Remove item from cart
    deleteFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update localStorage
    },

    // Increment quantity of an item
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update localStorage
      }
    },

    // Decrement quantity of an item
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update localStorage
      }
    },
  },
});

// Export actions
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

// Export reducer
export const cartReducer = cartSlice.reducer;