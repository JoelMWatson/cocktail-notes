const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

// Check connection
// db.authenticate()
// .then(() => {
//     console.log('Connection has been established successfully.');
// })
// .catch(err => {
//     console.error('Unable to connect to the database:', err);
// });

module.exports = { db , Sequelize};