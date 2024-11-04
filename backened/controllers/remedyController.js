const Remedy = require('../models/Remedy'); // Make sure to import your Remedy model

// Function to get remedies by symptom
const remedy = async (req, res) => {
    try {
        const symptomName = req.query.symptom; // Get the symptom from query parameter

        // Check if the symptom parameter is provided
        if (!symptomName) {
            return res.status(400).json({ message: 'Symptom name is required.' });
        }

        // Query to find remedies with the matching symptom
        const remedies = await Remedy.find({
            symptoms: { $elemMatch: { name: symptomName } } // Check for the symptom name in the symptoms array
        });

        // If no remedies found, return a message
        if (remedies.length === 0) {
            return res.status(404).json({ message: 'No remedies found for the provided symptom.' });
        }

        // Send remedies as JSON response
        res.json(remedies);
    } catch (error) {
        console.error("Error retrieving remedies:", error); // Log the error
        res.status(500).json({ message: 'Error retrieving remedies', error: error.message });
    }
};

// Function to add remedies
const addRemedies = async (req, res) => {
    try {
        const { name, ingredients, instructions, contraindications, source_reference, symptoms } = req.body;

        // Check that required fields are provided
        if (!name || !ingredients || !instructions || !symptoms) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Create a new remedy instance
        const remedy = new Remedy({
            name,
            ingredients,
            instructions,
            contraindications,
            source_reference,
            symptoms // This should be an array of objects with a name property
        });

        // Save the remedy to the database
        await remedy.save();

        // Respond with the created remedy
        res.status(201).json(remedy);
    } catch (error) {
        console.error("Error creating remedy:", error); // Log the error
        res.status(400).json({ message: 'Error creating remedy', error: error.message });
    }
};

module.exports = { remedy, addRemedies };
