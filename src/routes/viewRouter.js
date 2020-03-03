const express = require('express');

router = express.Router();

router.get('/', (req, res) => {
    res.send("Login & Home");
});

router.get('/register', (req, res) => {
    res.send('register');
});

router.get('/about', (req, res) => {
    res.send('about');
});

router.get('/team', (req, res) => {
    res.render('pages/team.ejs', { title: "Meet the Team" });
});

router.get('*', (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = router;