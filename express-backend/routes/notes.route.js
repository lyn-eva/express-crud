const router = require('express').Router();
const { getNotes, createNote, editNote, deleteNote } = require('../controller/notes.controller');

router.get('/', getNotes);

router.post('/', createNote);

router.put('/', editNote);

router.delete('/', deleteNote);

module.exports = router;
