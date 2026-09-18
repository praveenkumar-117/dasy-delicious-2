import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  const { token, getCartAmount, clearCart } = useContext(StoreContext);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);

  const subtotal = getCartAmount();

  const deliveryCharge = subtotal === 0 ? 0 : subtotal < 500 ? 40 : 0;

  const tax = subtotal * 0.05;

  const total = subtotal + deliveryCharge + tax;

  const handlePayment = () => {
    setPaymentProcessing(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "https://dasy-delicious-2.onrender.com/api/order/verify",
          {
            orderId: orderId,
          },
          {
            headers: {
              token: token,
            },
          },
        );

        if (response.data.success) {
          setOrderAmount(response.data.order.amount);

          clearCart();

          setPaymentProcessing(false);
          setOrderSuccess(true);
        }
      } catch (error) {
        console.log("PAYMENT VERIFY ERROR:", error);
        setPaymentProcessing(false);
      }
    }, 3000);
  };

  if (orderSuccess) {
    return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center px-4">
        <div className="bg-gray-100 w-full max-w-md rounded-xl shadow-md p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl text-green-500">✓</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-500 mb-6">
            Thank you for your order. Your delicious food is on its way!
          </p>

          <div className="bg-gray-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Payment Method</span>

              <span className="font-semibold uppercase">{paymentMethod}</span>
            </div>

            <div className="flex justify-between text-gray-800 mt-3">
              <span>Total Amount</span>

              <span className="font-bold text-orange-600">
                ₹{orderAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 min-h-screen py-8 px-4 sm:px-8">
      {/* Processing Payment Overlay */}

      {paymentProcessing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-100 w-full max-w-sm rounded-xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Processing Payment...
            </h2>

            <p className="text-gray-500 text-sm">
              Please wait while we complete your order.
            </p>

            <div className="mt-5 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-orange-400 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}

      <button
        type="button"
        onClick={() => navigate("/order")}
        disabled={paymentProcessing}
        className="px-2.5 py-1.5 bg-green-400 hover:bg-green-500 active:scale-95 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md"
        title="Go Back"
      >
        ←
      </button>

      <div className="max-w-4xl mx-auto mt-5">
        <div className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-7">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Choose Payment Method
          </h2>

          {/* Payment Methods */}

          <div className="space-y-3">
            {/* Card */}

            <label
              className={`block p-4 bg-white border rounded-lg cursor-pointer transition-all ${
                paymentMethod === "card"
                  ? "border-orange-400"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={paymentProcessing}
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Credit / Debit Card
                  </p>

                  <p className="text-sm text-gray-500">
                    Pay securely using your card
                  </p>
                </div>
              </div>

              {/* Card Form */}

              {paymentMethod === "card" && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    disabled={paymentProcessing}
                    className="sm:col-span-2 p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 disabled:bg-gray-200"
                  />

                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength="19"
                    disabled={paymentProcessing}
                    className="sm:col-span-2 p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 disabled:bg-gray-200"
                  />

                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength="5"
                    disabled={paymentProcessing}
                    className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 disabled:bg-gray-200"
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    disabled={paymentProcessing}
                    className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 disabled:bg-gray-200"
                  />
                </div>
              )}
            </label>

            {/* UPI */}

            <label
              className={`block p-4 bg-white border rounded-lg cursor-pointer transition-all ${
                paymentMethod === "upi"
                  ? "border-orange-400"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={paymentProcessing}
                />

                <div>
                  <p className="font-semibold text-gray-800">UPI</p>

                  <p className="text-sm text-gray-500">Pay using your UPI ID</p>
                </div>
              </div>

              {/* UPI Form */}

              {paymentMethod === "upi" && (
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (example@upi)"
                    disabled={paymentProcessing}
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 disabled:bg-gray-200"
                  />
                </div>
              )}
            </label>

            {/* COD */}

            <label
              className={`block p-4 bg-white border rounded-lg cursor-pointer transition-all ${
                paymentMethod === "cod"
                  ? "border-orange-400"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={paymentProcessing}
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Order Summary */}

          <div className="bg-gray-200 rounded-lg p-5 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between mb-3 text-gray-700">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mb-3 text-gray-700">
              <p>Delivery Fee</p>

              <p>
                {deliveryCharge === 0 && subtotal > 0
                  ? "Free"
                  : `₹${deliveryCharge}`}
              </p>
            </div>

            <div className="flex justify-between mb-4 text-gray-700">
              <p>Tax</p>
              <p>₹{tax.toFixed(2)}</p>
            </div>

            <div className="border-t border-gray-400 pt-4 flex justify-between text-lg">
              <b className="text-gray-800">Total</b>

              <b className="text-orange-600">₹{total.toFixed(2)}</b>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={paymentProcessing || subtotal === 0}
              className="w-full mt-5 py-2.5 bg-orange-400 hover:bg-orange-500 active:scale-[0.98] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Pay ₹{total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
