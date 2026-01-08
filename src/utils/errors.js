// src/utils/errors.js

class AppError extends Error {
  constructor(message, statusCode, errorCode, details = null) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.details = details
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthError extends AppError {
  constructor(message, errorCode = 'AUTH-001', details = null) {
    super(message, 401, errorCode, details)
  }
}

class AuthorizationError extends AppError {
  constructor(message, errorCode = 'AUTH-008', details = null) {
    super(message, 403, errorCode, details)
  }
}

class ValidationError extends AppError {
  constructor(message, errorCode = 'VAL-001', details = null) {
    super(message, 400, errorCode, details)
  }
}

class NotFoundError extends AppError {
  constructor(message, errorCode = 'NOT-001', details = null) {
    super(message, 404, errorCode, details)
  }
}

class BusinessError extends AppError {
  constructor(message, errorCode = 'BUS-001', details = null) {
    super(message, 422, errorCode, details)
  }
}

class DatabaseError extends AppError {
  constructor(message, errorCode = 'DB-001', details = null) {
    super(message, 500, errorCode, details)
  }
}

class ConflictError extends AppError {
  constructor(message, errorCode = 'CONF-001', details = null) {
    super(message, 409, errorCode, details)
  }
}

class SystemError extends AppError {
  constructor(message, errorCode = 'SYS-001', details = null) {
    super(message, 500, errorCode, details)
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
  AuthorizationError,
  ValidationError,
  NotFoundError,
  BusinessError,
  DatabaseError,
  ConflictError,
  SystemError,
  AuthErrors,
}