import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCog, FaListUl } from "react-icons/fa";
import { MdAddBox, MdMessage } from "react-icons/md";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="w-1/5 min-h-screen bg-zinc-900 border-r border-zinc-700 py-6 px-3 sm:px-4">

      {/* Header */}
      <div className="flex items-center gap-2 px-2 mb-10">
        <FaUserCog className="text-yellow-400 text-xl sm:text-2xl" />

        <h2 className="text-sm sm:text-lg font-semibold text-white">
          Admin Panel
        </h2>
      </div>


      {/* Options */}
      <div className="flex flex-col gap-2">

        {/* Add Items */}
        <Link
          to="/admin/additems"
          className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-gray-300 hover:bg-zinc-800 hover:text-yellow-400 transition-all duration-200"
        >
          <MdAddBox className="text-xl" />

          <p className="text-sm sm:text-base font-medium">
            Add Items
          </p>
        </Link>


        {/* List Items */}
        <Link
          to="/admin/list"
          className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-gray-300 hover:bg-zinc-800 hover:text-yellow-400 transition-all duration-200"
        >
          <FaListUl className="text-lg" />

          <p className="text-sm sm:text-base font-medium">
            List Items
          </p>
        </Link>


        {/* Orders */}
        <Link
          to="/admin/allorders"
          className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-gray-300 hover:bg-zinc-800 hover:text-yellow-400 transition-all duration-200"
        >
          <TfiLayoutMenuV className="text-lg" />

          <p className="text-sm sm:text-base font-medium">
            Orders List
          </p>
        </Link>


        {/* Customer Feedback */}
        <Link
          to="/admin/feedbacks"
          className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-gray-300 hover:bg-zinc-800 hover:text-yellow-400 transition-all duration-200"
        >
          <MdMessage className="text-lg" />

          <p className="text-sm sm:text-base font-medium">
            Customers Feedback
          </p>
        </Link>


        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-all duration-200 text-left"
        >
          <IoIosLogOut className="text-xl" />

          <span className="text-sm sm:text-base font-medium">
            Logout
          </span>
        </button>

      </div>
    </div>
  );
};

export default AdminSidebar;