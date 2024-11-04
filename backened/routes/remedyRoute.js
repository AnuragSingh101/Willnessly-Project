const express = require('express');
const router = express.Router();
const {remedy, addRemedies} = require('../controllers/remedyController')

router.get('/remedies', remedy) 

router.post('/add', addRemedies) 


module.exports = router;