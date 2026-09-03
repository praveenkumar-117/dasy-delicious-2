import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Menu = () => {

  const [foodItem, setFoodItem] = useState([])

  const fetchList = async () => {
    const response = await axios.get("http://localhost:7000/api/admin/food/list")
    if (response.data.success) {
      setFoodItem(response.data.data)
    } else {
      toast.error('Error');
    }
  }

  const foodCategory = [...new Set(foodItem.map(item => item.category))]
  console.info("food category -", foodCategory)

  useEffect(() => {
    fetchList();

  }, [])



  return (
    <div className="w-full bg-blue-100 flex flex-col lg:flex-row gap-6 py-6 px-8">
      {/* Filters Section */}
      <div className="w-full lg:w-1/5 py-8 bg-gray-100 rounded-xl shadow-md">
        <h2 className="font-semibold text-center text-lg underline mb-4 text-orange-600">Filters</h2>
        {/* Add filter options here */}
        <div className='flex flex-col justify-center items-Start px-8 text-semibold'>
          {
            foodCategory.map((category, index) => (
              <div key={index}>
              <label htmlFor={`category-${index}`} className='flex gap-2'>
                <input id={`category-${index}`} type="checkbox" value={category} className='accent-orange-600' />
                 {category}
              </label>

              </div>
            ))
          }


        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 py-8 px-6 bg-gray-100 rounded-xl shadow-md">
        <h2 className="font-bold text-center text-2xl underline mb-6 text-orange-600">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodItem.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-tl-xl rounded-br-xl shadow-lg p-4 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow"
            >
              <img
                src={`http://localhost:7000/images/${item.image}`}
                alt={item.name || 'Food Item'}
                className="rounded-lg object-cover"
                width={200}
                height={200}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200'; }}
              />
              <div className="w-full text-center">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <p className="text-gray-500 text-sm mt-1 italic">{item.category}</p>
                <p className="font-bold text-xl text-green-600 mt-2">₹{item.price}</p>
              </div>
              <button className="px-4 py-2 rounded-lg font-semibold bg-yellow-400 hover:bg-yellow-500 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu
