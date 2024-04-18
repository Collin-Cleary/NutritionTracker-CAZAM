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

waterController.getWaterRecord = async (req, res) => {
  const result = await waterModule.getWaterRecord(req.params.userId, req.params.date)
  res.status(result.status).json(result.json)
};

waterController.updateWaterRecord = async (req, res) => {
  const result = await waterModule.updateWaterRecord(req.params.userId, req.params.date, req.body.amount)
  res.status(result.status).json(result.json)
};

module.exports = waterController