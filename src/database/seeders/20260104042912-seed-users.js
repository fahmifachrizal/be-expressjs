"use strict"
const bcrypt = require("bcrypt")

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        id: require("crypto").randomUUID(),
        username: "admin",
        name: "Administrator",
        email: "admin@email.com",
        password: bcrypt.hashSync("Admin123!", 10),
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {})
  },
}