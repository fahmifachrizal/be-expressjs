'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM("admin", "staff"),
        allowNull: false,
        defaultValue: "staff",
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users")
  },
}