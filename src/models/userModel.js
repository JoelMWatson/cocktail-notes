const { db, Sequelize} = require('../database/db');
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('users', {
        // attributes
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                not: ["password",'i'],
            }
        }
    }, {/* options */});

    // BeforeSave Hook
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


    // Login function on User model
    User.login = async (email, password) => {
        const user = await User.findOne({ where: { email }});
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    };

    return User;

};

