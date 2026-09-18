import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const MyOrders = () => {
  const navigate = useNavigate();

  const { token, food_list } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);

  const getUserOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "https://dasy-delicious-2.onrender.com/api/order/userorders",
        {
          headers: {
            token: token,
          },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("GET ORDERS ERROR:", error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, [token]);

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-100 text-green-600";
    }

    if (status === "Preparing") {
      return "bg-yellow-100 text-yellow-600";
    }

    if (status === "Out for Delivery") {
      return "bg-blue-100 text-blue-600";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8 px-4 sm:px-8">
      {/* Back Button */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="px-2.5 py-1.5 bg-green-400 rounded-md hover:bg-green-500 cursor-pointer active:scale-95 transition-all duration-200 shadow-sm"
        title="Go Back"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="max-w-5xl mx-auto mt-5">
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-8">
            My Orders
          </h2>

          {/* Orders */}

          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-blue-100 rounded-lg p-4 sm:p-5 shadow-sm"
              >
                {/* Order Header */}

                <div className="flex flex-col sm:flex-row justify-between gap-3 border-b border-gray-200 pb-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`self-start px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}

                <div className="space-y-4">
                  {order.items.map((item, index) => {
                    const food = food_list.find(
                      (foodItem) => foodItem._id === item.itemId,
                    );

                    return (
                      <div key={index} className="flex items-center gap-4">
                        {food ? (
                          <img
                            src={`https://dasy-delicious-2.onrender.com/images/${food.image}`}
                            alt={food.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                            Food
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {food ? food.name : "Food Item"}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-orange-600 whitespace-nowrap">
                          ₹{food ? food.price * item.quantity : 0}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Order Total */}

                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total</span>

                  <span className="font-bold text-lg text-gray-800">
                    ₹{order.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
