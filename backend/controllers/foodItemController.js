const {deleteFoodItem, createFoodItem, getFoodItem} = require("../models/foodItemModel")

const foodItemController = {};

foodItemController.getFoodItemData = async (req, res) => {
  result = await getFoodItem(req.query)
  res.status(result.status).json(result.json)
};

foodItemController.createFoodItemData = async (req, res) => {
  result = await createFoodItem(req.body.nutrition, req.body.name, req.body.ingredients, req.body.userId)
  res.status(result.status).json(result.json)
};

foodItemController.deleteFoodItemData = async (req, res) => {
  result = await deleteFoodItem(req.params.id)
  res.status(result.status).json(result.json)
}; 