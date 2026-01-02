// src/controllers/health.controller.js

const healthService = require("../services/health.service")

const checkHealth = async (req, res, next) => {
  try {
    const result = await healthService.checkHealth()

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const checkDatabase = async (req, res, next) => {
  try {
    const dbHealthy = await healthService.checkDatabase()

    if (!dbHealthy) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      })
    }

    res.status(200).json({
      success: true,
      message: "Database is healthy",
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkHealth,
  checkDatabase,
}