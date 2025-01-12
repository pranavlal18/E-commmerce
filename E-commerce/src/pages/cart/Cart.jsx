import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import BuyNowModal from "../../components/buyNowModel/BuyNowModel";
import PaymentModal from "../../components/paymentmodel/PaymentModel";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // State for modals
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);

  // Handle increment quantity
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
    toast.success("Quantity increased");
  };

  // Handle decrement quantity
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
    toast.success("Quantity decreased");
  };

  // Handle delete item from cart
  const handleDelete = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  // Calculate total items and total price
  const cartItemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Discount Logic
  const calculateDiscount = () => {
    let discount = 0;

    // Discount based on quantity
    cartItems.forEach((item) => {
      if (item.quantity >= 5) {
        discount += item.price * item.quantity * 0.1; // 10% discount for quantities >= 5
      }
    });

    // Discount for products priced above ₹20,000
    cartItems.forEach((item) => {
      if (item.price > 20000) {
        discount += item.price * item.quantity * 0.05; // 5% discount for products above ₹20,000
      }
    });

    return discount;
  };

  const discount = calculateDiscount();
  const discountedTotal = cartTotal - discount;

  // Handle Buy Now Click
  const handleBuyNowClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event propagation

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }
    setIsBuyNowModalOpen(true); // Open the BuyNowModal
  };

  // Handle Proceed to Payment
  const handleProceedToPayment = (shippingInfo) => {
    setShippingInfo(shippingInfo); // Set shipping info
    setIsBuyNowModalOpen(false); // Close BuyNowModal
    setIsPaymentModalOpen(true); // Open PaymentModal
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            {/* Cart Items Section */}
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="">
                      <li className="flex py-6 sm:py-6">
                        <div className="flex-shrink-0">
                          <img
                            src={item.productImageUrl}
                            alt={item.title}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <div className="font-semibold text-black">{item.title}</div>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-sm text-gray-500">{item.category}</p>
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            type="button"
                            className="h-7 w-7"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-1 h-7 w-9 rounded-md border text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => handleIncrement(item.id)}
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            onClick={() => handleDelete(item)}
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                          >
                            <Trash size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt="Empty Cart"
                      className="w-20 h-20 mb-4"
                    />
                    <h1 className="text-xl font-semibold text-gray-900">
                      Your cart is empty
                    </h1>
                    <p className="text-gray-500">Add items to your cart to proceed.</p>
                  </div>
                )}
              </ul>
            </section>

            {/* Order Summary Section */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({cartItemTotal} item{cartItemTotal > 1 ? "s" : ""})
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Discount</dt>
                      <dd className="text-sm font-medium text-green-700">- ₹ {discount}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                    <dd className="text-base font-medium text-gray-900">₹ {discountedTotal}</dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={handleBuyNowClick}
                      className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-grey-200 hover:bg-green-600 rounded-xl"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <BuyNowModal
        isOpen={isBuyNowModalOpen}
        onClose={() => setIsBuyNowModalOpen(false)}
        onProceed={handleProceedToPayment}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        shippingInfo={shippingInfo}
      />
    </Layout>
  );
};

export default CartPage;