import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MdDeleteForever } from 'react-icons/md';
import { FaIndianRupeeSign } from "react-icons/fa6";

const List = () => {

  const [list, setList] = useState([])
  const fetchList = async () => {
    const response = await axios.get("http://localhost:7000/api/admin/food/list")
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error('Error');
    }
  }

  useEffect(() => {
    fetchList();
    console.log("this is list Item ->", list)
  }, [])


  return (
    <div className="flex min-h-screen bg-blue-100">
      <AdminSidebar />

      <div className="flex justify-center items-center w-full">
        <div className="p-8 my-8 w-4/5 bg-white rounded-2xl shadow-2xl ">
          <h1 className="text-3xl font-extrabold mb-8 text-center text-orange-600 underline">
            Food Items
          </h1>
          <div className="list-table border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="grid grid-cols-5 gap-4 font-bold bg-orange-500 text-white p-4">
              <div>Image</div>
              <div>Name</div>
              <div>Category</div>
              <div>Price</div>
              <div>Action</div>
            </div>
            {list.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 gap-4 items-center px-4 py-2 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-colors`}
              >
                <img
                  src={`http://localhost:7000/images/${item.image}`}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                />
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-gray-600">{item.category}</div>
                <div className="font-semibold text-green-600">₹{item.price}</div>
                <button
                  className="text-white px-3 py-2 rounded-lg flex justify-center items-center bg-red-500 hover:bg-red-700 transition-all shadow-md"
                  title="Remove item"
                >
                  <MdDeleteForever className="text-2xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List
