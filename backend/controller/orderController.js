const orderModel = require("../models/orderModel");
const foodModel = require("../models/foodModel");

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Order details are required",
      });
    }

    const order = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await orderModel.findOne({
      _id: orderId,
      userId: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.payment = true;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        userId: req.userId,
      })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    const foods = await foodModel.find({});

    const updatedOrders = orders.map((order) => {
      const updatedItems = order.items.map((item) => {
        const food = foods.find((food) => food._id.toString() === item.itemId);

        return {
          itemId: item.itemId,
          quantity: item.quantity,
          name: food ? food.name : "Food item not found",
          price: food ? food.price : 0,
          image: food ? food.image : "",
        };
      });

      return {
        ...order.toObject(),
        items: updatedItems,
      };
    });

    return res.status(200).json({
      success: true,
      orders: updatedOrders,
    });
  } catch (error) {
    console.log("GET ALL ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get all orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
