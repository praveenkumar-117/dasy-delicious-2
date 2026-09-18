import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "https://dasy-delicious-2.onrender.com/api/feedback/submit",
        formData,
      );

      if (response.data.success) {
        toast.success("Message sent successfully");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log("SUBMIT FEEDBACK ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-100 pt-8 pb-12 px-4 sm:px-8 min-h-screen flex flex-col lg:flex-row justify-center gap-8">
      {/* Contact Information */}
      <div className="w-full lg:w-1/2 px-0 sm:px-4">
        <h2 className="text-center bg-orange-400 text-white p-4 rounded-md shadow-lg text-2xl sm:text-3xl font-bold">
          Get In Touch With Us Now!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 font-semibold mt-8 gap-5">
          <div className="p-6 sm:p-8 flex flex-col items-center gap-2.5 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg">
            <FaPhoneAlt className="text-orange-400 text-4xl" />
            <h2 className="text-xl">Phone Number</h2>
            <p className="text-sm font-normal text-gray-600">+91 98123 45450</p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center gap-2.5 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg">
            <MdEmail className="text-orange-400 text-4xl" />
            <h2 className="font-semibold text-xl">Email</h2>
            <p className="text-sm font-normal text-gray-600 text-center break-all">
              info@dasydelicious.com
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center gap-2.5 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg">
            <FaLocationDot className="text-orange-400 text-4xl" />
            <h2 className="font-semibold text-xl">Location</h2>
            <p className="text-sm font-normal text-gray-600 text-center">
              123 Delicious Street, Food City
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center gap-2.5 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg">
            <FaClock className="text-orange-400 text-4xl" />
            <h2 className="font-semibold text-xl">Working Hours</h2>
            <p className="text-sm font-normal text-gray-600 text-center">
              Mon - Fri: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full lg:w-1/2 px-0 sm:px-4">
        <h2 className="text-center bg-orange-400 text-white p-4 rounded-md shadow-lg text-2xl sm:text-3xl font-bold">
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 py-6 px-5 sm:px-6 rounded-lg flex flex-col gap-4 bg-gray-100 shadow-md"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 h-32 resize-none transition-all duration-200"
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-400 text-lg text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-500 hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
