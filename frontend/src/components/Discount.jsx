import React from 'react'
import { useNavigate } from 'react-router-dom'

const Discount = () => {

  const navigate = useNavigate()

  return (
    <div className='mx-4 sm:mx-8 my-8'>
      <div className='relative overflow-hidden rounded-2xl bg-red-600 px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between shadow-md'>

        {/* Decorative Circle */}
        <div className='absolute -right-16 -top-16 w-40 h-40 rounded-full bg-red-500 opacity-40'></div>

        <div className='absolute -left-10 -bottom-16 w-32 h-32 rounded-full bg-red-700 opacity-30'></div>

        {/* Content */}
        <div className='relative z-10 w-full sm:w-2/3 flex flex-col justify-center items-center sm:items-start text-white text-center sm:text-left'>

          <span className='mb-3 px-4 py-1 rounded-full bg-yellow-400 text-black text-sm font-bold'>
            LIMITED OFFER
          </span>

          <h1 className='text-3xl sm:text-4xl font-bold mb-3'>
            20% OFF on Burgers 🍔
          </h1>

          <p className='max-w-xl text-sm sm:text-base text-white/90 leading-relaxed'>
            Craving something delicious? Enjoy your favorite burgers
            with an exclusive 20% discount. Grab the offer before it ends!
          </p>

          <button
            onClick={() => navigate('/menu')}
            className='mt-5 px-6 py-2.5 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 active:scale-95 transition-all duration-200 shadow-sm'
          >
            Order Now
          </button>

        </div>

        {/* Food Image */}
        <div className='relative z-10 w-full sm:w-1/3 flex justify-center sm:justify-end mt-6 sm:mt-0'>
          <img
            src='1.png'
            alt='Delicious burger'
            className='w-44 sm:w-52 md:w-60 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300'
          />
        </div>

      </div>
    </div>
  )
}

export default Discount