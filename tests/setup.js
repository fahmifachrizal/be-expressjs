// tests/setup.js

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-secret'
process.env.JWT_EXPIRES_IN = '15m'

// Silence logs except errors
jest.spyOn(console, 'log').mockImplementation(() => {})
jest.spyOn(console, 'warn').mockImplementation(() => {})

// Crash on unhandled rejections
process.on('unhandledRejection', (err) => {
  throw err
})

afterAll(() => {
  jest.restoreAllMocks()
})
