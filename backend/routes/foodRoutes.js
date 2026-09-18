const express = require("express");
const multer = require("multer");

const {
  addFood,
  listFood,
  deleteFood,
} = require("../controller/foodController");

const adminAuth = require("../middleware/adminAuth");

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// Public route
foodRouter.get("/list", listFood);

// Admin routes
foodRouter.post("/add", adminAuth, upload.single("image"), addFood);

foodRouter.post("/delete", adminAuth, deleteFood);

module.exports = foodRouter;
