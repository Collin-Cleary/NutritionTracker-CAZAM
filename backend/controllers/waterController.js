const {deleteWaterItem, createWaterItem, getWaterItems} = require("../models/waterModel")

const waterController = {};

waterController.getWaterItemData = async (req, res) => {
  result = await getWaterItems(req.query)
  res.status(result.status).json(result.json)
};

waterController.createWaterItemData = async (req, res) => {
  result = await createWaterItem(req.body.date, req.body.userId, req.body.amount)
  res.status(result.status).json(result.json)
};

waterController.deleteWaterItemData = async (req, res) => {
  result = await deleteWaterItem(req.params.id)
  res.status(result.status).json(result.json)
}; 

module.exports = waterController