require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const rateLimiter = require("./middleware/rateLimiter")
const errorHandler = require("./middleware/errorHandler")
const deviceRoutes = require("./routes/deviceRoutes")
const telemetryRoutes = require("./routes/telemetryRoutes")

const app = express()

app.use(express.json())

app.use(rateLimiter)

app.use("/devices", deviceRoutes)
app.use("/telemetry", telemetryRoutes)

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"))

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})