import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:7000/api/order/all",
        {
          headers: {
            admintoken: adminToken,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("GET ALL ORDERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const response = await axios.put(
        "http://localhost:7000/api/order/status",
        {
          orderId,
          status: newStatus,
        },
        {
          headers: {
            admintoken: adminToken,
          },
        }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.log("UPDATE ORDER STATUS ERROR:", error);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    if (status === "Out for Delivery") {
      return "bg-blue-100 text-blue-700 border-blue-200";
    }

    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            All Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and track all customer orders
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              Loading orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              No orders found
            </p>
          </div>
        ) : (
          /* Orders Table */
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">

            {/* Table Header */}
            <div className="px-5 py-4 bg-orange-400 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Orders List
              </h2>

              <span className="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
                {orders.length} Orders
              </span>
            </div>

            {/* Horizontal Scroll */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead className="bg-orange-50">
                  <tr>
                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                      Order
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                      Customer
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                      Items
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                      Total
                    </th>

                    

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-gray-100 hover:bg-blue-50 transition-colors"
                    >

                      {/* Order ID */}
                      <td className="px-5 py-5">
                        <span className="font-semibold text-gray-800">
                          #{order._id.slice(-6)}
                        </span>

                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-5">
                        <p className="font-medium text-gray-800">
                          {order.address.firstName}{" "}
                          {order.address.lastName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.address.phone}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="px-5 py-5">
                        <div className="space-y-1.5">
                          {order.items.map((item) => (
                            <div
                              key={item.itemId}
                              className="text-sm"
                            >
                              <span className="font-medium text-gray-800">
                                {item.name}
                              </span>

                              <span className="text-gray-500 ml-2">
                                × {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-5">
                        <span className="font-bold text-gray-800">
                          ₹{order.amount.toFixed(2)}
                        </span>
                      </td>

                     

                      {/* Status */}
                      <td className="px-5 py-5">

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-lg border text-sm font-medium outline-none cursor-pointer ${getStatusClass(
                            order.status
                          )}`}
                        >
                          <option value="Food Processing">
                            Food Processing
                          </option>

                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AllOrders;