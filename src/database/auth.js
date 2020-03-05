const jwt = require('jsonwebtoken');
const models = require('../models/index');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await models.User.findOne({ where: { id: decoded.id, tokens: token }});
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch(error) {
        res.status(401).send({ error: 'Please Authenticate'});
    }
};

module.exports = auth;