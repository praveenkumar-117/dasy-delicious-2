import gsap from 'gsap'
import React, { useEffect, useContext, useState } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { StoreContext } from '../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {

  const navigate = useNavigate()

  const {
    token,
    setToken,
    getCartCount
  } = useContext(StoreContext)

  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      "#nav > *",
      {
        opacity: 0,
        y: -10
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
      }
    )
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken("")
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <nav
      id='nav'
      className='w-full h-16 sm:h-18 flex justify-between items-center px-4 sm:px-8 bg-orange-500 shadow-md sticky top-0 z-50'
    >

      {/* Logo */}

      <div className='sm:w-1/4 flex items-center justify-start sm:pl-6 lg:pl-10'>

        <Link to='/' className='flex items-center'>

          <img
            src="logo1.png"
            alt="Dasy Delicious"
            className='w-11 h-11 sm:w-13 sm:h-13 object-contain hover:scale-105 transition-transform duration-200'
          />

        </Link>

      </div>


      {/* Navigation */}

      <ul className='hidden sm:flex sm:w-1/2 justify-center items-center gap-1 text-white font-medium'>

        <li>
          <Link
            to='/'
            className='inline-block rounded-lg px-3 lg:px-4 py-2 hover:bg-blue-100 text-black hover:font-semibold transition-all duration-200'
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to='/menu'
            className='inline-block rounded-lg px-3 lg:px-4 py-2 hover:bg-blue-100 text-black hover:font-semibold transition-all duration-200'
          >
            Menu
          </Link>
        </li>

        {/* <li>
          <a
            href='#app-download'
            className='inline-block rounded-lg px-3 lg:px-4 py-2 hover:bg-blue-100 text-black hover:font-semibold transition-all duration-200'
          >
            Mobile App
          </a>
        </li> */}

        <li>
          <Link
            to='/contact'
            className='inline-block rounded-lg px-3 lg:px-4 py-2 hover:bg-blue-100 text-black hover:font-semibold transition-all duration-200'
          >
            Contact us
          </Link>
        </li>

      </ul>


      {/* Right Side */}

      <div className='sm:w-1/4 flex justify-end items-center gap-2 sm:gap-3'>

        {/* Cart */}

        <Link
          to='/cart'
          className='relative w-10 h-10 rounded-lg flex items-center justify-center text-black hover:bg-blue-100 cursor-pointer transition-all duration-200'
          title='Go to Cart'
        >

          <BsCart3 className='text-2xl' />

          {/* Cart Badge */}

          <span className='absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-yellow-400 text-black text-[10px] font-bold flex items-center justify-center'>
            {getCartCount()}
          </span>

        </Link>


        {/* User Menu */}

        {token && (

          <div className='relative'>

            <button
              type='button'
              onClick={() => setShowUserMenu(!showUserMenu)}
              className='w-10 h-10 rounded-lg flex items-center justify-center text-black hover:bg-blue-100 transition-all duration-200 cursor-pointer'
              title='User Menu'
            >
              <FiUser className='text-2xl' />
            </button>


            {showUserMenu && (

              <div className='absolute right-0 top-12 w-44 bg-gray-200 rounded-lg shadow-lg border border-blue-200 py-2 z-50'>

                <Link
                  to='/myorders'
                  onClick={() => setShowUserMenu(false)}
                  className='block px-4 py-2.5 text-gray-700 hover:bg-orange-500 hover:text-black transition-colors'
                >
                  My Orders
                </Link>

                <Link
                  to='/profile'
                  onClick={() => setShowUserMenu(false)}
                  className='block px-4 py-2.5 text-gray-700 hover:bg-orange-500 hover:text-black transition-colors'
                >
                  Profile
                </Link>

                <button
                  type='button'
                  onClick={handleLogout}
                  className='w-full text-left px-4 py-2.5 text-gray-700 hover:bg-red-500 hover:text-black transition-colors cursor-pointer'
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        )}


        {/* Login */}

        {!token && (

          <button
            type='button'
            onClick={() => setShowLogin(true)}
            className='rounded-lg cursor-pointer px-4 py-1.5 bg-blue-100 text-gray-800 border border-white hover:bg-yellow-400 hover:border-black font-semibold transition-all duration-200 active:scale-95 shadow-sm'
          >
            Login
          </button>

        )}

      </div>

    </nav>
  )
}

export default Navbar