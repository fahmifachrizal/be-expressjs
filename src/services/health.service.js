// src/services/health.service.js

const db = require('../database/models')

const checkHealth = () => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }
}

const checkDatabase = async () => {
  try {
    await db.sequelize.authenticate()
    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

module.exports = {
  checkHealth,
  checkDatabase,
}