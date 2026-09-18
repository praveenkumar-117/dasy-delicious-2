const express = require("express")

const {
  addToCart,
  getCart,
  removeFromCart,
  deleteCartItem,
  clearCart
} = require("../controller/cartController")

const authMiddleware = require("../middleware/auth")

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleware, addToCart)

cartRouter.get("/get", authMiddleware, getCart)

cartRouter.post("/remove", authMiddleware, removeFromCart)

cartRouter.post("/delete", authMiddleware, deleteCartItem)

cartRouter.post("/clear", authMiddleware, clearCart)

module.exports = cartRouter