const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const cartData = {
      ...(user.cartData || {}),
    };

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    user.cartData = cartData;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item Added To Cart",
      cartData: user.cartData,
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

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      cartData: user.cartData || {},
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

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const cartData = {
      ...(user.cartData || {}),
    };

    if (!cartData[itemId]) {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    user.cartData = cartData;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item Removed From Cart",
      cartData: user.cartData,
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

const deleteCartItem = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const cartData = {
      ...(user.cartData || {}),
    };

    if (!cartData[itemId]) {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    delete cartData[itemId];

    user.cartData = cartData;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item Deleted From Cart",
      cartData: user.cartData,
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

const clearCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    user.cartData = {};

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully",
      cartData: user.cartData,
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
module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  deleteCartItem,
  clearCart,
};
