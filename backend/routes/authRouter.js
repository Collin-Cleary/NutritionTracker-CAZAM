const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


//Create-profile route
router.post('/create-profile', authController.createProfile);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;
