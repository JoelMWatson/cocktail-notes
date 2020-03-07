const Sequelize = require('sequelize');

const db = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres'
});

module.exports = { db , Sequelize};