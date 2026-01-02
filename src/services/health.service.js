

const checkHealth = () => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }
}

const checkDatabase = async () => {
  try {
    await db.query("SELECT 1")
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  checkHealth,
  checkDatabase,
}
