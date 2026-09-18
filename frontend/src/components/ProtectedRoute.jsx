import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const ProtectedRoute = () => {

  const { token } = useContext(StoreContext)

  const [checking, setChecking] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setChecking(false)
    }, 500)

    return () => clearTimeout(timer)

  }, [])

  if (checking) {
    return (
      <div className='min-h-screen bg-blue-100 flex items-center justify-center'>

        <div className='bg-gray-100 rounded-xl shadow-lg px-8 py-7 text-center'>

          <div className='w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4'></div>

          <p className='text-lg font-semibold text-gray-700'>
            Checking...
          </p>

          <p className='text-sm text-gray-500 mt-1'>
            Please wait
          </p>

        </div>

      </div>
    )
  }

  if (!token) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default ProtectedRoute