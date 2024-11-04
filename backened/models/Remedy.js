const mongoose = require('mongoose');

// Define the Symptoms subdocument schema
const SymptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true // Indexing for faster symptom lookup
  }
});

// Define the Remedies schema with embedded Symptoms
const RemedySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String], // Array of ingredients for the remedy
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  contraindications: {
    type: String
  },
  source_reference: {
    type: String
  },
  symptoms: {
    type: [SymptomSchema], // Embedding SymptomSchema as an array
    required: true
  }
});

// Create the Remedy model
const Remedy = mongoose.model('Remedy', RemedySchema);

// Export the Remedy model
module.exports = Remedy;
