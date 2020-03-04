const express = require('express');
const models = require('../models/index');
router = express.Router();

// login
router.post('/user/login', async (req, res) => {
    try {
        const user = await models.User.findOne({
            where: {
                email: req.body.email,
            }
        });
        await user.save();
        if (!user) {
            return res.status(400).send('Invalid Credentials');
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }


});

// create
router.post('/user/new', async (req, res) => {
    try {
        const user = await models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        if (!user) {
            return res.status(400).send();
        }
        user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }

});

// delete
router.delete('/user', async (req, res) => {
    try {
        const user = await models.User.findOne({
            where: {
                id: req.body.id
            }
        });
        if (!user) {
            return res.status(404).send('No matching users found')
        }
        user.destroy();
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// update
router.patch('/user', (req, res) => {
    // TODO when adding update
});

module.exports = router;