import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import myContext from "../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/cartSlice"; // Import actions
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const [product, setProduct] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct({ ...productTemp.data(), id: productTemp.id }); // Include the Firestore document ID
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    // Handle Add to Cart
    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 })); // Add a fixed quantity of 1
        toast.success(`${product.title} added to cart!`, {
            position: "bottom-right",
            duration: 3000,
        });
    };

    // Handle Delete from Cart
    const handleDeleteFromCart = (product) => {
        dispatch(deleteFromCart(product));
        toast.success(`${product.title} removed from cart!`, {
            position: "bottom-right",
            duration: 3000,
        });
    };

    // Check if the product is already in the cart
    const currentCartItem = cartItems.find((item) => item.id === product.id);
    const isProductInCart = currentCartItem !== undefined;

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="">
                                    <div className="">
                                        <img
                                            className="w-full lg:h-[39em] rounded-lg"
                                            src={product?.productImageUrl}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6 ">
                                        <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {product?.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center mb-6">
                                            <ul className="flex mb-4 mr-2 lg:mb-0">
                                                {/* Star ratings */}
                                            </ul>
                                        </div>
                                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                            <span>₹ {product?.price}</span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                            Description :
                                        </h2>
                                        <p>{product?.description}</p>
                                    </div>

                                    <div className="mb-6 " />
                                    <div className="flex flex-wrap items-center mb-6 gap-4">
                                        {/* Add to Cart Button */}
                                        {!isProductInCart && (
                                            <button
                                                className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-gray-100 rounded-xl"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>
                                        )}

                                        {/* Delete from Cart Button */}
                                        {isProductInCart && (
                                            <button
                                                className="w-full px-4 py-3 text-center text-red-600 bg-red-100 border border-red-600 hover:bg-red-600 hover:text-gray-100 rounded-xl"
                                                onClick={() => handleDeleteFromCart(product)}
                                            >
                                                Remove from Cart
                                            </button>
                                        )}
                                    </div>

                                    {/* Display Current Quantity in Cart */}
                                    {isProductInCart && (
                                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                            Currently in cart: {currentCartItem.quantity}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;