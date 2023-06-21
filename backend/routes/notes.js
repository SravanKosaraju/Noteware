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

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    let note = await Notes.findById(req.params.id)
    if (!note) {
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    } try {
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("External Server Error")
    }
})

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    let note = await Notes.findById(req.params.id)
    if (!note) {
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    } try {
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success":"Note Deleted Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("External Server Error")
    }

})



module.exports = router  