// src/services/auth.service.js

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../database/models")
const { AuthErrors, ValidationError } = require("../utils/errors")

// In-memory store for refresh tokens (use Redis in production)
// TODO
const refreshTokenStore = new Map()

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m",
  })
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  })
}

const register = async ({
  username,
  name,
  email,
  password,
  role = "staff",
}) => {
  // Validation
  if (!username || !name || !email || !password) {
    throw new ValidationError("All fields are required", "VAL-001")
  }

  if (password.length < 6) {
    throw new ValidationError(
      "Password must be at least 6 characters",
      "VAL-002"
    )
  }

  // Check if user exists
  const existingUser = await db.User.findOne({
    where: {
      [db.Sequelize.Op.or]: [{ email }, { username }],
    },
  })

  if (existingUser) {
    if (existingUser.email === email) {
      throw AuthErrors.USER_EXISTS
    }
    throw new ValidationError("Username already taken", "AUTH-009")
  }

  // Hash password
  const password_hashed = await bcrypt.hash(password, 12)

  // Create user
  const user = await db.User.create({
    username,
    name,
    email,
    password: password_hashed,
    role,
  })

  // Generate tokens
  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  // Store refresh token
  refreshTokenStore.set(refreshToken, user.id)

  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  }
}

const login = async ({ username, password }) => {
  // Validation
  if (!username || !password) {
    throw new ValidationError("Username and password are required", "VAL-001")
  }

  // Find user
  const user = await db.User.findOne({
    where: { username },
  })

  if (!user) {
    throw AuthErrors.INVALID_CREDENTIALS
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw AuthErrors.INVALID_CREDENTIALS
  }

  // Generate tokens
  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  // Store refresh token
  refreshTokenStore.set(refreshToken, user.id)

  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  }
}

const logout = async (refreshToken) => {
  if (refreshToken) {
    refreshTokenStore.delete(refreshToken)
  }
  return { message: "Logged out successfully" }
}

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ValidationError("Refresh token is required", "VAL-001")
  }

  // Verify refresh token
  let decoded
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  } catch (error) {
    throw AuthErrors.INVALID_REFRESH_TOKEN
  }

  // Check if token is in store
  const storedUserId = refreshTokenStore.get(refreshToken)
  if (!storedUserId || storedUserId !== decoded.userId) {
    throw AuthErrors.INVALID_REFRESH_TOKEN
  }

  // Find user
  const user = await db.User.findByPk(decoded.userId)
  if (!user) {
    throw AuthErrors.INVALID_REFRESH_TOKEN
  }

  // Generate new access token
  const accessToken = generateAccessToken(user.id)

  return {
    accessToken,
  }
}

const getCurrentUser = async (userId) => {
  const user = await db.User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  })

  if (!user) {
    throw AuthErrors.INVALID_TOKEN
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshAccessToken,
  getCurrentUser,
}
