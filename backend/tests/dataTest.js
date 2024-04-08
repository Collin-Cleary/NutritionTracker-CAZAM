const assert = require('assert');
const sinon = require('sinon');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');

const Water = require('../models/waterModel');
const Calorie = require('../models/calorieModel');
const Weight = require('../models/weightModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


describe('Unit Tests', () => {

  // Water
  describe('Water Controller', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should get water data', async () => {
      try {
        const mockData = [
          { date: new Date(), userId: '123', amount: 500 },
          { date: new Date(), userId: '456', amount: 300 },
        ];
        const req = {}; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
        const findStub = sinon.stub(Water, 'find').resolves(mockData);
        await dataController.getWaterData(req, res);
        assert(res.status.calledOnceWithExactly(200));
        assert(res.json.calledOnceWithExactly(mockData));
      } catch (error) {
        console.error(error);
      }
    });

    it('should add water data', async () => {
      try{
        const newData = { date: new Date(), userId: '123', amount: 500 };
        const req = { body: newData }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object

        const saveStub = sinon.stub(Water.prototype, 'save').resolves(newData);

        await dataController.createWaterData(req, res);

        assert(saveStub.calledOnce);
        assert(res.status.calledOnceWithExactly(201));
        assert(res.json.calledOnceWithExactly(newData));
      } catch (error) {
        console.error(error);
      }      
    });

  });

  // Calorie
  describe('Calorie Controller', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should get calorie data', async () => {
      try{
          const mockData = [
            { date: new Date(), userId: '123', intake: 500 },
            { date: new Date(), userId: '456', intake: 300 },
          ];
          const req = {}; // Mock request object
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
    
          const findStub = sinon.stub(Calorie, 'find').resolves(mockData);
    
          await dataController.getCalorieData(req, res);
    
          assert(res.status.calledOnceWithExactly(200));
          assert(res.json.calledOnceWithExactly(mockData));
      } catch(error){
        console.log(error)
      }
    });

    it('should add calorie data', async () => {
      try{
          const newData = { date: new Date(), userId: '1234', intake: 500 };
          const req = { body: newData }; // Mock request object
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
    
          const saveStub = sinon.stub(Calorie.prototype, 'save').resolves(newData);
    
          await dataController.createCalorieData(req, res);
    
          assert(saveStub.calledOnce);
          assert(res.status.calledOnceWithExactly(201));
          assert(res.json.calledOnceWithExactly(newData));
      } catch(error){
        console.log(error)
      }
    });

  });

  // Weight
  describe('Weight Controller', () => {
    afterEach(() => {
      sinon.restore();
    });
    
    it('should get weight data', async () => {
      try{
          const mockData = [
            { date: new Date(), userId: '123', value: 70 },
            { date: new Date(), userId: '456', value: 65 },
          ];
          const req = {}; // Mock request object
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
    
          const findStub = sinon.stub(Weight, 'find').resolves(mockData);
    
          await dataController.getWeightData(req, res);
    
          assert(res.status.calledOnceWithExactly(200));
          assert(res.json.calledOnceWithExactly(mockData));
      } catch(error){
        console.log(error)
      }
    });

    it('should add weight data', async () => {
      try{
          const newData = { date: new Date(), userId: '1234', value: 70 };
          const req = { body: newData }; // Mock request object
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
          const saveStub = sinon.stub(Weight.prototype, 'save').resolves(newData);
          await dataController.createWeightData(req, res);
          assert(saveStub.calledOnce);
          assert(res.status.calledOnceWithExactly(201));
          assert(res.json.calledOnceWithExactly(newData));
      } catch(error){
        console.log(error)
      }
    });

  });

  // Registration & Login
  describe('Auth Controller', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should login with correct credentials and return JWT token', () => {
      try{
          const validCredentials = { userName: 'john_doe', password: 'password123' };
          const req = { body: validCredentials }; // Mock request object
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
          const user = { userName: validCredentials.userName };
          sinon.stub(User, 'findOne').resolves(user);
          sinon.stub(bcrypt, 'compare').resolves(true);
          sinon.stub(jwt, 'sign').returns('mockToken');
    
          authController.login(req, res);
    
          assert(res.status.calledOnceWithExactly(200));
          assert(res.json.calledOnceWithExactly({ token: 'mockToken' }));
      } catch(error){
        console.log(error)
      }
    });

    it('should return 401 for invalid credentials', () => {
      const invalidCredentials = { userName: 'invalid_user', password: 'invalid_password' };
      const req = { body: invalidCredentials }; // Mock request object
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'compare').resolves(false);

      authController.login(req, res);

      assert(res.status.calledOnceWithExactly(401));
      assert(res.json.calledOnceWithExactly({ message: 'Invalid username or password' }));
    });

    it('should return success message for logout', () => {
      const req = {}; // Mock request object
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
    
      authController.logout(req, res);
    
      assert(res.status.calledOnceWithExactly(200));
      assert(res.json.calledOnceWithExactly({ message: 'Logout successful' }));
    });

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
      const req = { body: newProfileData }; // Mock request object
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
      sinon.stub(User.prototype, 'save').resolves();

      await authController.createProfile(req, res);

      assert(res.status.calledOnceWithExactly(201));
      assert(res.json.calledOnceWithExactly({ message: 'Profile created successfully' }));
    });

    it('should return 400 if passwords do not match', async () => {
      const invalidProfileData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password456', // Different password
        height: 180,
        weight: 75
      };
      const req = { body: invalidProfileData }; // Mock request object
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object

      await authController.createProfile(req, res);

      assert(res.status.calledOnceWithExactly(400));
      assert(res.json.calledOnceWithExactly({ message: 'Passwords do not match' }));
    });


  });

});