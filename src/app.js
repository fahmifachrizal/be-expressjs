// src/app.js

const express = require("express")
const cors = require("cors")
const healthRoutes = require("./routes/health.routes")
const authRoutes = require("./routes/auth.routes")
const errorHandler = require("./middlewares/error.middleware")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/health", healthRoutes)
app.use("/auth", authRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errorCode: "NOT-001",
  })
})

// Global error handler (must be last)
app.use(errorHandler)

module.exports = app