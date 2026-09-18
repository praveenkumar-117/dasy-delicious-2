import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import PlaceOrder from "./pages/PlaceOrder";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* Normal Website Navbar */}
      {!isAdminPage && <Navbar setShowLogin={setShowLogin} />}

      {/* Login Popup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />

        {/* User Protected Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Pages */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/:page" element={<Admin />} />
        </Route>
      </Routes>

      {/* Normal Website Footer */}
      {!isAdminPage && <Footer />}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default App;
