const calorieModule = require("../models/calorieModel")

const calorieController = {};

calorieController.getCalorieItemData = async (req, res) => {
  result = await calorieModule.getCalorieItems(req.query)
  res.status(result.status).json(result.json)
};

calorieController.createCalorieItemData = async (req, res) => {
  result = await calorieModule.createCalorieItem(req.body.date, req.body.userId, req.body.intake)
  res.status(result.status).json(result.json)
};

calorieController.deleteCalorieItemData = async (req, res) => {
  result = await calorieModule.deleteCalorieItem(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = calorieController