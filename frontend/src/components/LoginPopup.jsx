import React, { useContext, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaUser, FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);

  const [toggle, setToggle] = useState("SignUp");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const url = "https://dasy-delicious-2.onrender.com";

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const endpoint =
        toggle === "SignUp" ? "/api/user/register" : "/api/user/login";

      const response = await axios.post(`${url}${endpoint}`, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        setToken(response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Authentication error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-200";

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex justify-center items-center px-4 py-4">
      <div className="w-full max-w-md max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="relative bg-blue-100 px-5 pt-4 pb-4">
          {/* Brand */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center shadow-md mb-1.5">
              <FaUtensils className="text-base" />
            </div>

            <h1 className="text-xl font-bold text-gray-800">Dasy Delicious</h1>

            <p className="text-xs text-gray-500">Fresh food, happy moments</p>
          </div>

          {/* Toggle */}
          <div className="flex bg-white/80 rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setToggle("SignUp")}
              className={`w-1/2 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-200 ${
                toggle === "SignUp"
                  ? "bg-orange-400 text-white shadow-sm"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={() => setToggle("Login")}
              className={`w-1/2 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-200 ${
                toggle === "Login"
                  ? "bg-orange-400 text-white shadow-sm"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              Login
            </button>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 hover:scale-105 cursor-pointer shadow-sm transition-all duration-200"
            aria-label="Close login popup"
          >
            <IoMdCloseCircleOutline className="text-xl" />
          </button>
        </div>

        {/* Signup */}
        {toggle === "SignUp" ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-3.5 px-6 py-5">
            <div className="text-center mb-1">
              <h2 className="text-2xl font-bold text-gray-800">
                Create Account
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Join us and start ordering delicious food
              </p>
            </div>

            {/* Username */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                name="username"
                type="text"
                placeholder="Enter Username"
                required
                onChange={onChangeHandler}
                value={data.username}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                required
                onChange={onChangeHandler}
                value={data.email}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                name="password"
                type="password"
                placeholder="Enter Your Password"
                required
                onChange={onChangeHandler}
                value={data.password}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-400 text-white rounded-xl py-2.5 mt-1 font-semibold hover:bg-orange-500 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : (
          /* Login */
          <form onSubmit={onSubmit} className="flex flex-col gap-3.5 px-6 py-5">
            <div className="text-center mb-1">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>

              <p className="text-sm text-gray-500 mt-1">
                Login to continue your food journey
              </p>
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                required
                onChange={onChangeHandler}
                value={data.email}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                name="password"
                type="password"
                placeholder="Enter Your Password"
                required
                onChange={onChangeHandler}
                value={data.password}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-400 text-white rounded-xl py-2.5 mt-1 font-semibold hover:bg-orange-500 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
