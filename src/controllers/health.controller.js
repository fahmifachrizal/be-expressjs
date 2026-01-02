// src/controllers/health.controller.js

const healthService = require('../services/health.service')

const check = async (req, res, next) => {
  try {
    const result = healthService.checkHealth()

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  check,
}