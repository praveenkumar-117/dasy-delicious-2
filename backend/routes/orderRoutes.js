const express = require("express");

const {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controller/orderController")

const authMiddleware = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")

const orderRouter = express.Router()


// User routes
orderRouter.post("/place", authMiddleware, placeOrder)

orderRouter.post("/verify", authMiddleware, verifyOrder)

orderRouter.get("/userorders", authMiddleware, getUserOrders)


// Admin routes
orderRouter.get("/all", adminAuth, getAllOrders)

orderRouter.put("/status", adminAuth, updateOrderStatus)


module.exports = orderRouter