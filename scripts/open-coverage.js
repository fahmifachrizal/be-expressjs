const { exec } = require("child_process")
const path = require("path")

const filePath = path.resolve(
  __dirname,
  "../coverage/lcov-report/index.html"
)

const command =
  process.platform === "win32"
    ? `start "" "${filePath}"`
    : process.platform === "darwin"
    ? `open "${filePath}"`
    : `xdg-open "${filePath}"`

exec(command, (err) => {
  if (err) {
    console.error("Failed to open coverage report:", err)
  }
})
