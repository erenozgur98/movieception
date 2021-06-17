const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = requite('bcrypt');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;