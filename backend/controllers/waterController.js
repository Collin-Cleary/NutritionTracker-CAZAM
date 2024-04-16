const waterModule = require("../models/waterModel")

const waterController = {};

waterController.getWaterItemData = async (req, res) => {
  const result = await waterModule.getWaterItems(req.query)
  res.status(result.status).json(result.json)
};

waterController.createWaterItemData = async (req, res) => {
  const result = await waterModule.createWaterItem(req.body.date, req.body.userId, req.body.amount)
  res.status(result.status).json(result.json)
};

waterController.deleteWaterItemData = async (req, res) => {
  const result = await waterModule.deleteWaterItem(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = waterController