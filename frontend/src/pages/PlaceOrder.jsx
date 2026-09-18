import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { token, cartItems, food_list, getCartAmount } =
    useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [savedFormData, setSavedFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:7000/api/user/profile",
          {
            headers: {
              token: token,
            },
          },
        );

        if (response.data.success) {
          const user = response.data.user;

          const profileData = {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            street: user.street || "",
            city: user.city || "",
            state: user.state || "",
            zipcode: user.zipcode || "",
            country: user.country || "",
            phone: user.phone || "",
          };

          setFormData(profileData);
          setSavedFormData(profileData);
        }
      } catch (error) {
        console.log("PROFILE FETCH ERROR:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const subtotal = getCartAmount();

  const deliveryCharge = subtotal === 0 ? 0 : subtotal < 500 ? 40 : 0;

  const tax = subtotal * 0.05;

  const total = subtotal + deliveryCharge + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return;
    }

    const items = Object.entries(cartItems).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    }));

    try {
      const response = await axios.post(
        "http://localhost:7000/api/order/place",
        {
          items,
          amount: total,
         
          address: isEditing ? formData : savedFormData,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      if (response.data.success) {
        const orderId = response.data.order._id;

        navigate("/payment", {
          state: {
            orderId,
          },
        });
      }
    } catch (error) {
      console.log("PLACE ORDER ERROR:", error);
    }
  };

  return (
    <div className="bg-blue-100 py-8 px-4 sm:px-8 min-h-screen">
      <button
        type="button"
        onClick={() => navigate("/cart")}
        className="px-2.5 py-1.5 bg-green-400 rounded-md hover:bg-green-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
        title="Go Back"
      >
        <IoMdArrowRoundBack />
      </button>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto mt-5">
        {/* ================= DELIVERY INFORMATION ================= */}

        <div className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Delivery Information
            </h2>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>

          {!isEditing ? (
            /* ================= DETAILS VIEW ================= */

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>

                <p className="font-semibold text-gray-800">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="font-semibold text-gray-800">{formData.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>

                <p className="font-semibold text-gray-800">{formData.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Address</p>

                <p className="font-semibold text-gray-800">{formData.street}</p>

                <p className="text-gray-700">
                  {formData.city}, {formData.state} - {formData.zipcode}
                </p>

                <p className="text-gray-700">{formData.country}</p>
              </div>
            </div>
          ) : (
            /* ================= EDIT FORM ================= */

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />

                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </div>

              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 w-full mb-4"
              />

              <input
                required
                name="street"
                type="text"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleChange}
                className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 w-full mb-4"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  required
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />

                <input
                  required
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  required
                  name="zipcode"
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />

                <input
                  required
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </div>

              <input
                required
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-2.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300 w-full"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(savedFormData);
                    setIsEditing(false);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-md transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSavedFormData(formData);
                    setIsEditing(false);
                  }}
                  className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Your Items
            </h2>

            <div className="space-y-4">
              {Object.entries(cartItems).map(([itemId, quantity]) => {
                const item = food_list.find((food) => food._id === itemId);

                if (!item) return null;

                return (
                  <div
                    key={itemId}
                    className="flex items-center justify-between gap-3 border-b border-gray-300 pb-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={`http://localhost:7000/images/${item.image}`}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shadow-sm"
                      />

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 truncate">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      </div>
                    </div>

                    <p className="font-semibold text-gray-800 whitespace-nowrap">
                      ₹{item.price * quantity}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl shadow-md p-5 sm:p-6 self-start">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Cart Total
            </h2>

            <div className="flex justify-between mb-3 text-gray-700">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mb-3 text-gray-700">
              <p>Delivery Fee</p>

              <p>
                {deliveryCharge === 0 && subtotal > 0
                  ? "Free"
                  : `₹${deliveryCharge}`}
              </p>
            </div>

            <div className="flex justify-between mb-4 text-gray-700">
              <p>Tax</p>
              <p>₹{tax.toFixed(2)}</p>
            </div>

            <div className="border-t border-gray-400 pt-4 flex justify-between text-lg">
              <b className="text-gray-800">Total</b>

              <b className="text-orange-600">₹{total.toFixed(2)}</b>
            </div>

            <button
              type="submit"
              disabled={isEditing}
              className={`text-white font-semibold rounded-lg px-4 py-2.5 mt-5 w-full transition-all duration-200 ${
                isEditing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-500 active:scale-[0.98] cursor-pointer"
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
