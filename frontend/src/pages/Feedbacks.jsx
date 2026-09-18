import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");

        const response = await axios.get(
          "http://localhost:7000/api/feedback/all",
          {
            headers: {
              admintoken: adminToken,
            },
          }
        );

        if (response.data.success) {
          setFeedbacks(response.data.feedbacks);
        }
      } catch (error) {
        console.log("GET FEEDBACKS ERROR:", error);
      }
    };

    getFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-5 sm:p-8">

        <div className="bg-white rounded-xl shadow-md p-5 sm:p-7">

          <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center mb-8">
            Customers Feedback
          </h1>

          {feedbacks.length === 0 ? (
            <div className="text-gray-500 text-center py-12">
              No feedbacks available.
            </div>
          ) : (
            <div className="space-y-4">

              {feedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="border border-gray-200 rounded-lg bg-gray-100 shadow-sm overflow-hidden"
                >

                  {/* Name + Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 bg-orange-400 text-black">
                    <h2 className="font-semibold text-lg">
                      {feedback.name}
                    </h2>

                    <p className="text-sm">
                      {new Date(feedback.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Message */}
                  <div className="px-5 py-5 border-b border-gray-200">
                    <p className="text-gray-700 leading-relaxed break-words">
                      {feedback.message}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="px-5 py-3 bg-gray-100">
                    <p className="text-sm text-gray-600 break-all">
                      {feedback.email}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Feedbacks;