// controllers/symptomController.js

const Symptom = require('../models/symptom'); // Import the Symptom model

// POST controller to add a new symptom
const createSymptom = async (req, res) => {
    const { name, description, userId } = req.body;

    const newSymptom = new Symptom({
        name,
        description,
        userId, // Optional if you want to associate the symptom with a user
    });

    try {
        const savedSymptom = await newSymptom.save();
        res.status(201).json(savedSymptom); // Return the saved symptom
    } catch (error) {
        res.status(400).json({ error: 'Error saving symptom: ' + error.message });
    }
};

// DELETE controller to remove a symptom by ID
const deleteSymptom = async (req, res) => {
    const { id } = req.params; // Extract ID from the request parameters

    try {
        const deletedSymptom = await Symptom.findByIdAndDelete(id);

        if (!deletedSymptom) {
            return res.status(404).json({ message: 'Symptom not found.' });
        }

        res.status(200).json({ message: 'Symptom deleted successfully.' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting symptom: ' + error.message });
    }
};

const getAllSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptom.find(); // Retrieve all symptoms from the database
        res.status(200).json(symptoms); // Return the list of symptoms
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving symptoms: ' + error.message });
    }
};

module.exports = {
    createSymptom,
    deleteSymptom,
    getAllSymptoms,
};
