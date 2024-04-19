const express = require('express');
const router = express.Router();
const gptController = require('../controllers/gptController');

//Create-diet
router.post('/generateDiet', gptController.generateDiet);

module.exports = router;