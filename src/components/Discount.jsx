import React from 'react'

const Discount = () => {
  return (
    <div>
      <div className='mx-8 p-10 rounded-md bg-red-500 flex '>
        <div className='w-2/3 flex flex-col justify-center items-center text-white'>
          <h1 className='text-2xl font-bold mb-4'>20% off on burgers</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem esse expedita, dicta similique obcaecati sapiente reiciendis? </p>
        </div>
        <img src="1.png" alt="" className='w-1/4 h-1/4'/>
      </div>
    </div>
  )
}

export default Discount
