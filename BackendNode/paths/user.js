const express = require('express');
const router = express.Router();
const { security } = require('../middleware/security');

const {getUser, login, userRegister} = require('../controllers/user');

router.get('/', security, getUser);

router.post('/register', userRegister);

router.post('/login', login);

module.exports = router;