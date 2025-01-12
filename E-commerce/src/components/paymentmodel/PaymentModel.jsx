import { useEffect } from "react";
import toast from "react-hot-toast";

const PaymentModal = ({ isOpen, onClose, shippingInfo }) => {
  // Handle payment confirmation
  const handleConfirmPayment = () => {
    toast.success("Payment confirmed!");
    onClose(); // Close the modal
  };

  // Close modal on pressing the Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6">Payment</h2>
        <div className="space-y-4">
          <p>
            <span className="font-medium">Shipping to:</span> {shippingInfo?.name}
          </p>
          <p>
            <span className="font-medium">Address:</span> {shippingInfo?.address}
          </p>
          <p>
            <span className="font-medium">Pincode:</span> {shippingInfo?.pincode}
          </p>
          <p>
            <span className="font-medium">Mobile:</span> {shippingInfo?.mobileNumber}
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmPayment}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;