const { User, sequelize } = require("../database/models")
const { hashPassword, comparePassword } = require("../utils/password")
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt")

// Register new user
const register = async ({ name, username, email, password }) => {
  return sequelize.transaction(async (t) => {
    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
      transaction: t,
    })

    if (existingUser) {
      const error = new Error("Email already registered")
      error.statusCode = 409
      throw error
    }

    const passwordHash = await hashPassword(password)

    const user = await User.create(
      {
        name,
        username,
        email: normalizedEmail,
        password: passwordHash,
      },
      { transaction: t }
    )

    const payload = {
      id: user.id,
      role: user.role,
      username: user.username,
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    }
  })
}

// Login user
const login = async ({ username, password }) => {
  const user = await User.findOne({
    where: { username },
  })

  if (!user) {
    const error = new Error("Invalid credentials")
    error.statusCode = 401
    throw error
  }

  const validPassword = await comparePassword(password, user.password)

  if (!validPassword) {
    const error = new Error("Invalid credentials")
    error.statusCode = 401
    throw error
  }

  const payload = {
    id: user.id,
    role: user.role,
    username: user.username,
  }

  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)

  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  }
}

const me = async (req, res, next) => {
  const authHeader = req.headers.authorization
  try {
    const decoded = verifyToken(token)
    req.user = decoded // usually contains userId, email, role, etc
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid or expired token",
    })
  }
}

module.exports = {
  register,
  login,
}