// routes/auth.js
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();
const { register, login, editProfile, getProfile} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', auth, editProfile);
router.post('/profile',auth, getProfile);


module.exports = router;
