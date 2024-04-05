

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Water = require('../models/waterModel');
const Calorie = require('../models/calorieModel');
const Weight = require('../models/weightModel');
const jwt = require('jsonwebtoken');
const users = require('../data/user.json');
const secretKey = '3d6818d12074be9c939de6c49c62f0bc';

// Test server port
const testPort = 3006;

describe('API Tests', () => {
  // Before each test, connect to the database, add dummy data, and start the test server
  before(async () => {
    // Connect to MongoDB database, assuming the connection logic is implemented in server.js
    await mongoose.connect('mongodb://localhost:27017/cazam', { useNewUrlParser: true, useUnifiedTopology: true });

    // Read JSON files and insert data into the database
    const waterDataPath = path.join(__dirname, '../data/water.json');
    const waterData = JSON.parse(fs.readFileSync(waterDataPath, 'utf8'));
    await Water.insertMany(waterData);

    const calorieDataPath = path.join(__dirname, '../data/calorie.json');
    const calorieData = JSON.parse(fs.readFileSync(calorieDataPath, 'utf8'));
    await Calorie.insertMany(calorieData);

    const weightDataPath = path.join(__dirname, '../data/weight.json');
    const weightData = JSON.parse(fs.readFileSync(weightDataPath, 'utf8'));
    await Weight.insertMany(weightData);

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

    // Test to add water data
    it('should add water data', async () => {
      const newData = { date: new Date(), userId: '123', amount: 500 };
      const response = await request(`http://localhost:${testPort}`)
        .post('/api/water')
        .send(newData);
      assert.equal(response.status, 201);
    });

  });

  // Calorie data test cases
  describe('Calorie API', () => {
    it('should get calorie data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/calorie');
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
    });

    // Test to add calorie data
    it('should add calorie data', async () => {
      const newData = { date: new Date(), userId: '1234', intake: 500 };
      const response = await request(`http://localhost:${testPort}`)
        .post('/api/calorie')
        .send(newData);
      assert.equal(response.status, 201);
    });

  });

  // Weight data test cases
  describe('Weight API', () => {
    it('should get weight data', async () => {
      const response = await request(`http://localhost:${testPort}`).get('/api/weight');
      assert.equal(response.status, 200);
      assert(Array.isArray(response.body), 'Response is not an array');
    });

    // Test to add weight data
    it('should add weight data', async () => {
      const newData = { date: new Date(), userId: '1234', value: 70 };
      const response = await request(`http://localhost:${testPort}`)
        .post('/api/weight')
        .send(newData);
      assert.equal(response.status, 201);
    });

   // Login API test cases
    describe('Login API', () => {
    it('should login with correct credentials and return JWT token', async () => {
  
    const validCredentials = { userName: 'john_doe', password: 'password123' };

    const response = await request(`http://localhost:${testPort}`)
      .post('/auth/login')
      .send(validCredentials);

    assert.equal(response.status, 200);
    assert(response.body.token);

    const decodedToken = jwt.verify(response.body.token, secretKey);  // Verify JWT token
    assert.equal(decodedToken.userName, validCredentials.userName);
  });

  it('should return 401 for invalid credentials', async () => {
  
    const invalidCredentials = { userName: 'invalid_user', password: 'invalid_password' };

    const response = await request(`http://localhost:${testPort}`)
      .post('/auth/login')
      .send(invalidCredentials);

    assert.equal(response.status, 401);
    assert.equal(response.body.message, 'Invalid username or password');
    });
   });

    // Logout API test case
    describe('Logout API', () => {
     it('should return success message for logout', async () => {
    const response = await request(`http://localhost:${testPort}`).post('/auth/logout');

    assert.equal(response.status, 200);
    assert.equal(response.body.message, 'Logout successful');
    });
   });
   

  // Create profile API test case
   describe('Profile Creation API', () => {
    it('should create a new profile successfully', async () => {
      const newProfileData = {
          userName: 'john_doe',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          height: 180,
          weight: 75
      };

      const response = await request(`http://localhost:3000`).post('/auth/create-profile')
          .send(newProfileData);

      assert.equal(response.status, 201);
      assert.equal(response.body.message, 'Profile created successfully');
    })

    it('should return 400 if passwords do not match', async () => {
      const invalidProfileData = {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password456', // Different password
          height: 180,
          weight: 75
      };

      const response = await request(`http://localhost:${testPort}`)
          .post('/auth/create-profile')
          .send(invalidProfileData);

      assert.equal(response.status, 400);
      assert.equal(response.body.message, 'Passwords do not match');
    });

    it('should return 400 if user already exists with the provided email', async () => {
      // Assuming you have an existing user with the same email in the database
      const existingProfileData = {
          userName: 'existing_user', // Add userName field
          name: 'Existing User',
          email: 'test@example.com', // Same email as existing user
          password: 'password123',
          confirmPassword: 'password123',
          height: 170,
          weight: 70
      };

      const response = await request(`http://localhost:${testPort}`)
          .post('/auth/create-profile')
          .send(existingProfileData);

      assert.equal(response.status, 400); // Change the expected status code to 400
      assert.equal(response.body.message, 'User already exists with this email');
    });
  });
   // add more test cases
  });
});
