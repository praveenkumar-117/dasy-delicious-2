const cors = require('cors')
const express = require('express')
const connectDB = require('./config/db')
require('dotenv/config')
const foodRouter = require('./routes/foodRoutes')
const userRouter = require('./routes/userRoutes')
const cartRouter = require("./routes/cartRoutes")
const orderRouter = require("./routes/orderRoutes")
const adminRouter = require("./routes/adminRoutes")
const feedbackRouter = require("./routes/feedbackRoutes");


const app = express()

const PORT = 7000;

//middleware
app.use(express.json())
app.use(cors())

connectDB()
app.use("/api/admin/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/admin", adminRouter)
app.use("/api/feedback", feedbackRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})


