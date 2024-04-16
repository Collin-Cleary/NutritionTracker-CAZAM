const foodEntryModule = require("../models/foodEntryModel")

const foodEntryController = {};

foodEntryController.getFoodEntryData = async (req, res) => {
  const result = await foodEntryModule.getFoodEntry(req.query)
  res.status(result.status).json(result.json)
};

foodEntryController.createFoodEntryData = async (req, res) => {
  const result = await foodEntryModule.createFoodEntry(req.body.date, req.body.name, req.body.parts, req.body.userId)
  res.status(result.status).json(result.json)
};

foodEntryController.deleteFoodEntryData = async (req, res) => {
  const result = await foodEntryModule.deleteFoodEntry(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = foodEntryController