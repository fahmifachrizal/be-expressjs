// src/services/health.service.js

const checkHealth = () => {
  return {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }
}

module.exports = {
  checkHealth,
}