
const express = require('express');
const router = express.Router();

const waterController = require('../controllers/waterController');
const weightController = require('../controllers/weightController');
const calorieController = require('../controllers/calorieController');
const foodItemController = require('../controllers/foodItemController');
const foodEntryController = require('../controllers/foodEntryController');

// Water routes
router.get('/water', waterController.getWaterItemData);
router.post('/water', waterController.createWaterItemData);
router.delete('/water/:id', waterController.deleteWaterItemData);

// Calorie routes
router.get('/calorie', calorieController.getCalorieItemData);
router.post('/calorie', calorieController.createCalorieItemData);
router.delete('/calorie/:id', calorieController.deleteCalorieItemData);

// Weight routes
router.get('/weight', weightController.getWeightItemData);
router.post('/weight', weightController.createWeightItemData);
router.delete('/weight/:id', weightController.deleteWeightItemData);

// Food Item Routes
router.get('/fooditem', foodItemController.getFoodItemData);
router.post('/fooditem', foodItemController.createFoodItemData);
router.delete('/fooditem/:id', foodItemController.deleteFoodItemData);

router.get('/foodentry', foodEntryController.getFoodEntryData);
router.post('/foodentry', foodEntryController.createFoodEntryData);
router.delete('/foodentry/:id', foodEntryController.deleteFoodEntryData);

module.exports = router;
