// src/routes/auth.routes.js

const express = require('express')
const authController = require('../controllers/auth.controller')
const { authenticate } = require('../middlewares/auth.middleware')

const router = express.Router()

// Public routes
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)

// Protected routes
router.post('/logout', authenticate, authController.logout)
router.get('/me', authenticate, authController.getMe)

module.exports = router