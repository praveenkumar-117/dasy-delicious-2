import gsap from 'gsap'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate()

  useEffect(() => {

    gsap.fromTo(
      "#hero1 > *",
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }
    )

    gsap.fromTo(
      "#hero2 > *",
      {
        opacity: 0,
        x: 150
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out"
      }
    )

  }, [])

  return (

    <div className='w-full flex flex-col sm:flex-row justify-evenly items-center py-18 bg-blue-100'>

      <div
        id='hero1'
        className='w-full sm:w-1/2 h-full px-6 sm:px-20 text-black flex flex-col gap-4 justify-center items-center'
      >

        <h2 className='italic sm:text-4xl'>
          Are you Hungry?
        </h2>

        <h2 className='text-6xl sm:text-8xl whitespace-nowrap'>
          Don't Wait!
        </h2>

        <h2 className='text-myYellow italic text-2xl sm:text-4xl text-center'>
          Let's start to order Food now
        </h2>

        <button
          onClick={() => navigate('/menu')}
          className='rounded-2xl px-5 py-2 font-semibold bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md'
        >
          Check Out Menu
        </button>

      </div>


      <div
        id='hero2'
        className='w-full sm:w-auto flex justify-start items-end px-6 sm:px-20 mt-8 sm:mt-0'
      >

        <img
          src='main1.png'
          alt='Delicious food'
          className='w-full h-full object-contain'
        />

      </div>

    </div>

  )
}

export default Hero