const express = require('express');
const router = express.Router();

const UserHandler = require('./handler/users');

router.post('/register', UserHandler.register);
router.post('/login', UserHandler.login);
router.put('/:id', UserHandler.update);
router.get('/:id', UserHandler.getUser);
router.get('/', UserHandler.getUsers);

module.exports = router;
