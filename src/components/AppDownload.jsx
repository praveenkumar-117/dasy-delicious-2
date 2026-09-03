import React from 'react'
// import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div id='app-download' className='flex  flex-col items-center justify-center py-16 bg-blue-100'>
      <h2 className='text-black text-4xl font-semibold mb-2 text-center pb-6'>For Better Experience Download <br /> Our Mobile App</h2>
      <div className='flex gap-2'>
        <img src="app_store.png" width={150} height={100} alt="" className='cursor-pointer' />
        <img src="play_store.png" width={150} height={100} alt="" className='cursor-pointer' />
      </div>

    </div>
  )
}

export default AppDownload
