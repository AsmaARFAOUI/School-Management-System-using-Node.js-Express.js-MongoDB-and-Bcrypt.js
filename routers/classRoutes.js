const express = require('express');
const router = express.Router();
const { CreateClass, GetAllClasses, GetClassById, UpdateClass, deleteClass } = require('../controllers/classCtl');

// Create A Class 
router.post('/', CreateClass);

// Get All Classes
router.get('/', GetAllClasses);

// Get Class By Id
router.get('/:id', GetClassById);

// Update A Class
router.put('/:id', UpdateClass);

// Delete A Class
router.delete('/:id', deleteClass);

module.exports = router;