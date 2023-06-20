const express = require('express')
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const router = express.Router();

router.get('/fetchnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

router.post('/addnotes', fetchuser, [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("External Server Error")
    }
})

module.exports = router  