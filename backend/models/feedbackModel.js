const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const feedbackModel =
  mongoose.models.feedback ||
  mongoose.model("feedback", feedbackSchema);

module.exports = feedbackModel;