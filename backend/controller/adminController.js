const jwt = require("jsonwebtoken")

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      })
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      })
    }

    const token = jwt.sign(
      {
        email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    )

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token
    })

  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}

module.exports = { loginAdmin }