const Water = require('../models/waterModel');
const Calorie = require('../models/calorieModel');
const Weight = require('../models/weightModel');
const {FoodItem, deleteFoodItem, createFoodItem, getFoodItem} = require('../models/foodItemModel');
const {FoodEntry, deleteFoodEntry, createFoodEntryData, getFoodEntryData} = require('../models/foodEntryModel')
const dataController = {};

// Water controller methods
dataController.getWaterData = async (req, res) => {
  try {
    const data = await Water.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

dataController.createWaterData = async (req, res) => {
  const water = new Water({
    date: req.body.date,
    userId: req.body.userId,
    amount: req.body.amount,
  });

  try {
    const newWater = await water.save();
    res.status(201).json(newWater);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteWaterData = async (req, res) => {
  try {
    await Water.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Water data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Calorie controller methods
dataController.getCalorieData = async (req, res) => {
  try {
    const data = await Calorie.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

dataController.createCalorieData = async (req, res) => {
  const calorie = new Calorie({
    date: req.body.date,
    userId: req.body.userId,
    intake: req.body.intake,
  });

  try {
    const newCalorie = await calorie.save();
    res.status(201).json(newCalorie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteCalorieData = async (req, res) => {
  try {
    await Calorie.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Calorie data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Weight controller methods
dataController.getWeightData = async (req, res) => {
  try {
    const data = await Weight.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

dataController.createWeightData = async (req, res) => {
  const weight = new Weight({
    date: req.body.date,
    userId: req.body.userId,
    value: req.body.value,
  });

  try {
    const newWeight = await weight.save();
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteWeightData = async (req, res) => {
  try {
    await Weight.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Weight data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Food Entry controller methods
dataController.getFoodEntryData = async (req, res) => {
  result = await getFoodEntryData(req.query)
  res.status(result.status).json(result.json)
};

dataController.createFoodEntryData = async (req, res) => {
  const foodEntry = new FoodEntry({
    date: req.body.date,
    name: req.body.name,
    parts: req.body.parts,
    userID : req.body.userId
  });

  try {
    const newFoodEntry = await foodEntry.save();
    res.status(201).json(newFoodEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteFoodEntryData = async (req, res) => {
  try {
    await FoodEntry.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Food Entry data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Food Item controller methods
dataController.getFoodItemData = async (req, res) => {
  result = await getFoodItem(req.query)
  res.status(result.status).json(result.json)
};

dataController.createFoodItemData = async (req, res) => {
  result = await createFoodItem(req.body.nutrition, req.body.name, req.body.ingredients, req.body.userId)
  res.status(result.status).json(result.json)
};

dataController.deleteFoodItemData = async (req, res) => {
  result = await deleteFoodItem(req.params.id)
  res.status(result.status).json(result.json)
};



module.exports = dataController;
