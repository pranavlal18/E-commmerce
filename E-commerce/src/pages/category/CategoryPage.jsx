import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { addToCart, deleteFromCart } from "../../redux/cartSlice"; // Import actions

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

  // Normalize category name for case-insensitive matching
  const normalizedCategoryName = categoryname?.toLowerCase();

  // Filter products by category
  const filterProduct = Array.isArray(getAllProduct)
    ? getAllProduct.filter(
        (obj) =>
          obj.category?.toLowerCase() === normalizedCategoryName ||
          (Array.isArray(obj.category) &&
            obj.category
              .map((cat) => cat.toLowerCase())
              .includes(normalizedCategoryName))
      )
    : [];

  // Handle Add to Cart Button
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 })); // Add a fixed quantity of 1
    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      duration: 3000,
    });
  };

  // Handle Delete from Cart Button
  const handleDeleteFromCart = (product) => {
    dispatch(deleteFromCart(product));
    toast.success(`${product.title} removed from cart!`, {
      position: "bottom-right",
      duration: 3000,
    });
  };

  // Check if a product is already in the cart
  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <Layout>
      <div className="mt-10">
        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-semibold capitalize">{categoryname}</h1>
        </div>

        {/* Loader or Product List */}
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              {/* Product List */}
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  filterProduct.map((item, index) => {
                    const { id, title, price, productImageUrl } = item;
                    const isInCart = isProductInCart(id); // Check if the product is in the cart

                    return (
                      <div
                        key={index}
                        className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                      >
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
                          {/* Image container */}
                          <div className="relative w-full h-80 lg:h-96">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="w-full h-full object-cover"
                              src={productImageUrl}
                              alt="Product Image"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-lg font-medium text-gray-900 mb-2 truncate">
                              {title.substring(0, 25)}
                            </h1>
                            <h1 className="text-lg font-medium text-gray-900 mb-3">
                              ₹{price}
                            </h1>
                            <div className="flex justify-center">
                              {/* Add to Cart or Remove from Cart Button */}
                              {!isInCart ? (
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 w-full text-white py-2 rounded-lg font-bold"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  Add to Cart
                                </button>
                              ) : (
                                <button
                                  className="bg-red-500 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold"
                                  onClick={() => handleDeleteFromCart(item)}
                                >
                                  Remove from Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // No Products Found Section
                  <div className="flex flex-col items-center">
                    <img
                      className="mb-2 w-20 h-20"
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt="No Products Found"
                    />
                    <h1 className="text-black text-xl">
                      No {categoryname} products found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Toaster to display toast messages */}
      <Toaster />
    </Layout>
  );
};

export default CategoryPage;