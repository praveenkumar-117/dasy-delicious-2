import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { GrTrash } from "react-icons/gr";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    clearCartItem,
    clearCart,
    getCartAmount,
  } = useContext(StoreContext);

  const isCartEmpty = Object.keys(cartItems).length === 0;

  const subtotal = getCartAmount();

  const deliveryCharge = subtotal === 0 ? 0 : subtotal < 500 ? 40 : 0;

  const tax = subtotal * 0.05;

  const total = subtotal + deliveryCharge + tax;

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-blue-100 p-4 sm:p-6 md:p-8">
      {isCartEmpty ? (
        /* ================= EMPTY CART ================= */

        <div className="w-full min-h-[500px] flex items-center justify-center">
          <div className="w-full max-w-xl bg-gray-100 rounded-2xl shadow-md px-6 py-10 sm:px-10 sm:py-14 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                <span className="text-5xl sm:text-6xl">🍽️</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Your Cart is Hungry!
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-6 max-w-md mx-auto mb-6">
              There are no delicious dishes in your cart yet. Explore our menu
              and discover something tasty for yourself.
            </p>

            <div className="flex justify-center gap-2 text-xl mb-6">
              <span>🍕</span>
              <span>🍔</span>
              <span>🍟</span>
              <span>🍗</span>
              <span>🍰</span>
            </div>

            <button
              onClick={() => navigate("/menu")}
              className="px-7 py-3 bg-orange-400 text-white rounded-lg font-semibold hover:bg-orange-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Explore Delicious Menu
            </button>
          </div>
        </div>
      ) : (
        /* ================= CART ================= */

        <div className="w-full flex flex-col md:flex-row justify-evenly items-start gap-6 md:gap-8">
          {/* Cart Items */}

          <div className="w-full md:w-2/3 bg-gray-100 p-5 sm:p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Shopping Cart
              </h2>

              <button
                type="button"
                onClick={clearCart}
                className="self-start sm:self-auto px-4 py-2 bg-red-100 text-red-600 border border-red-200 rounded-lg font-semibold text-sm hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Clear Cart
              </button>
            </div>

            {Object.entries(cartItems).map(([itemId, quantity]) => {
              const item = food_list.find((food) => food._id === itemId);

              if (!item) return null;

              return (
                <div
                  key={itemId}
                  className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 border-b border-gray-300 px-2 sm:px-4 pb-4 mb-4"
                >
                  <img
                    src={`https://dasy-delicious-2.onrender.com/images/${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 sm:w-[90px] sm:h-[90px] object-cover rounded-lg shadow-sm"
                  />

                  <p className="font-medium text-gray-800 flex-1 min-w-[100px]">
                    {item.name}
                  </p>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="px-3 py-1.5 cursor-pointer hover:bg-red-100 transition-colors"
                    >
                      -
                    </button>

                    <span className="px-3 font-medium">{quantity}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 cursor-pointer hover:bg-green-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-gray-800 min-w-[70px] text-right">
                    ₹{item.price * quantity}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      clearCartItem(item._id);
                    }}
                    className="text-red-500 p-2.5 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                    title="Remove item from cart"
                  >
                    <GrTrash />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}

          <div className="w-full md:w-1/3 bg-gray-100 p-5 sm:p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-5 text-gray-800">
              Order Summary
            </h3>

            <div className="flex justify-between mb-3 text-gray-600">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mb-3 text-gray-600">
              <p>Delivery Charge</p>
              <p>
                {deliveryCharge === 0 && subtotal > 0
                  ? "Free"
                  : `₹${deliveryCharge}`}
              </p>
            </div>

            <div className="flex justify-between mb-4 text-gray-600">
              <p>Tax</p>
              <p>₹{tax.toFixed(2)}</p>
            </div>

            <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-800">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>

            <button
              onClick={() => navigate("/order")}
              className="w-full mt-5 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
