const { db, Sequelize } = require('../database/db')

const user = require("./userModel");

module.exports = {
    User: user(db, Sequelize.DataTypes),
};