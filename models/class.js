const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
   nameOfClass: {
    type: String,
    required: true,
    unique: true,
    trim: true
   },
   students: {
    type: Array,
   }
}, {
    timestamps: true
})

// Create Class Model
const Class = mongoose.model('Class', classSchema);

module.exports = {
    Class
}