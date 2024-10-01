const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Ensure only 'user' or 'admin' is set
        default: 'user'  // Default role is 'user'
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
