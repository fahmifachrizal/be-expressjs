// src/controllers/auth.controller.js

const authService = require('../services/auth.service')

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken
    const result = await authService.logout(refreshToken)

    res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    next(error)
  }
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    const result = await authService.refreshAccessToken(refreshToken)

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.userId)

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  logout,
  refresh,
  getMe,
}