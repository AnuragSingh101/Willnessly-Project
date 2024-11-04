// models/symptom.js

const mongoose = require('mongoose');

// Define the schema for storing symptoms
const symptomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Remove whitespace from the beginning and end
    },
    description: {
        type: String,
        trim: true,
    },
    dateEntered: {
        type: Date,
        default: Date.now, // Automatically set the date when the document is created
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to a User model, if you want to associate symptoms with a specific user
    },
});

// Create the model
const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;
