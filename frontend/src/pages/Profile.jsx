import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiUser, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
const Profile = () => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          "https://dasy-delicious-2.onrender.com/api/user/profile",
          {
            headers: {
              token: token,
            },
          },
        );

        if (response.data.success) {
          setProfile(response.data.user);
          setHasProfile(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "https://dasy-delicious-2.onrender.com/api/user/profile",
        profile,
        {
          headers: {
            token: token,
          },
        },
      );

      if (response.data.success) {
        setHasProfile(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-100 min-h-screen py-8 px-4 sm:px-8">
      {/* Back Button */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="px-2.5 py-1.5 bg-green-400 rounded-md hover:bg-green-500 cursor-pointer active:scale-95 transition-all duration-200 shadow-sm"
        title="Go Back"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="max-w-4xl mx-auto mt-5">
        {/* ================= EMPTY PROFILE ================= */}

        {!hasProfile && !isEditing && (
          <div className="bg-gray-100 rounded-xl shadow-md p-8 sm:p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm">
              <FiUser className="text-4xl" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-5">
              Complete Your Profile
            </h2>

            <p className="text-gray-500 max-w-md mx-auto mt-2">
              Add your personal and delivery details to make your ordering
              experience faster and easier.
            </p>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="mt-6 px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg cursor-pointer active:scale-95 transition-all duration-200"
            >
              Add Profile Details
            </button>
          </div>
        )}

        {/* ================= PROFILE FORM ================= */}

        {isEditing && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-7"
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="w-16 h-16 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm">
                <FiUser className="text-3xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {hasProfile ? "Edit Profile" : "Complete Your Profile"}
                </h2>

                <p className="text-sm text-gray-500">
                  Enter your personal information
                </p>
              </div>
            </div>

            {/* Personal Information */}

            <div className="bg-white border border-blue-100 rounded-lg p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    First Name
                  </label>

                  <input
                    required
                    name="firstName"
                    type="text"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Last Name
                  </label>

                  <input
                    required
                    name="lastName"
                    type="text"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>

                  <input
                    required
                    readOnly
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>

                  <input
                    required
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}

            <div className="bg-white border border-blue-100 rounded-lg p-5 mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Street Address
                  </label>

                  <input
                    required
                    name="street"
                    type="text"
                    value={profile.street}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City
                  </label>

                  <input
                    required
                    name="city"
                    type="text"
                    value={profile.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    State
                  </label>

                  <input
                    required
                    name="state"
                    type="text"
                    value={profile.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Zip Code
                  </label>

                  <input
                    required
                    name="zipcode"
                    type="text"
                    value={profile.zipcode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Country
                  </label>

                  <input
                    required
                    name="country"
                    type="text"
                    value={profile.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </div>
              </div>
            </div>

            {/* Form Buttons */}

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg cursor-pointer active:scale-95 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg cursor-pointer active:scale-95 transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {/* ================= PROFILE VIEW ================= */}

        {hasProfile && !isEditing && (
          <div className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-7">
            {/* Header */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm">
                  <FiUser className="text-3xl" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    My Profile
                  </h2>

                  <p className="text-sm text-gray-500">
                    Your personal information
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg cursor-pointer active:scale-95 transition-all duration-200"
              >
                <FiEdit2 />
                Edit Profile
              </button>
            </div>

            {/* Personal Information */}

            <div className="bg-white border border-blue-100 rounded-lg p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">First Name</p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {profile.firstName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last Name</p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {profile.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {profile.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {profile.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}

            <div className="bg-white border border-blue-100 rounded-lg p-5 mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Delivery Address
              </h3>

              <p className="text-gray-700">{profile.street}</p>

              <p className="text-gray-700 mt-1">
                {profile.city}, {profile.state} - {profile.zipcode}
              </p>

              <p className="text-gray-700 mt-1">{profile.country}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
