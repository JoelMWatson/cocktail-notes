const express = require('express');
const models = require('../models/index');
let sesh = require('./session');

router = express.Router();

// get all notes for dashboard
router.get('/notes', async (req, res) => {
    sesh = req.session;
    if (!sesh.userId) {
        return res.redirect('/');
    }
    const notes = await models.Note.findAll( { where: { userid: sesh.userId }});
    if (!notes) {
        return res.send({error: "No notes found"})
    }
    res.render('pages/notes.ejs', {
        page: "notes",
        title: "Your Notes",
        loggedIn: true,
        notes: notes,
        fields: [
            {
                label: "Name",
                name: "name",
                type: "text"
            }
        ]
    })
});

// create
router.post('/note', async (req, res) => {
    sesh = req.session;
    if (!sesh.userId) {
        return res.redirect('/');
    };
    try {
        const note = await models.Note.create({
            userid: sesh.userId,
            name: req.body.name,
            rating: req.body.rating,
            description: req.body.description
        });
        if (!note) {
            return res.status(400).send();
        }
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }

});

module.exports = router;


