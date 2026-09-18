const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // Profile Details
  firstName: {
    type: String,
    default: ""
  },

  lastName: {
    type: String,
    default: ""
  },

  phone: {
    type: String,
    default: ""
  },

  street: {
    type: String,
    default: ""
  },

  city: {
    type: String,
    default: ""
  },

  state: {
    type: String,
    default: ""
  },

  zipcode: {
    type: String,
    default: ""
  },

  country: {
    type: String,
    default: ""
  },

  cartData: {
    type: Object,
    default: {}
  }
})


const userModel = mongoose.models.user || mongoose.model("user", userSchema)

module.exports = userModel