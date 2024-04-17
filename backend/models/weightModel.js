// models/weightModel.js
const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  userId: { type: String, required: true },
  value: { type: Number, required: true },
});

const Weight = mongoose.model('Weight', weightSchema);


async function deleteWeightItem(id) {
  try{
    await Weight.findByIdAndDelete(id)
    return {status : 204, json : {message : "Weight Item Data Deleted Succesfully"}}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}

async function createWeightItem(date, userId, value) {
  const wi = new Weight({
    date : date,
    value : value,
    userId, userId
  })

  try {
    let nwi = await wi.save();
    return {status : 201, json: nwi}
  } catch (err) {
    return {status : 400, json: {message : err.message}}
  }
}

async function getWeightItems(query) {
  Object.entries(query).map(([key, value]) => [key, String(value)])
  try {
    const data = await Weight.find(query)
    return {status : 200, json : data}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}


module.exports = {Weight, getWeightItems, createWeightItem, deleteWeightItem};
