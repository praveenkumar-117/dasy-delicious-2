const express = require("express")
const {
  loginUser,
  registerUser,
  getProfile,
  updateProfile
} = require("../controller/userController")

const authMiddleware = require("../middleware/auth")

const userRouter = express.Router()

// Public routes
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

// Protected route
userRouter.get("/profile", authMiddleware, getProfile)

userRouter.put("/profile", authMiddleware, updateProfile)

module.exports = userRouter