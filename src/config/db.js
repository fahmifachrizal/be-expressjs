const { Pool } = require("pg")

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  min: Number(process.env.DB_POOL_MIN || 2),
  max: Number(process.env.DB_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_TIMEOUT || 30000),
})

pool.on("connect", () => {
  console.log("Database connected")
})

pool.on("error", (err) => {
  console.error("Unexpected database error", err)
  process.exit(1)
})

module.exports = pool
