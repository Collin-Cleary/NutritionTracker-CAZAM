const calorieModule = require("../models/calorieModel")

const calorieController = {};

calorieController.getCalorieItemData = async (req, res) => {
  const result = await calorieModule.getCalorieItems(req.query)
  res.status(result.status).json(result.json)
};

calorieController.getHighestCalorieItemData = async (req, res) => {
  const result = await calorieModule.getHighestCalorieItems(req.query)
  res.status(result.status).json(result.json)
};


calorieController.createCalorieItemData = async (req, res) => {
  const result = await calorieModule.createCalorieItem(req.body.date, req.body.userId, req.body.intake)
  res.status(result.status).json(result.json)
};

calorieController.deleteCalorieItemData = async (req, res) => {
  const result = await calorieModule.deleteCalorieItem(req.params.id)
  res.status(result.status).json(result.json)
}; 

calorieController.getCalorieItemDataByIdAndDate = async (req, res) => {
  const result = await calorieModule.getCalorieItems({userId: req.params.id, date: req.params.date})
  res.status(result.status).json(result.json)
};

calorieController.updateCalorieItemData = async (req, res) => {
  const result = await calorieModule.updateCalorieItemData(req.params.id, req.params.date, req.body.intake)
  res.status(result.status).json(result.json)
};

module.exports = calorieController