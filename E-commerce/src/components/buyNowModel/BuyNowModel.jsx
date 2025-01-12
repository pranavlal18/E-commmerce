import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BuyNowModal = ({ isOpen, onClose, onProceed }) => {
  const cartItems = useSelector((state) => state.cart.items);

  // State for shipping information
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
  });

  // Handle Proceed to Payment
  const handleProceedToPayment = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }

    // Validate shipping information
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.pincode || !shippingInfo.mobileNumber) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    // Pass shipping info to the parent component
    onProceed(shippingInfo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
        <form onSubmit={handleProceedToPayment} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingInfo.name}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, name: e.target.value })
              }
              placeholder="Enter your full name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              placeholder="Enter your address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={shippingInfo.pincode}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, pincode: e.target.value })
              }
              placeholder="Enter your pincode"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={shippingInfo.mobileNumber}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, mobileNumber: e.target.value })
              }
              placeholder="Enter your mobile number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNowModal;