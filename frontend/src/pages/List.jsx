import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const List = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = "https://dasy-delicious-2.onrender.com";

  const fetchList = async () => {
    try {
      setIsLoading(true);

      const adminToken = localStorage.getItem("adminToken");

      const response = await axios.get(
        "https://dasy-delicious-2.onrender.com/api/admin/food/list",
        {
          headers: {
            admintoken: adminToken,
          },
        },
      );

      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      console.log("GET FOOD LIST ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const response = await axios.post(
        "https://dasy-delicious-2.onrender.com/api/admin/food/delete",
        { id },
        {
          headers: {
            admintoken: adminToken,
          },
        },
      );

      if (response.data.success) {
        setList((prevList) => prevList.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log("DELETE FOOD ERROR:", error);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex min-h-screen bg-blue-100">
      <AdminSidebar />

      <div className="flex justify-center items-start w-full px-3 sm:px-6">
        <div className="p-6 sm:p-8 my-8 w-4/5 bg-white rounded-2xl shadow-xl">
          {/* Heading */}
          <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
            Food Items
          </h1>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <p className="text-gray-500 font-medium">Loading food items...</p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && list.length === 0 && (
            <div className="flex justify-center items-center py-16">
              <p className="text-gray-500 font-medium">
                No food items available.
              </p>
            </div>
          )}

          {/* Table */}
          {!isLoading && list.length > 0 && (
            <div className="list-table border border-gray-200 rounded-lg overflow-hidden shadow-sm overflow-x-auto">
              <div className="min-w-[650px]">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 font-semibold bg-orange-500 text-white p-4">
                  <div>Image</div>
                  <div>Name</div>
                  <div>Category</div>
                  <div>Price</div>
                  <div className="text-center">Action</div>
                </div>

                {/* Table Rows */}
                {list.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`grid grid-cols-5 gap-4 items-center px-4 py-2 border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    {/* Image */}
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name || "Food Item"}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />

                    {/* Name */}
                    <div className="font-medium text-gray-800 truncate">
                      {item.name}
                    </div>

                    {/* Category */}
                    <div className="text-gray-600 capitalize">
                      {item.category}
                    </div>

                    {/* Price */}
                    <div className="font-semibold text-orange-600">
                      ₹{item.price}
                    </div>

                    {/* Action */}
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200 cursor-pointer"
                        title="Remove item"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
