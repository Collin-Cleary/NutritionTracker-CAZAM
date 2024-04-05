const Water = require('../models/waterModel');
const Calorie = require('../models/calorieModel');
const Weight = require('../models/weightModel');

const dataController = {};

// Water controller methods
dataController.getWaterData = async (req, res) => {
  try {
    const data = await Water.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

dataController.getWaterDataByUser = async (req, res) => {
  const name = req.params.user
  try {
    const data = await Water.find({userId: name}).sort({date: 1})
    res.json(data)
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

dataController.createWaterData = async (req, res) => {
  const water = new Water({
    date: req.body.date,
    userId: req.body.userId,
    amount: req.body.amount,
  });

  try {
    const newWater = await water.save();
    res.status(201).json(newWater);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteWaterData = async (req, res) => {
  try {
    await Water.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Water data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Calorie controller methods
dataController.getCalorieData = async (req, res) => {
  try {
    const data = await Calorie.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

dataController.getCalorieDataByUser = async (req, res) => {
  const name = req.params.user
  try {
    const data = await Calorie.find({userId: name}).sort({date: 1})
    res.json(data)
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

dataController.createCalorieData = async (req, res) => {
  const calorie = new Calorie({
    date: req.body.date,
    userId: req.body.userId,
    intake: req.body.intake,
  });

  try {
    const newCalorie = await calorie.save();
    res.status(201).json(newCalorie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteCalorieData = async (req, res) => {
  try {
    await Calorie.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Calorie data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Weight controller methods
dataController.getWeightData = async (req, res) => {
  try {
    const data = await Weight.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

dataController.getWeightDataByUser = async (req, res) => {
  const name = req.params.user
  try {
    const data = await Weight.find({userId: name}).sort({date: 1})
    res.json(data)
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

dataController.createWeightData = async (req, res) => {
  const weight = new Weight({
    date: req.body.date,
    userId: req.body.userId,
    value: req.body.value,
  });

  try {
    const newWeight = await weight.save();
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

dataController.deleteWeightData = async (req, res) => {
  try {
    await Weight.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Weight data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = dataController;
