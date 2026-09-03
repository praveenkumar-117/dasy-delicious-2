import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
  return (
    <div className="bg-blue-100 pt-8 px-8 min-h-screen flex justify-center">
      <div className="w-1/2 px-4">
        <h2 className="text-center bg-orange-400 text-white p-4 rounded-md shadow-lg text-3xl font-bold">
          Get In Touch With Us Now!
        </h2>
        <div className="grid grid-cols-2 font-semibold text-2xl mt-8 gap-4">
          <div className="border-r border-b p-8 flex flex-col items-center gap-2.5 bg-gray-100 border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105 ">
            <FaPhoneAlt className="text-orange-400 text-4xl" />
            <h2 className="text-xl">Phone Number</h2>
            <p className="text-sm font-normal text-gray-600">+91 98123 45450</p>
          </div>

          <div className="p-8 text-xl flex flex-col items-center gap-2.5 bg-gray-100 border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105 ">
            <MdEmail className="text-orange-400 text-4xl" />
            <h2 className="font-semibold text-xl">Email</h2>
            <p className="text-sm font-normal text-gray-600">info@dasydelicios.com</p>
          </div>

          <div className="p-8 text-xl flex flex-col items-center gap-2.5 bg-gray-100 border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105 ">
            <FaLocationDot className="text-orange-400 text-4xl" />
            <h2 className="font-semibold text-xl">Location</h2>
            <p className="text-sm font-normal text-gray-600">
              123 Delicious Street, Food City
            </p>
          </div>

          <div className="border-t border-l p-8 text-xl flex flex-col items-center gap-2.5 bg-gray-100 border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105 ">
            <FaClock className="text-orange-400 text-4xl" />
            <h2 className="font-semibold text-xl">Working Hours</h2>
            <p className="text-sm font-normal text-gray-600">
              Mon - Fri: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 px-8">
        <div>
          <h2 className="text-center bg-orange-400 text-white p-4 rounded-md shadow-lg text-3xl font-bold">
            Contact Us
          </h2>
          <div className="mt-8 py-6 px-6 rounded-lg flex flex-col gap-4 bg-gray-100">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              name="Message"
              id="Message"
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 h-32 resize-none"
            ></textarea>
            <button className="bg-orange-400 text-lg text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-500 transition duration-300 flex items-center justify-center gap-1">
              Send Message <IoIosSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
