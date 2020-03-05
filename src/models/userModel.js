const { db, Sequelize} = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('users', {
        // attributes
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                not: ["password",'i'],
            }
        },
        tokens: {
            type: Sequelize.STRING.BINARY,
            defaultValue: 0
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

    // Creates a auth token valid for 1 day
    User.generateAuthToken = async (user) => {
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: '1 day'});
        user.tokens = token;
        await user.save();
        return token;
    };

    // Login function on User model
    User.login = async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        await User.generateAuthToken(user);
        return user;
    };

    // Logout
    User.logout = async (user) => {
        user.tokens = "0";
        await user.save();
        return user;
    };



    return User;

};

