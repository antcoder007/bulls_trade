const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 125
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

// export user model
module.exports = mongoose.model("user", userSchema);