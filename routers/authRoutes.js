const express = require('express');
const { Register, Login } = require('../controllers/authCtl');
const router = express.Router();

// Register New User
router.post('/register', Register);

// Login
router.post('/login', Login);

module.exports = router;