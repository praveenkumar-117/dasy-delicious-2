import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";

const OurSpecialDish = () => {
  return (
    <div className='bg-orange-600 my-8 py-8 px-6 flex flex-col justify-center items-center'>
      <h2 className='text-center text-2xl font-bold'>Our Best Seller Dishes</h2>

      <div className='w-full flex justify-center gap-10 p-8'>
        <div className='rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 justify-center items-center flex flex-col gap-2'>
          <img src="1.png" alt="" width={225} height={225} className=''/>
         

          <div className='w-full flex justify-around items-center '>
          <h2 className='text-center font-bold '>Burger</h2>
          <span className='flex text-amber-500'> <FaStar /> <FaStar /> <FaStar /><FaStar /><FaRegStar /> </span>
          

          </div>
        
          <p>Ratione iste neque distinctio officiis, in aliquid recusandae hic quas delectus? Assumenda.</p>
          <p className='font-bold'>₹199</p>
          <button className='px-2.5 py-1 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500'>Add to cart</button>
        </div>

        <div className='rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 justify-center items-center flex flex-col gap-2'>
        <img src="2.png" alt="" width={225} height={225} className=''/>
          <h2 className='text-center font-bold '>Burger</h2>
          <p>Ratione iste neque distinctio officiis, in aliquid recusandae hic quas delectus? Assumenda.</p>
          <p className='font-bold'>₹199</p>
          <button className='px-2.5 py-1 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500'>Add to cart</button>
        </div>
        <div className='rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 justify-center items-center flex flex-col gap-2'>
        <img src="3.png" alt="" width={225} height={225} className=''/>
          <h2 className='text-center font-bold '>Burger</h2>
          <p>Ratione iste neque distinctio officiis, in aliquid recusandae hic quas delectus? Assumenda.</p>
           <p className='font-bold'>₹199</p>
           <button className='px-2.5 py-1 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500'>Add to cart</button>
        </div>
        <div className='rounded-tl-4xl rounded-br-4xl bg-blue-100 p-4 justify-center items-center flex flex-col gap-2'>
        <img src="4.png" alt="" width={225} height={225} className=''/>
          <h2 className='text-center font-bold '>Burger</h2>
          <p>Ratione iste neque distinctio officiis, in aliquid recusandae hic quas delectus? Assumenda.</p>
           <p className='font-bold'>₹199</p>
           <button className='px-2.5 py-1 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-500'>Add to cart</button>
        </div>

      </div>
      <button className='px-4 py-1 rounded-xl font-semibold bg-white hover:outline-2'>Check More Dishes</button>

    </div>
  )
}

export default OurSpecialDish
