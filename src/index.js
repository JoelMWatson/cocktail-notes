const express = require('express');
const path = require('path');

const userRouter = require('./routes/userRouter');
const viewRouter = require('./routes/viewRouter');

// Start app
const app = express();
app.use(express.json());

// Set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// use public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routers
app.use(userRouter);
app.use(viewRouter);

const port =  process.env.PORT;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});