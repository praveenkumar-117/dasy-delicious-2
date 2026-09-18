const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI)
    console.info("Database Connected")
  } catch (error) {
    console.error("Database connection failed")
  }
}

module.exports = connectDB;