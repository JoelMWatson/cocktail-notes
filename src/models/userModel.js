const { db, Sequelize} = require('../database/db');
const validator = require('validator');
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('users', {
        // attributes
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email invalid');
                }
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('password cannot contain the word "password"');
                }
            }
        }
    }, {
        instanceMethods: {
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });

    // Hash the password before saving if password was changed
    User.beforeSave((user) => {
        if (user.changed('password')) {
            return bcrypt.hash(user.password, 10)
                .then(hash => {
                    user.password = hash;
                })
                .catch(err => {
                    throw new Error();
                });
        }
    });

    return User;
};

