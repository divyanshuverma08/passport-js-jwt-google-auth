const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : String,
    password: String,
    google:{
        id: String,
        name: String,
        email: String
    }
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;