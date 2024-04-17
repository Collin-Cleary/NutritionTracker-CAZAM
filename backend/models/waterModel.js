// models/waterModel.js
const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Water = mongoose.model('Water', waterSchema);


async function deleteWaterItem(id) {
  try{
    await Water.findByIdAndDelete(id)
    return {status : 204, json : {message : "Water Item Data Deleted Succesfully"}}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}

async function createWaterItem(date, userId, amount) {
  const wi = new Water({
    date : date,
    amount : amount,
    userId, userId
  })

  try {
    let nwi = await wi.save();
    return {status : 201, json: nwi}
  } catch (err) {
    return {status : 400, json: {message : err.message}}
  }
}

async function getWaterItems(query) {
  Object.entries(query).map(([key, value]) => [key, String(value)])
  try {
    const data = await Water.find(query)
    return {status : 200, json : data}
  } catch (err) {
    return {status : 500, json : {message : err.message}}
  }
}



module.exports = {Water, getWaterItems, createWaterItem, deleteWaterItem};
