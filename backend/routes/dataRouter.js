
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
router.get('/water/:userId/:date', waterController.getWaterRecord);
router.put('/water/:userId/:date', waterController.updateWaterRecord);

// Calorie routes
router.get('/calorie', calorieController.getCalorieItemData);
router.get('/calorie/:id/:date', calorieController.getCalorieItemDataByIdAndDate);
router.get('/highestcalorie', calorieController.getHighestCalorieItemData);
router.post('/calorie', calorieController.createCalorieItemData);
router.put('/calorie/:id/:date', calorieController.updateCalorieItemData);
router.delete('/calorie/:id', calorieController.deleteCalorieItemData);

// Weight routes
router.get('/weight', weightController.getWeightItemData);
router.post('/weight', weightController.createWeightItemData);
router.delete('/weight/:id', weightController.deleteWeightItemData);
router.get('/weight/:userId/:date', weightController.getWeightRecord);
router.put('/weight/:userId/:date', weightController.updateWeightRecord);

// Food Item Routes
router.get('/fooditem', foodItemController.getFoodItemData);
router.post('/fooditem', foodItemController.createFoodItemData);
router.delete('/fooditem/:id', foodItemController.deleteFoodItemData);

// Food Entry routes
router.get('/foodentry', foodEntryController.getFoodEntryData);
router.post('/foodentry', foodEntryController.createFoodEntryData);
router.delete('/foodentry/:id', foodEntryController.deleteFoodEntryData);

// Food Entry routes
// router.get('/foodentry', dataController.getFoodEntryData);
// router.post('/foodentry', dataController.createFoodEntryData);
// router.delete('/foodentry/:id', dataController.deleteFoodEntryData);

// Food Item routes
// router.get('/fooditem', dataController.getFoodItemData);
// router.post('/fooditem', dataController.createFoodItemData);
// router.delete('/fooditem/:id', dataController.deleteFoodItemData);


module.exports = router;
