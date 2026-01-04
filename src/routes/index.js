const express = require("express")

const healthRoute = require("./health.routes")
const authRoute = require("./auth.routes")

const router = express.Router()

router.use("/health", healthRoute)
router.use("/auth", authRoute)

module.exports = router