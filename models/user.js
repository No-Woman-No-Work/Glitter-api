const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        validate: [ validator.isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true
    },
    recoverPasswordToken: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);