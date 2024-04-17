// models/foodItemModel.js
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  nutrition : {type : Map, of: Number, required: true},
  name : { type: String, required: true },
  ingredients : { type: String, required: true },
  userId: { type: String, required: true }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

async function deleteFoodItem(id) {
  try{
    await FoodItem.findByIdAndDelete(id)
    return {status : 204, json : {message : "Food Item Data Deleted Succesfully"}}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}

async function createFoodItem(nutrition, name, ingredients, userId) {
  const fi = new FoodItem({
    nutrition : nutrition,
    name : name,
    ingredients : ingredients,
    userId, userId
  })

  try {
    let nfi = await fi.save();
    return {status : 201, json: nfi}
  } catch (err) {
    return {status : 400, json: {message : err.message}}
  }
}

async function getFoodItem(query) {
  Object.entries(query).map(([key, value]) => [key, String(value)])
  try {
    const data = await FoodItem.find(query)
    return {status : 200, json : data}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}

module.exports = {FoodItem, deleteFoodItem, createFoodItem, getFoodItem};