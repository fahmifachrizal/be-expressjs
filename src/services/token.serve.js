// services/token.service.js
const {
  verifyRefreshToken,
  generateAccessToken,
} = require("../utils/jwt")

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token required")
    error.statusCode = 400
    throw error
  }

  try {
    const decoded = verifyRefreshToken(refreshToken)

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
      username: decoded.username,
    })

    return { accessToken: newAccessToken }
  } catch {
    const error = new Error("Invalid or expired refresh token")
    error.statusCode = 401
    throw error
  }
}

module.exports = { refreshAccessToken }