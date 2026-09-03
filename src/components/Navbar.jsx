import gsap from 'gsap'
import React, { useEffect } from 'react'
import { IoBagHandleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {

  useEffect(() => {
    gsap.fromTo(
      "#nav > *",
      {  y: -50 },
      {  y: 0, duration: 0.5 }
    )
  }, [])
  return (
    <>

      <nav id='nav' className='w-full flex justify-between h-16 py-4 px-8 bg-blue-100 shadow-2xl'>
        <div className='sm:w-1/4 h-full flex justify-start items-center pl-18'>
          <img src="logo1.png" alt="Dasy Delicious" style={{ width: '55px', height: '55px' }} />

        </div>

        <ul className='sm:w-1/2  h-full flex space-x-4 mt-2 justify-center items-center text-black font-medium '>
          {/* <li><a href='#home' className='text-3xl font-semibold text-amber-300'>Dasy Delicious</a></li> */}
          <li><Link to={'/'} className='rounded-xl px-3 py-0.5 hover:bg-yellow-400 hover:font-semibold   transition duration-200 ease-in'>Home</Link ></li>
          <li><Link to={'/menu'} className='rounded-2xl px-3 py-0.5 hover:bg-yellow-400  hover:font-semibold transition duration-200 ease-in'>Menu</Link ></li>
          <li><a href='#app-download' className='rounded-2xl px-3 py-0.5 hover:bg-yellow-400  hover:font-semibold transition duration-200 ease-in'>Mobile App</a></li>
          <li><Link to={'/contact'} className='rounded-2xl px-3 py-0.5 hover:bg-yellow-400  hover:font-semibold transition duration-200 ease-in'>Contact us</Link ></li>
        </ul>

        <div className='sm:w-1/4 h-full flex justify-center items-center  gap-4 pl-8'>
          <IoBagHandleSharp className='text-2xl cursor-pointer' />

          <button onClick={() => setShowLogin(true)}  className='rounded-2xl cursor-pointer px-3 py-0.5 border-1 hover:bg-yellow-400 font-semibold transition duration-200 ease-in'>Login</button>

        </div>
      </nav>

    </>
  )
}

export default Navbar
