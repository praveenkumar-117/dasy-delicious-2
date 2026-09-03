import React, { useContext, useState } from 'react';
import { LiaWindowClose } from "react-icons/lia";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {

  const { setToken } = useContext(StoreContext)
  const [toggle, setToggle] = useState("SignUp");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: [value] }))
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    let url = toggle === "SignUp" ? 'http://localhost:7000/api/user/register'
      : 'http://localhost:7000/api/user/login'

    const response = axios.post(url, data)
    if (response.data.success) {
      localStorage.setItem("token", response.data.token)
      setToken(response.data.token)
      setShowLogin(false)
    } else {
      alret((await response).data.message)
    }
  }



  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-500">
        {/* Header with Close Button */}
        <div className="bg-blue-100 w-full p-4 rounded-t-xl flex justify-between items-center relative">
          <div className="flex w-full">
            <button
              onClick={() => setToggle("SignUp")}
              className={`w-1/2 font-semibold cursor-pointer p-3 rounded-xl ${toggle === "SignUp" ? "bg-orange-400 text-white" : "text-gray-600"
                }`}
            >
              SignUp
            </button>
            <button
              onClick={() => setToggle("Login")}
              className={`w-1/2 font-semibold cursor-pointer p-3 rounded-xl ${toggle === "Login" ? "bg-orange-400 text-white" : "text-gray-600"
                }`}
            >
              Login
            </button>
          </div>
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-0 right-0 text-2xl cursor-pointer text-red-600 hover:text-red-800"
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>

        {/* Content */}
        {toggle === "SignUp" ? (
          <div className="flex flex-col gap-4 justify-center p-6">
            <h2 className="text-center text-xl underline font-bold text-orange-500">
              SignUp
            </h2>
            <input
              name="username"
              type="text"
              placeholder="Enter UserName"
              required
              onChange={onChangeHandler}
              value={data.username}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              required
              onChange={onChangeHandler}
              value={data.email}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              required
              onChange={onChangeHandler}
              value={data.password}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={() => onSubmit}
              className="bg-orange-400 text-white rounded-md py-2 mt-4 hover:bg-orange-600 hover:font-bold transition">
              Signup
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center p-6">
            <h2 className="text-center text-xl underline font-bold text-orange-500">
              Login
            </h2>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              required
              onChange={onChangeHandler}
              value={data.email}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              required
              onChange={onChangeHandler}
              value={data.password}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
             onClick={() => onSubmit} className="bg-orange-500 text-white rounded-md py-2 mt-4 hover:bg-orange-600 hover:font-bold transition">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
