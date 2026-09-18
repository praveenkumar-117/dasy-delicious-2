import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";

const AddItems = () => {
  const [img, setImg] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Rolls",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!img) {
      toast.error("Please select an image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", img);

      const adminToken = localStorage.getItem("adminToken");

      const response = await axios.post(
        "https://dasy-delicious-2.onrender.com/api/admin/food/add",
        formData,
        {
          headers: {
            admintoken: adminToken,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });

        setImg(false);
      }
    } catch (error) {
      console.log("ADD FOOD ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to add food");
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      <AdminSidebar />
      <div className="flex justify-center items-center w-full">
        <div className="p-6 w-4/5 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-extrabold mb-6 text-center text-orange-600 underline">
            Add Food Item
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="Enter food name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleOnChange}
                  placeholder="Enter food description"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price:
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={handleOnChange}
                  placeholder="Enter price"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image:
                {/* <img src={img ? URL.createObjectURL(img) : <FiUpload />} alt='' className='w-24 h-20 cursor-pointer' /> */}
                <input
                  type="file"
                  // name="image"
                  id="image"
                  onChange={(e) => setImg(e.target.files[0])}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category:
                <select
                  name="category"
                  value={data.category}
                  onChange={handleOnChange}
                  className=" appearance-none mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2"
                >
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Pure veg">Pure veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Cake">Cake</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
