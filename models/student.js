const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    studentBirthday: {
        type: String,
    },
    studentPhone: {
        type: Number,
        minLenght: 8,
        maxLength: 8
    }
}, {
    timestamps: true,
});

// Create Student Model
const Student = mongoose.model('Student', studentSchema);

module.exports = {
    Student
}