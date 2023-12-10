const express = require('express');
const { CreateUser, GetAllUsers, GetUserById, DeleteUser, UpdateUser } = require('../controllers/userCtl');
const router = express.Router();

// Create user
router.post('/', CreateUser);

// Get all users
router.get('/', GetAllUsers);

// Get user by id
router.get('/:id', GetUserById);

// Update User
router.put('/:id', UpdateUser);

// Delete User
router.delete('/:id', DeleteUser);

module.exports = router;
