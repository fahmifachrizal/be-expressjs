// src/middlewares/auth.middleware.js

const jwt = require("jsonwebtoken")
const { AuthErrors } = require("../utils/errors")
const db = require("../database/models")

const authenticate = async (req, res, next) => {
  try {
    // Extract token from header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw AuthErrors.MISSING_TOKEN
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    if (!token) {
      throw AuthErrors.MISSING_TOKEN
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw AuthErrors.TOKEN_EXPIRED
      }
      throw AuthErrors.INVALID_TOKEN
    }

    // Find user
    const user = await db.User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      throw AuthErrors.INVALID_TOKEN
    }

    // Attach user to request
    req.user = user
    req.userId = decoded.userId

    next()
  } catch (error) {
    next(error)
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(AuthErrors.UNAUTHORIZED)
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AuthErrors.UNAUTHORIZED.constructor(
          "Insufficient permissions",
          "AUTH-008"
        )
      )
    }

    next()
  }
}

module.exports = {
  authenticate,
  authorize,
}
