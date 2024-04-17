// models/calorieModel.js
const mongoose = require('mongoose');

const calorieSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  userId: { type: String, required: true },
  intake: { type: Number, required: true },
});

const Calorie = mongoose.model('Calorie', calorieSchema);


async function deleteCalorieItem(id) {
  try{
    await Calorie.findByIdAndDelete(id)
    return {status : 204, json : {message : "Calorie Item Data Deleted Succesfully"}}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}

async function createCalorieItem(date, userId, intake) {
  const ci = new Calorie({
    date : date,
    intake : intake,
    userId, userId
  })

  try {
    let nci = await ci.save();
    return {status : 201, json: nci}
  } catch (err) {
    return {status : 400, json: {message : err.message}}
  }
}

async function getCalorieItems(query) {
  Object.entries(query).map(([key, value]) => [key, String(value)])
  try {
    const data = await Calorie.find(query)
    return {status : 200, json : data}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}


module.exports = {Calorie, deleteCalorieItem, createCalorieItem, getCalorieItems};
