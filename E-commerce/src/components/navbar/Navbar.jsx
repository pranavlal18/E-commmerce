import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../searchBar/SearchBar";
import { useEffect, useState } from "react";

const Navbar = () => {
  // Retrieve the user data from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Navigation hook
  const navigate = useNavigate();

  // Access the cart state from Redux
  const cartItems = useSelector((state) => state.cart.items || []); // Default to an empty array if undefined

  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State to force re-render when localStorage changes
  const [cartLength, setCartLength] = useState(cartItemCount);

  // Sync cart length with localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedCartLength = storedCartItems.reduce((total, item) => total + item.quantity, 0);
    setCartLength(storedCartLength);
  }, [cartItems]); // Re-run effect when cartItems change

  // Logout function
  const logout = () => {
    localStorage.removeItem("users"); // Only remove 'users' key
    navigate("/login");
  };

  // Navigation list items
  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      {/* All Products */}
      <li>
        <Link to={"/allproduct"}>All Products</Link>
      </li>

      {/* Signup */}
      {!user && (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      )}

      {/* Login */}
      {!user && (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      )}

      {/* User Dashboard */}
      {user?.role === "user" && (
        <li>
          <Link to={"/userdashboard"}>User Dashboard</Link>
        </li>
      )}

      {/* Admin Dashboard */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admindashboard"}>Admin Dashboard</Link>
        </li>
      )}

      {/* Logout */}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}

      {/* Cart */}
      <li>
        <Link to={"/cart"}>
          Cart ({cartLength}) {/* Dynamic cart count */}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-blue-600 sticky top-0 z-50">
      {/* Main Container */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* Left Section */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl text-center">
              E-Store
            </h2>
          </Link>
        </div>

        {/* Navigation List */}
        <div className="right flex justify-center mb-4 lg:mb-0">
          {navList}
        </div>

        {/* User Greeting and Search Bar */}
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-white font-medium">
              Welcome, {user.name || "Guest"}!
            </span>
          )}
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;