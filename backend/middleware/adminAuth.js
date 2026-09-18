const jwt = require("jsonwebtoken")

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.admintoken

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin authorization required"
      })
    }

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    if (token_decode.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      })
    }

    next()

  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error.message)

    return res.status(401).json({
      success: false,
      message: "Invalid admin token"
    })
  }
}

module.exports = adminAuth