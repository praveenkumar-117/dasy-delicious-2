const feedbackModel = require("../models/feedbackModel");

const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const feedback = new feedbackModel({
      name,
      email,
      message,
    });

    await feedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.log("SUBMIT FEEDBACK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
      error: error.message,
    });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find({}).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.log("GET ALL FEEDBACKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get feedbacks",
      error: error.message,
    });
  }
};
module.exports = {
  submitFeedback,
  getAllFeedbacks,
};
