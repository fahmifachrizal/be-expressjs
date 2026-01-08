// jest.config.js
module.exports = {
  testEnvironment: "node",

  // Test discovery
  testMatch: ["**/tests/**/*.test.js"],

  // Test lifecycle hooks
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],

  /**
   * ===============================
   * ISTANBUL (COVERAGE) CONFIG
   * ===============================
   */
  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",   // entrypoint
    "!src/app.js",      // express bootstrap
    "!src/config/**",   // env/config files
    "!src/database/**", // migrations / seeders
  ],

  coverageDirectory: "coverage",

  coverageReporters: [
    "text",        // terminal summary
    "text-summary",
    "lcov",        // for CI & tools
    "html",        // browser UI
  ],

  /**
   * Coverage thresholds (Istanbul enforcement)
   */
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },

  /**
   * ===============================
   * REPORTING
   * ===============================
   */
  verbose: true,

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports",
        filename: "jest-report.html",
        expand: true,
        pageTitle: "API Test Report",
      },
    ],
  ],
}
