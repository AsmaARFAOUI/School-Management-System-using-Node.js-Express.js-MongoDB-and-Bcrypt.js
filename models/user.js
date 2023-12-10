const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        minLength: 2
    },
    userEmail: {
       type: String,
       minLength: 5,
       required: true,
       trim: true,
    },
    userPassword: {
        type: String,
        trim: true,
        minLength: 6,
        required: true
    }
}, {
    timestamps: true
});

// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
