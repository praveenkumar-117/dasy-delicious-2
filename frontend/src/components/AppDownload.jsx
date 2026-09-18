import React from 'react'

const AppDownload = () => {
  return (
    <div
      id='app-download'
      className='flex flex-col items-center justify-center py-14 sm:py-16 px-4 bg-blue-100'
    >

      <h2 className='text-black text-3xl sm:text-4xl font-semibold mb-2 text-center pb-6 leading-tight'>
        For Better Experience Download
        <br />
        Our Mobile App
      </h2>

      <p className='text-gray-600 text-sm sm:text-base text-center mb-5'>
        Get the best food ordering experience on your mobile.
      </p>

      <div className='flex flex-col sm:flex-row gap-3 items-center'>

        <img
          src='app_store.png'
          width={150}
          height={100}
          alt='Download on App Store'
          className='w-[150px] h-auto cursor-pointer hover:scale-105 transition-transform duration-200'
        />

        <img
          src='play_store.png'
          width={150}
          height={100}
          alt='Get it on Google Play'
          className='w-[150px] h-auto cursor-pointer hover:scale-105 transition-transform duration-200'
        />

      </div>

    </div>
  )
}

export default AppDownload