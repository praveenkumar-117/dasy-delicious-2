import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { FaRegStar, FaStar } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const OurSpecialDish = () => {

  const navigate = useNavigate()
  const { addToCart } = useContext(StoreContext)

  return (
    <div className='bg-orange-600 my-8 py-8 px-4 sm:px-6 flex flex-col justify-center items-center'>

      <h2 className='text-center text-2xl sm:text-3xl font-bold text-white'>
        Our Best Seller Dishes
      </h2>

      <p className='text-center text-white/90 mt-2 text-sm sm:text-base'>
        Taste our most loved dishes
      </p>

      <div className='w-full flex flex-wrap justify-center gap-6 lg:gap-8 p-6 sm:p-8'>

        {/* Dish 1 */}
        <div className='relative w-full sm:w-[280px] rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 flex flex-col justify-center items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

          <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
            Best Seller
          </span>

          <img
            src="1.png"
            alt="Burger"
            width={225}
            height={225}
            className='w-[200px] h-[200px] object-contain hover:scale-105 transition-transform duration-300'
          />

          <div className='w-full flex justify-between items-center px-2'>
            <h2 className='font-bold text-lg'>
              Burger
            </h2>

            <span className='flex items-center gap-0.5 text-amber-500'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </span>
          </div>

          <p className='text-sm text-gray-600 text-center leading-relaxed'>
            Juicy, fresh and delicious burger made with quality ingredients.
          </p>

          <p className='font-bold text-lg'>
            ₹199
          </p>

          <button onClick={() => addToCart(item)} className='px-4 py-1.5 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer'>
            Add to cart
          </button>

        </div>

        {/* Dish 2 */}
        <div className='relative w-full sm:w-[280px] rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 flex flex-col justify-center items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

          <img
            src="2.png"
            alt="Burger"
            width={225}
            height={225}
            className='w-[200px] h-[200px] object-contain hover:scale-105 transition-transform duration-300'
          />

          <div className='w-full flex justify-between items-center px-2'>
            <h2 className='font-bold text-lg'>
              Burger
            </h2>

            <span className='flex items-center gap-0.5 text-amber-500'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </span>
          </div>

          <p className='text-sm text-gray-600 text-center leading-relaxed'>
            A tasty combination of fresh vegetables, sauce and crispy filling.
          </p>

          <p className='font-bold text-lg'>
            ₹199
          </p>

          <button onClick={() => addToCart(item)} className='px-4 py-1.5 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer'>
            Add to cart
          </button>

        </div>

        {/* Dish 3 */}
        <div className='relative w-full sm:w-[280px] rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 flex flex-col justify-center items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

          <img
            src="3.png"
            alt="Burger"
            width={225}
            height={225}
            className='w-[200px] h-[200px] object-contain hover:scale-105 transition-transform duration-300'
          />

          <div className='w-full flex justify-between items-center px-2'>
            <h2 className='font-bold text-lg'>
              Burger
            </h2>

            <span className='flex items-center gap-0.5 text-amber-500'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </span>
          </div>

          <p className='text-sm text-gray-600 text-center leading-relaxed'>
            Crispy, flavorful and perfectly prepared for a satisfying meal.
          </p>

          <p className='font-bold text-lg'>
            ₹199
          </p>

          <button onClick={() => addToCart(item)}  className='px-4 py-1.5 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer'>
            Add to cart
          </button>

        </div>

        {/* Dish 4 */}
        <div className='relative w-full sm:w-[280px] rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 flex flex-col justify-center items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

          <img
            src="4.png"
            alt="Burger"
            width={225}
            height={225}
            className='w-[200px] h-[200px] object-contain hover:scale-105 transition-transform duration-300'
          />

          <div className='w-full flex justify-between items-center px-2'>
            <h2 className='font-bold text-lg'>
              Burger
            </h2>

            <span className='flex items-center gap-0.5 text-amber-500'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </span>
          </div>

          <p className='text-sm text-gray-600 text-center leading-relaxed'>
            Enjoy a delicious burger packed with fresh and tasty ingredients.
          </p>

          <p className='font-bold text-lg'>
            ₹199
          </p>

          <button onClick={() => addToCart(item)} className='px-4 py-1.5 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer'>
            Add to cart
          </button>

        </div>

      </div>

      <button
        onClick={() => navigate('/menu')}
        className='px-5 py-2 rounded-xl bg-yellow-400  hover:bg-yellow-500 font-semibold  active:scale-95 transition-all duration-200 shadow-sm cursor-pointer'
      >
        Check More Dishes
      </button>

    </div>
  )
}

export default OurSpecialDish