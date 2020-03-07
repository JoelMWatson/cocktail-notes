const express = require('express');
const { search } = require('../utils/search');
let sesh = require('./session.js');

router = express.Router();

// search
router.post('/api/s', async (req, res) => {
    try {
        sesh = req.session;
        if (!sesh.userId) {
            return res.redirect('/');
        }
        search(req.body.search, (error, drinks) => {
            if (error) {
                return res.send({ error });
            }
            res.send(drinks);
        });
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;