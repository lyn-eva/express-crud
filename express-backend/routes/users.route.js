const router = require('express').Router();
const { createUser, loginUser, logoutUser, getUserInfo } = require('../controller/users.controller');

// router.get('/', getNotes);

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/', getUserInfo);

// router.put('/', editNote);

// router.delete('/', deleteNote);

module.exports = router;
