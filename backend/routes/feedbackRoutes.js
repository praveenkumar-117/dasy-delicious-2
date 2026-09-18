const express = require("express");

const {
  submitFeedback,
  getAllFeedbacks,
} = require("../controller/feedbackController");

const adminAuth = require("../middleware/adminAuth");

const feedbackRouter = express.Router();

// Customer
feedbackRouter.post("/submit", submitFeedback);

// Admin
feedbackRouter.get("/all", adminAuth, getAllFeedbacks);

module.exports = feedbackRouter;