import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import { FaRegStar, FaStar } from "react-icons/fa";

const Menu = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");

  const { addToCart } = useContext(StoreContext);

  const url = "http://localhost:7000";

  const fetchList = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${url}/api/admin/food/list`);

      if (response.data.success) {
        setFoodItem(response.data.data);
      } else {
        toast.error("Unable to load menu");
      }
    } catch (error) {
      console.error("Menu fetch error:", error);
      toast.error("Unable to load menu");
    } finally {
      setIsLoading(false);
    }
  };

  const foodCategory = [
    ...new Set(foodItem.map((item) => item.category)),
  ];

  useEffect(() => {
    fetchList();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  const checkPrice = (price) => {
    const itemPrice = Number(price);

    if (selectedPrice === "under200") {
      return itemPrice < 200;
    }

    if (selectedPrice === "200to500") {
      return itemPrice >= 200 && itemPrice <= 500;
    }

    if (selectedPrice === "above500") {
      return itemPrice > 500;
    }

    return true;
  };

  const filteredFood = foodItem.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    const priceMatch = checkPrice(item.price);

    return categoryMatch && priceMatch;
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice("all");
  };

  return (
    <div className="w-full min-h-screen bg-blue-100 py-5 sm:py-6 px-3 sm:px-5 lg:px-6">

      <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-6">

        {/* Filters Section */}
        <div className="w-full lg:w-[230px] xl:w-[250px] h-fit bg-gray-100 rounded-2xl shadow-md p-5 sm:p-6 lg:sticky lg:top-5">

          {/* Filter Header */}
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-orange-600">
              Filters
            </h2>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 cursor-pointer transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="border-t border-gray-300 my-5" />

          {/* Category */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Category
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {foodCategory.length > 0 ? (
                foodCategory.map((category, index) => (
                  <label
                    key={index}
                    htmlFor={`category-${index}`}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 transition-colors text-sm sm:text-base"
                  >
                    <input
                      id={`category-${index}`}
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 accent-orange-600 cursor-pointer shrink-0"
                    />

                    <span className="capitalize truncate">
                      {category}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-full">
                  No categories available
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="mt-7">
            <h3 className="font-semibold text-gray-800 mb-3">
              Price
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3">

              <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 text-sm sm:text-base">
                <input
                  type="radio"
                  name="price"
                  value="all"
                  checked={selectedPrice === "all"}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="accent-orange-600 cursor-pointer shrink-0"
                />
                <span>All Prices</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 text-sm sm:text-base">
                <input
                  type="radio"
                  name="price"
                  value="under200"
                  checked={selectedPrice === "under200"}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="accent-orange-600 cursor-pointer shrink-0"
                />
                <span>Under ₹200</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 text-sm sm:text-base">
                <input
                  type="radio"
                  name="price"
                  value="200to500"
                  checked={selectedPrice === "200to500"}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="accent-orange-600 cursor-pointer shrink-0"
                />
                <span>₹200 - ₹500</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-orange-600 text-sm sm:text-base">
                <input
                  type="radio"
                  name="price"
                  value="above500"
                  checked={selectedPrice === "above500"}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="accent-orange-600 cursor-pointer shrink-0"
                />
                <span>Above ₹500</span>
              </label>

            </div>
          </div>
        </div>


        {/* Menu Section */}
        <div className="flex-1 min-w-0 bg-gray-100 rounded-2xl shadow-md p-4 sm:p-6">

          {/* Menu Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-orange-600">
              Our Menu
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Choose your favorite food and enjoy every bite
            </p>
          </div>


          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <p className="text-gray-500 font-medium">
                Loading delicious food...
              </p>
            </div>
          )}


          {/* Empty */}
          {!isLoading && filteredFood.length === 0 && (
            <div className="flex flex-col justify-center items-center py-16 sm:py-20 gap-3">
              <p className="text-gray-500 font-medium text-center">
                No food items found.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold cursor-pointer transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}


          {/* Food Grid */}
          {!isLoading && filteredFood.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">

              {filteredFood.map((item, index) => (
                <div
                  key={item._id || index}
                  className="relative bg-blue-50 rounded-tl-4xl rounded-br-4xl p-4 sm:p-5 flex flex-col shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* Image */}
                  <div className="w-full h-44 sm:h-48 flex items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name || "Food Item"}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200";
                      }}
                    />
                  </div>


                  {/* Food Details */}
                  <div className="w-full mt-3">

                    <div className="flex justify-between items-start gap-2">

                      <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
                        {item.name}
                      </h3>

                      <span className="text-[11px] sm:text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full whitespace-nowrap capitalize shrink-0">
                        {item.category}
                      </span>

                    </div>


                    {/* Rating */}
                    <div className="flex items-center gap-0.5 text-amber-500 mt-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaRegStar />

                      <span className="text-xs text-gray-500 ml-1">
                        4.0
                      </span>
                    </div>


                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2 min-h-[40px]">
                      {item.description}
                    </p>


                    {/* Price */}
                    <p className="font-bold text-lg sm:text-xl text-orange-600 mt-3">
                      ₹{item.price}
                    </p>

                  </div>


                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="w-full mt-4 px-4 py-2.5 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500 active:scale-95 cursor-pointer transition-all duration-200 shadow-sm"
                  >
                    Add to Cart
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Menu;