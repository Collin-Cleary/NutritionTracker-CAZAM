

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Water = require('../models/waterModel');
const Calorie = require('../models/calorieModel');
const Weight = require('../models/weightModel');
const {FoodItem} = require('../models/foodItemModel');
const { FoodEntry } = require('../models/foodEntryModel');

// Test server port
const testPort = 3006;

describe('API Tests', () => {
  // Before each test, connect to the database, add dummy data, and start the test server
  before(async () => {
    // Connect to MongoDB database, assuming the connection logic is implemented in server.js
    await mongoose.connect('mongodb://0.0.0.0:27017/cazam');

    // Read JSON files and insert data into the database
    const waterDataPath = path.join(__dirname, '../data/water.json');
    const waterData = JSON.parse(fs.readFileSync(waterDataPath, 'utf8'));
    await Water.insertMany(waterData).then(() => {console.log("read in water")});

    const calorieDataPath = path.join(__dirname, '../data/calorie.json');
    const calorieData = JSON.parse(fs.readFileSync(calorieDataPath, 'utf8'));
    await Calorie.insertMany(calorieData);

    const weightDataPath = path.join(__dirname, '../data/weight.json');
    const weightData = JSON.parse(fs.readFileSync(weightDataPath, 'utf8'));
    await Weight.insertMany(weightData);

    const foodItemDataPath = path.join(__dirname, '../data/foodItem.json');
    const foodItemData = JSON.parse(fs.readFileSync(foodItemDataPath, 'utf8'));
    await FoodItem.insertMany(foodItemData);

    const foodEntryDataPath = path.join(__dirname, '../data/foodEntry.json');
    const foodEntryData = JSON.parse(fs.readFileSync(foodEntryDataPath, 'utf8'));
    await FoodEntry.insertMany(foodEntryData);

    // Start the test server
    app.listen(testPort, () => {
      console.log(`Test server listening at http://localhost:${testPort}`);
    });
  });

  // After each test, disconnect from the database
  after(async () => {
    // Clean up inserted data
    await Water.deleteMany({});
    await Calorie.deleteMany({});
    await Weight.deleteMany({});
    await FoodItem.deleteMany({});
    await FoodEntry.deleteMany({})
    // Disconnect from MongoDB database
    await mongoose.disconnect();
  });

  // Water data test cases
  describe('Water API', () => {
    it('should get water data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/water');
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
    });

    it('should add water data', async () => {
      const newData = { date: new Date(), userId: '123', amount: 500 };
      const response = await request(`http://localhost:${testPort}`)
        .post('/api/water')
        .send(newData);
      assert.equal(response.status, 201);
    });

    // Add more test cases...
  });

  // Calorie data test cases
  describe('Calorie API', () => {
    it('should get calorie data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/calorie');
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
    });

    it('should add calorie data', async () => {
      const newData = { date: new Date(), userId: '1234', intake: 500 };
      const response = await request(`http://localhost:${testPort}`)
        .post('/api/calorie')
        .send(newData);
      assert.equal(response.status, 201);
    });

    // Add more test cases...
  });

  // Weight data test cases
  describe('Weight API', () => {
    it('should get weight data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/weight');
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
    });

    it('should add weight data', async () => {
      const newData = { date: new Date(), userId: '1234', value: 70 };
      const response = await request(`http://localhost:${testPort}`)
        .post('/api/weight')
        .send(newData);
      assert.equal(response.status, 201);
    });

    // 添加更多的测试用例...
  });

  // Food Item test cases
  describe('Food Item API', () => {
    it('should get food Item data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/foodItem').query({"userId" : "user1"})
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
      assert(response.body.length == 2, "expecting 2 entries")
      response.body.map((item) =>{assert(item.userId == "user1", "can query")}) 
    }).timeout(5000);

    it('should add food item data', async () => {
      const newData = { "nutrition": {"vitamin C" : 20, "iron" : 2}, "name": "food", "ingredients": "stuff and things" ,"userId" : "testuser"};
      let response = await request(`http://localhost:${testPort}`)
        .post('/api/foodItem')
        .send(newData);
      assert.equal(response.status, 201);
      response = await request(`http://localhost:${testPort}`).get('/api/foodItem').query({"userId" : "testuser"});
      assert(response.body.length == 1, "expecting 1 entry")
    });

    it('should delete food item data', async () => {
      let response = await request(`http://localhost:${testPort}`).get('/api/foodItem').query({"userId" : "user1"})
      assert(response.body.length == 2, "expecting 2 entries")
      response = await request(`http://localhost:${testPort}`).delete(`/api/foodItem/${response.body[0]._id}`)
      response = await request(`http://localhost:${testPort}`).get('/api/foodItem').query({"userId" : "user1"})
      assert(response.body.length == 1, "expecting 1 entry")
    }).timeout(5000);
  });

  describe('Food Entry API', () => {
    it('should get food Item data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/foodEntry').query({"userId" : "abc"});
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
      assert(response.body.length == 1, "expecting 1 entry")
      expected = {"date" : "2020-12-31T05:00:00.000Z", "parts" : [{"_id" : "4edd40c86762e0fb12000003","nutrition" : {"vitamin" : 5}, "ingredients" : "stuff", "name" : "food test", "userId" : "abc"}], "name" : "food entry test", "userId" : "abc"}  
      //deleting fields we dont control
      delete response.body[0].__v
      delete response.body[0]._id
      delete response.body[0].parts[0].__v

      assert.deepEqual(response.body, [expected])
    });
  });

});
