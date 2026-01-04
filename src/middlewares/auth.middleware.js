// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid or expired access token" })
  }
}