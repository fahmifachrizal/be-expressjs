// src/app.js

const express = require("express")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(3000)
// optional: centralized error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
})

module.exports = app