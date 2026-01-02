// src/server.js
require('dotenv').config()
const app = require('./app')

const PORT = process.env.APP_PORT

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})