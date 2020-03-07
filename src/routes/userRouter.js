const express = require('express');
const models = require('../models/index');

let sesh = require('./session.js');


router = express.Router();

// login
router.post('/login', async (req, res) => {
    sesh = req.session;
    try {
        const user = await models.User.login(req.body.email, req.body.password);
        if (!user) {
            return res.status(400).send('Invalid Login');
        }
        sesh.username = user.username;
        sesh.userId = user.id;
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

// logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// create
router.post('/user', async (req, res) => {
    sesh = req.session;
    try {
        const user = await models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        if (!user) {
            return res.status(400).send();
        }
        sesh.username = user.username;
        sesh.userId = user.id;
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// update
router.patch('/user', async (req, res) => {
    // TODO when adding update
});

module.exports = router;