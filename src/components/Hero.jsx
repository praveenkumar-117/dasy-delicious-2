import gsap from 'gsap'
import React, { useEffect } from 'react'

const Hero = () => {


  useEffect(() => {
    gsap.fromTo(
      "#hero1 > *",
      { opecity: 0, x: -50 },
      { opecity: 1, x: 0, duration: 0.5  }
    )

    gsap.fromTo(
      "#hero2 > *",
      { opecity: 0, x: 150 },
      { opecity: 1, x: 0, duration: 0.5 }
    )

  }, [])

  return (
    <div className='w-full flex justify-evenly items-center py-18 bg-rose'>
      <div id='hero1' className='w-1/2 h-full px-20 text-black flex flex-col gap-4 justify-center items-center '>
        <h2 className='italic sm:text-4xl'>Are you Hungry ?</h2>
        <h2 className='sm:text-8xl'>Don't Wait !</h2>
        <h2 className='text-myYellow italic sm:text-4xl'>Let start to order Food now</h2>
        <button className=' rounded-2xl px-4 py-1 font-semibold hover:bg-yellow-500 bg-yellow-400'>Check Out Menu</button>

      </div>
      <div id='hero2' className=' flex justify-start items-end  px-20'>
        <img src="main1.png" alt="" className='w-full h-full' />
      </div>

    </div>
  )
}

export default Hero
