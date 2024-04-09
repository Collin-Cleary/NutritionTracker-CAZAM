// models/foodEntryModel.js
const mongoose = require('mongoose');

const foodEntrySchema = new mongoose.Schema({
  name : { type: String, required: true },
  date: { type: Date, required: true },
  parts : [{type : mongoose.Schema.Types.ObjectId, ref : "FoodItem"}],
  userId: { type: String, required: true }
});

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);


async function deleteFoodEntry(id) {
  try{
    await FoodEntry.findByIdAndDelete(id)
    return {status : 204, json : {message : "Food Entry Data Deleted Succesfully"}}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}

async function createFoodEntry(date, name, parts, userId) {
  const fe = new FoodEntry({
    date : date,
    name : name,
    parts : parts,
    userId, userId
  })

  try {
    let nfe = await fe.save();
    return {status : 201, json: nfe}
  } catch (err) {
    return {status : 400, json: {message : err.message}}
  }
}

async function getFoodEntry(query) {
  try {
    let data = await FoodEntry.find(query).populate('parts')
    return {status : 200, json : data}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}


module.exports = {FoodEntry, deleteFoodEntry, createFoodEntry, getFoodEntry};