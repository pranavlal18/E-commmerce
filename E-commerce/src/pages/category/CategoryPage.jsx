import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();

    // Normalize category name for case-insensitive matching
    const normalizedCategoryName = categoryname?.toLowerCase();

    // Filter products by category
    const filterProduct = Array.isArray(getAllProduct)
        ? getAllProduct.filter((obj) => 
            obj.category?.toLowerCase() === normalizedCategoryName ||
            (Array.isArray(obj.category) && obj.category.map(cat => cat.toLowerCase()).includes(normalizedCategoryName))
          )
        : [];

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
                                        return (
                                            <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
                                                  <button className="bg-blue-500 hover:bg-blue-600 w-full text-white py-2 rounded-lg font-bold">
                                                    Add to Cart
                                                  </button>
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
        </Layout>
    );
};

export default CategoryPage;
