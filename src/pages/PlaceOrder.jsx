import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-blue-100 py-12 pl-12'>
      
      <button onClick={()=> navigate('/cart')} className='px-2 py-1 bg-green-400 rounded-md' title='Go Back'><IoMdArrowRoundBack />
        </button>
    <form  className='max-w-6xl mx-auto py-8 px-8 bg-gray-100 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8'>
      
      <div className='place-order-left'>
        <p className='text-2xl font-bold mb-4'>Delivery Information</p>
        <div className='multifield grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input required name='firstName'  type="text" placeholder='First Name' className='p-2 border border-gray-400 rounded-md' />
          <input required name='lastName' type="text" placeholder='Last Name' className='p-2 border border-gray-400 rounded-md' />
        </div>
        <input required name='email' type="email" placeholder='Email Address' className='p-2 border border-gray-400 rounded-md w-full mb-4' />
        <input required name='street' type="text" placeholder='Street' className='p-2 border border-gray-400 rounded-md w-full mb-4' />
        <div className='multifield grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input required name='city' type="text" placeholder='City' className='p-2 border border-gray-400 rounded-md' />
          <input required name='state' type="text" placeholder='State' className='p-2 border border-gray-400 rounded-md' />
        </div>
        <div className='multifield grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input required name='zipcode'  type="text" placeholder='Zip Code' className='p-2 border border-gray-400 rounded-md' />
          <input required name='country' type="text" placeholder='Country' className='p-2 border border-gray-400 rounded-md' />
        </div>
        <input required name='phone'  type="text" placeholder='Phone' className='p-2 border border-gray-400 rounded-md w-full mb-4' />

      </div>

      <div className='place-order-right '>
        <div className="cart-total p-4 bg-gray-200 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Cart Total</h2>
          <div>
            <div className="cart-total-details flex justify-between mb-2">
              <p>Subtotal</p>
              <p>$</p>
            </div>
            <hr className='border-gray-400'/>
            <div className="cart-total-details flex justify-between mb-2">
              <p>Delivery Fee</p>
              <p>$</p>
            </div>
            <hr className='border-gray-400'/>
            <div className="cart-total-details flex justify-between mb-4">
              <b>Total</b>
              <b>$</b>
            </div>
          </div>
          <button type='submit' className="bg-orange-400 hover:bg-orange-600 text-white rounded-lg px-4 py-2 mt-4 w-full">Proceed to Payment</button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default PlaceOrder
