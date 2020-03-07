const express = require('express');
let sesh = require('./session');
router = express.Router();

router.get('/', (req, res) => {
    sesh = req.session;
    if (sesh.userId) {
        return res.redirect('/notes');
    }
    res.render('pages/index.ejs', {
        page: "login",
        title: "Cocktail Notes Login",
        loggedIn: false,
        fields: [
            {
                label: "Email",
                name: "email",
                type: "text"
            },{
                label: "Password",
                name: "password",
                type: "password"
            }
        ]
    });
});


router.get('/register', (req, res) => {
    sesh = req.session;
    if (sesh.userId) {
        return res.redirect('/notes');
    }
    res.render('pages/index.ejs', {
        page: "register",
        title: "Cocktail Notes Create Account",
        loggedIn: false,
        fields: [
            {
                label: "Email",
                name: "email",
                type: "text"
            },{
                label: "Username",
                name: "username",
                type: "text"
            },{
                label: "Password",
                name: "password",
                type: "password"
            },
        ]
    });
});

router.get('/about', (req, res) => {
    sesh = req.session;
    let loggedIn = false;
    if (sesh.userId) {
        loggedIn = true;
    }
    res.render('pages/info.ejs', {
        page: "about",
        title: "About Cocktail Notes",
        loggedIn: loggedIn,
        img: 'cocktail-notes-logo.png',
        alt: 'Cocktail Notes Logo',
        text: `Cocktail Notes is a web application that helps you find the drinks you love. Search thousands of recipes 
            by name or by an ingredient to find what you want to make. Then, once you've made your cocktail, you can 
            create tasting notes about what you liked and what you didn't. Cocktail Notes will keep your notes stored for 
            later so even if your memory gets a bit hazy, you'll be able to mix it just how you like it the next time.
            The drink data comes courtesy of TheCocktailDB.com API.`,
    });
});

router.get('/team', (req, res) => {
    sesh = req.session;
    let loggedIn = false;
    if (sesh.userId) {
        loggedIn = true;
    }
    res.render('pages/info.ejs', {
        page: "team",
        title: "Meet the Team",
        loggedIn: loggedIn,
        img: 'circle-crop-joel.png',
        alt: 'Joel Watson',
        text: `Joel is a junior software developer in the Seattle area. After graduating with his bachelors from
            Green River College, he took a job at a small development company working in PHP and JavaScript. Today,
            his sites are on CodeFellows where he plans to sharpen his skills and launch his career.`
    });
});

router.get('/search', (req, res) => {
    sesh = req.session;
    if (!sesh.userId) {
        return res.redirect('/');
    }
    res.render('pages/search.ejs', {
        page: "search",
        title: "Find Recipe",
        loggedIn: true

    });
});

router.get('*', (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = router;