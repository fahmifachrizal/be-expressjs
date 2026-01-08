// src/middlewares/error.middleware.js

const {
  AppError,
  ValidationError,
  ConflictError,
  DatabaseError,
  SystemError,
} = require("../utils/errors")

const errorHandler = (err, req, res, next) => {
  let error = err

  // Normalize error to AppError
  if (!(error instanceof AppError)) {
    if (error.name === "SequelizeValidationError") {
      const details = error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }))
      error = new ValidationError("Validation error", "VAL-001", details)
    } else if (error.name === "SequelizeUniqueConstraintError") {
      const details = error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }))
      error = new ConflictError("Resource already exists", "CONF-001", details)
    } else if (error.name && error.name.startsWith("Sequelize")) {
      error = new DatabaseError("Database error occurred")
    } else {
      // Unexpected errors
      const message =
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error.message
      error = new SystemError(message)
      error.stack = err.stack // Preserve original stack
    }
  }

  // Logging Strategy
  const logContext = {
    code: error.errorCode,
    message: error.message,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    requestId: req.headers["x-request-id"],
    userId: req.user?.id,
  }

  if (error.statusCode >= 500) {
    console.error("System Error:", { ...logContext, stack: error.stack })
  } else if (error.statusCode >= 400) {
    console.warn("Client Error:", logContext)
  } else {
    console.info("Error:", logContext)
  }

  // Standard Response
  const response = {
    success: false,
    error: {
      code: error.errorCode,
      message: error.message,
    },
  }

  if (error.details) {
    response.error.details = error.details
  }

  return res.status(error.statusCode).json(response)
}

module.exports = errorHandler
