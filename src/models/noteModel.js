const { db, Sequelize} = require('../database/db');

module.exports = function(sequelize, DataTypes) {
    const Notes = sequelize.define('notes', {
        // attributes
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {/* options */});

    return Notes;
};