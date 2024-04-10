const {deleteCalorieItem, createCalorieItem, getCalorieItems} = require("../models/calorieModel")

const calorieController = {};

calorieController.getCalorieItemData = async (req, res) => {
  result = await getCalorieItems(req.query)
  res.status(result.status).json(result.json)
};

calorieController.createCalorieItemData = async (req, res) => {
  result = await createCalorieItem(req.body.date, req.body.userId, req.body.intake)
  res.status(result.status).json(result.json)
};

calorieController.deleteCalorieItemData = async (req, res) => {
  result = await deleteCalorieItem(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = calorieController