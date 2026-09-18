const foodModel = require("../models/foodModel");
const fs = require("fs");
const path = require("path");

// add food
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { name, description, price, category } = req.body;

  try {
    const existingFood = await foodModel.findOne({
      name,
      description,
      price,
      category,
    });

    if (existingFood) {
      return res.status(400).json({
        success: false,
        message: "Food item already exists",
      });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food item added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add food item",
      error,
    });
  }
};

// Listing food items for admin panel
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.status(201).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get food item",
      error,
    });
  }
};

// Delete food item
const deleteFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Delete food image from uploads folder
    if (food.image) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        food.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete food item from database
    await foodModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Food item and image deleted successfully",
    });
  } catch (error) {
    console.log("DELETE FOOD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete food item",
      error: error.message,
    });
  }
};

module.exports = {
  addFood,
  listFood,
  deleteFood,
};