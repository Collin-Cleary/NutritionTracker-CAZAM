const {deleteWeightItem, createWeightItem, getWeightItems} = require("../models/weightModel")

const weightController = {};

weightController.getWeightItemData = async (req, res) => {
  result = await getWeightItems(req.query)
  res.status(result.status).json(result.json)
};

weightController.createWeightItemData = async (req, res) => {
  result = await createWeightItem(req.body.date, req.body.userId, req.body.value)
  res.status(result.status).json(result.json)
};

weightController.deleteWeightItemData = async (req, res) => {
  result = await deleteWeightItem(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = weightController