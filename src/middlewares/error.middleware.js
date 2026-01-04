// src/middlewares/error.middleware.js

const { AppError } = require("../utils/errors")

const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    errorCode: err.errorCode,
  })

  // Handle operational errors (known errors)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
    })
  }

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errorCode: "VAL-001",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    })
  }

  // Handle Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Resource already exists",
      errorCode: "CONF-001",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    })
  }

  // Handle Sequelize database errors
  if (err.name && err.name.startsWith("Sequelize")) {
    return res.status(500).json({
      success: false,
      message: "Database error occurred",
      errorCode: "DB-001",
    })
  }

  // Handle unexpected errors (programming errors, unknown errors)
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    errorCode: "SYS-001",
  })
}

module.exports = errorHandler
