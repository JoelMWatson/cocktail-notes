const { db, Sequelize } = require('../database/db')

const user = require("./userModel");
const note = require("./noteModel");

module.exports = {
    User: user(db, Sequelize.DataTypes),
    Note: note(db, Sequelize.DataTypes)
};