import React from 'react';
import { GrTrash } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-blue-100 p-8 flex flex-col md:flex-row justify-evenly items-start md:items-start gap-8">
      <div className="w-full md:w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

        <div className="flex justify-between items-center border-b px-8 pb-4 mb-4">
          <img src="1.png" alt="Item 1" width={115} height={115} className="rounded-md" />
          <p className="font-medium">Item Name 1</p>
          <div className="flex items-center gap-2 border-1 rounded-xl">
            <button className="px-2.5 rounded-l-xl cursor-pointer hover:bg-red-200">-</button>
            <span className="font-medium">1</span>
            <button className="px-2.5 rounded-r-xl cursor-pointer hover:bg-green-200">+</button>
          </div>
          <p className="font-medium">$125</p>
          <button className="text-red-500 font-bold  cursor-pointer" title='Remove item from cart'><GrTrash />
          </button>
        </div>

        <div className="flex justify-between items-center border-b px-8 pb-4 mb-4">
          <img src="2.png" alt="Item 2" width={115} height={115} className="rounded-md" />
          <p className="font-medium">Item Name 2</p>
          <div className="flex items-center gap-2 border rounded-xl">
            <button className="px-2.5 rounded-l-xl cursor-pointer hover:bg-red-200">-</button>
            <span className="font-medium">2</span>
            <button className="px-2.5 rounded-r-xl cursor-pointer hover:bg-green-200">+</button>
          </div>
          <p className="font-medium">$200</p>
          <button className="text-red-500 font-bold cursor-pointer" title='Remove item from cart'><GrTrash />
          </button>
        </div>

        <div className="flex justify-between items-center border-b px-8 pb-4 mb-4">
          <img src="3.png" alt="Item 3" width={115} height={115} className="rounded-md" />
          <p className="font-medium">Item Name 3</p>
          <div className="flex items-center gap-2 border rounded-xl">
            <button className="px-2.5 rounded-l-xl cursor-pointer hover:bg-red-200">-</button>
            <span className="font-medium">1</span>
            <button className="px-2.5 rounded-r-xl cursor-pointer hover:bg-green-200">+</button>
          </div>
          <p className="font-medium">$150</p>
          <button className="text-red-500 font-bold cursor-pointer" title='Remove item from cart'><GrTrash />
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>$475</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Delivery Charge</p>
          <p>$8</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Tax</p>
          <p>$38</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>$513</p>
        </div>
        <button onClick={()=> navigate('/order')} className="w-full mt-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
