const router = require('express').Router();
const { createUser } = require('../controller/users.controller');

// router.get('/', getNotes);

router.post('/signup', createUser);

// router.put('/', editNote);

// router.delete('/', deleteNote);

module.exports = router;
