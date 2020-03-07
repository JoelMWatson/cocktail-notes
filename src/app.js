const express = require('express');
const session = require('express-session');
const path = require('path');

const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');
const viewRouter = require('./routes/viewRouter');

// Start app
const app = express();

// Set views and EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.json());

// TODO Need to update to use store but heroku will destroy session file each time so for now this works
// Using global session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// use public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routers
app.use(userRouter);
app.use(apiRouter);
app.use(viewRouter);

module.exports = app;