// routes/symptom.js
const express = require('express');
const router = express.Router();
const { createSymptom, deleteSymptom, getAllSymptoms } = require('../controllers/symptomController'); // Import the controllers

// POST endpoint to add a new symptom
router.post('/symptoms', createSymptom);

router.get('/symptoms', getAllSymptoms);


// DELETE endpoint to remove a symptom by ID
router.delete('/symptoms/:id', deleteSymptom);




module.exports = router;
