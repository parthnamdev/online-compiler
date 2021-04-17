const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    password: String,
    files: [{
        filename: String,
        code: String
    }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;