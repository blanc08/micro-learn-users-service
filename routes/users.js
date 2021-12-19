const express = require('express');
const router = express.Router();

const UserHandler = require('./handler/users');

router.post('/register', UserHandler.register);

module.exports = router;
