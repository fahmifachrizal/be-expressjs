// src/utils/errors.js

class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthError extends AppError {
  constructor(message, errorCode) {
    super(message, 401, errorCode)
  }
}

class ValidationError extends AppError {
  constructor(message, errorCode = 'VAL-001') {
    super(message, 400, errorCode)
  }
}

class NotFoundError extends AppError {
  constructor(message, errorCode = 'NOT-001') {
    super(message, 404, errorCode)
  }
}

class DatabaseError extends AppError {
  constructor(message, errorCode = 'DB-001') {
    super(message, 500, errorCode)
  }
}

class ConflictError extends AppError {
  constructor(message, errorCode = 'CONF-001') {
    super(message, 409, errorCode)
  }
}

// Predefined auth errors
const AuthErrors = {
  INVALID_CREDENTIALS: new AuthError('Invalid username or password', 'AUTH-001'),
  USER_EXISTS: new ConflictError('User already exists', 'AUTH-002'),
  INVALID_TOKEN: new AuthError('Invalid token', 'AUTH-003'),
  TOKEN_EXPIRED: new AuthError('Token has expired', 'AUTH-004'),
  UNAUTHORIZED: new AuthError('Unauthorized access', 'AUTH-005'),
  MISSING_TOKEN: new AuthError('No token provided', 'AUTH-006'),
  INVALID_REFRESH_TOKEN: new AuthError('Invalid refresh token', 'AUTH-007'),
}

module.exports = {
  AppError,
  AuthError,
  ValidationError,
  NotFoundError,
  DatabaseError,
  ConflictError,
  AuthErrors,
}