'use strict';
const { Sequelize } = require("sequelize")
const config = require("../config/database")
const sequelize = new Sequelize(config.development)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require("./User")(sequelize, Sequelize.DataTypes)
db.Product = require("./Product")(sequelize, Sequelize.DataTypes)

module.exports = db