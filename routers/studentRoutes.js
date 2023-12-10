const express = require("express");
const router = express.Router();
const { CreateStudent, GetAllStudents, GetStudentById, DeleteStudent, UpdateStudent, AddStudentToClass, RemoveStudentFromClass } = require('../controllers/studentCtl');

// Create Student 
router.post('/', CreateStudent);

// Get All Students 
router.get('/', GetAllStudents);

// Get Student By Id 
router.get('/:id', GetStudentById);

// Update Student
router.put('/:id', UpdateStudent);

// Delete Student
router.delete('/:id', DeleteStudent);

// Add Student To A Class
router.post('/:studentId/:classId', AddStudentToClass);

// Remove Student From Class
router.delete('/:studentId/:classId', RemoveStudentFromClass);

module.exports = router;