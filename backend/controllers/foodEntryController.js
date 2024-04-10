const {deleteFoodEntry, createFoodEntry, getFoodEntry} = require("../models/foodEntryModel")

const foodEntryController = {};

foodEntryController.getFoodEntryData = async (req, res) => {
  result = await getFoodEntry(req.query)
  res.status(result.status).json(result.json)
};

foodEntryController.createFoodEntryData = async (req, res) => {
  result = await createFoodEntry(req.body.date, req.body.name, req.body.parts, req.body.userId)
  res.status(result.status).json(result.json)
};

foodEntryController.deleteFoodEntryData = async (req, res) => {
  result = await deleteFoodEntry(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = foodEntryController