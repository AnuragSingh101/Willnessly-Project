// models/User.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that email is unique
        lowercase: true, // Convert email to lowercase
        trim: true, // Remove extra whitespace
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
