const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require("dotenv");

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: " User Already Exists",
      });
    }
    //validating email format and stong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Valid Email Id",
      });
    }

    // check password strenght
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a Strong password",
      });
    }

    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured ",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured ",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const user = await userModel
      .findById(req.userId)
      .select("-password -cartData");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
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

const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,

      phone,
      street,
      city,
      state,
      zipcode,
      country,
    } = req.body;

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.street = street;
    user.city = city;
    user.state = state;
    user.zipcode = zipcode;
    user.country = country;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
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

module.exports = { registerUser, loginUser, getProfile, updateProfile };
