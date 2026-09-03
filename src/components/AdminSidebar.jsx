import React from 'react';
import { FaUserCog } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { TfiLayoutMenuV } from "react-icons/tfi";

const AdminSidebar = () => {
  return (
    <div className="sidebar w-1/5 min-h-screen bg-gray-800 border-r border-gray-700 py-6 px-4 shadow-lg">
      <div className="sidebar-header flex  justify-center items-center gap-2 mb-8">
        <FaUserCog className="text-blue-400 text-2xl" />
        <h2 className="text-xs md:text-xl font-bold text-white">Admin Panel</h2>
      </div>

      <div className="sidebar-options flex flex-col space-y-6">
        <div className="sidebar-option flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 transition-colors duration-200 py-3 px-4 rounded-lg shadow-sm cursor-pointer">
          <MdAddBox className="text-blue-400 " />
          <p className="text-xs md:text-xl text-white font-medium">Add Items</p>
        </div>

        <div className="sidebar-option flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 transition-colors duration-200 py-3 px-4 rounded-lg shadow-sm cursor-pointer">
          <FaListUl className="text-blue-400 text-xl" />
          <p className="text-xs md:text-xl text-white font-medium">List Items</p>
        </div>

        <div className="sidebar-option flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 transition-colors duration-200 py-3 px-4 rounded-lg shadow-sm cursor-pointer">
          <TfiLayoutMenuV className="text-blue-400 text-xl" />
          <p className="text-xs md:text-xl text-white font-medium">Order's List</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
