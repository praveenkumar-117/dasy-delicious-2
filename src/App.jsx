
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import MyOrders from './pages/MyOrders'
import Menu from './pages/Menu'
import Navbar from './components/Navbar'
import LoginPopup from './components/LoginPopup'
import Contact from './pages/Contact'
import { useState } from 'react'

function App() {
  const [showLogin, setShowLogin] = useState(false)


  return (
    <>
      <ToastContainer />
      {
            showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <> </>
      }
      <Navbar  setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/myorders' element={< MyOrders />} />
        <Route path="/admin/:page" element={<Admin />} />
      
      </Routes>
      <Footer />
    </>
  )
}

export default App
