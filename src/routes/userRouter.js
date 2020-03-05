const express = require('express');
const models = require('../models/index');
const auth = require('../database/auth');

router = express.Router();

router.get('/user', auth, async (req, res) => {
    try {
        const user = await models.User.findOne({ where: { id: req.user.id }});
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});


// login
router.post('/user/login', async (req, res) => {
    try {
        const user = await models.User.login(req.body.email, req.body.password);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// logout
router.patch('/user/logout', auth, async (req, res) => {
    try {
        let user = await models.User.findOne({ where: { id: req.user.id }});
        user = models.User.logout(user);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create
router.post('/user', async (req, res) => {
    try {
        const user = await models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        if (!user) {
            return res.status(400).send();
        }
        await models.User.generateAuthToken(user);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }

});

// update
router.patch('/user', auth, async (req, res) => {
    // TODO when adding update
});

module.exports = router;