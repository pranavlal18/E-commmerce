import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice"; // Import actions
import toast from "react-hot-toast"; // Import hot-toast
import { Toaster } from "react-hot-toast"; // Import Toaster

const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart.items); // Get cart items from the redux store

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 })); // Add a fixed quantity of 1
    toast.success(`${product.title} added to cart!`, {
      duration: 3000,
      position: "bottom-right",
    });
  };

  // Handle deleting product from cart
  const handleDeleteFromCart = (product) => {
    dispatch(deleteFromCart(product));
    toast.success(`${product.title} removed from cart!`, {
      duration: 3000,
      position: "bottom-right",
    });
  };

  // Check if a product is already in the cart
  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <Layout>
      <div className="py-8">
        {/* Heading */}
        <div className="">
          <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>
        </div>

        {/* Main Section */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">
              {loading && <Loader />}
            </div>
            <div className="flex flex-wrap -m-4">
              {getAllProduct.map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                const isInCart = isProductInCart(id); // Check if the product is in the cart

                return (
                  <div key={index} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="lg:h-80 h-96 w-full object-cover"
                        src={productImageUrl}
                        alt="product"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          E-bharat
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          ₹{price}
                        </h1>

                        <div className="flex justify-center">
                          {/* Add to Cart or Remove from Cart Button */}
                          {!isInCart ? (
                            <button
                              className="bg-blue-500 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                              onClick={() => handleAddToCart(item)} // Add product to cart
                            >
                              Add To Cart
                            </button>
                          ) : (
                            <button
                              className="bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                              onClick={() => handleDeleteFromCart(item)} // Remove product from cart
                            >
                              Remove from Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Toaster to show toasts */}
      <Toaster />
    </Layout>
  );
};

export default AllProduct;