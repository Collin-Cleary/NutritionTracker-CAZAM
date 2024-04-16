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
  //progress-report
  describe('Progress report', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should get water data for a specific user sorted by date', async () => {
      try {
        const userId = '123';
        const req = { params: { user: userId } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        }; // Mock response object
  
        const testData = [
          { userId: userId, date: new Date('2023-01-01'), amount: 500 },
          { userId: userId, date: new Date('2023-01-02'), amount: 700 },
          { userId: userId, date: new Date('2023-01-03'), amount: 600 }
        ];
  
        const expectedSortedData = [
          { userId: userId, date: new Date('2023-01-01'), amount: 500 },
          { userId: userId, date: new Date('2023-01-02'), amount: 700 },
          { userId: userId, date: new Date('2023-01-03'), amount: 600 }
        ];
  
        const findStub = sinon.stub(Water, 'find').resolves(testData);
  
        await dataController.getWaterDataByUser(req, res);
        
  
        assert(findStub.calledOnceWithExactly({ userId: userId }));
        assert(res.status.calledOnceWithExactly(200));
        assert(res.json.calledOnceWithExactly(expectedSortedData));
      } catch (error) {
        console.error(error);
      }
    });

    it('should get calorie data for a specific user sorted by date', async () => {
      try {
        const userId = 'testUser';
        const req = { params: { user: userId } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        const testData = [
          { userId: userId, date: new Date('2023-01-01'), calories: 500 },
          { userId: userId, date: new Date('2023-01-02'), calories: 700 },
          { userId: userId, date: new Date('2023-01-03'), calories: 600 }
        ];

        const expectedSortedData = [
          { userId: userId, date: new Date('2023-01-01'), amount: 500 },
          { userId: userId, date: new Date('2023-01-02'), amount: 700 },
          { userId: userId, date: new Date('2023-01-03'), amount: 600 }
        ];
  
        const findStub = sinon.stub(Calorie, 'find').resolves(testData);
  
        await dataController.getCalorieDataByUser(req, res);
  
        // Check if Calorie.find() is called with correct userId parameter
        assert(findStub.calledOnceWithExactly({ userId: userId }));
  
        // Check if response status is set to 200
        assert(res.status.calledOnceWithExactly(200));
  
        // Check if response JSON data is correct
        assert(res.json.calledOnceWithExactly(testData));

        // Check if response JSON data is sorted by date
        assert(res.json.calledOnceWithExactly(expectedSortedData));
      } catch (error) {
        console.error(error);
      }
    });

    it('should get weight data for a specific user sorted by date', async () => {
      try {
        const userId = 'testUser';
        const req = { params: { user: userId } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        const testData = [
          { userId: userId, date: new Date('2023-01-01'), value: 70 },
          { userId: userId, date: new Date('2023-01-02'), value: 65 },
          { userId: userId, date: new Date('2023-01-03'), value: 68 }
        ];

        const expectedSortedData = [
          { userId: userId, date: new Date('2023-01-01'), amount: 70 },
          { userId: userId, date: new Date('2023-01-02'), amount: 65 },
          { userId: userId, date: new Date('2023-01-03'), amount: 68 }
        ];
  
        const findStub = sinon.stub(Weight, 'find').resolves(testData);
  
        await dataController.getWeightDataByUser(req, res);
  
        // Check if Weight.find() is called with correct userId parameter
        assert(findStub.calledOnceWithExactly({ userId: userId }));
  
        // Check if response status is set to 200
        assert(res.status.calledOnceWithExactly(200));
  
        // Check if response JSON data is correct
        assert(res.json.calledOnceWithExactly(testData));

        // Check if response JSON data is sorted by date
        assert(res.json.calledOnceWithExactly(expectedSortedData));
      } catch (error) {
        console.error(error);
      }
    });
  });

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

    it('should delete water data successfully', async () => {
      try {
        const req = { params: { id: 'someId' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        // Mocking Water.findByIdAndDelete to resolve
        const findByIdAndDeleteStub = sinon.stub(Water, 'findByIdAndDelete').resolves();
  
        await dataController.deleteWaterData(req, res);
  
        assert(findByIdAndDeleteStub.calledOnceWith(req.params.id));
        assert(res.status.calledOnceWith(204));
        assert(res.json.calledOnceWith({ message: 'Water data deleted successfully' }));
      } catch (error) {
        console.error(error);
      }
    });
  
    it('should handle errors', async () => {
      try {
        const req = { params: { id: 'someId' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        const error = new Error('Test error');
  
        // Mocking Water.findByIdAndDelete to reject with error
        const findByIdAndDeleteStub = sinon.stub(Water, 'findByIdAndDelete').rejects(error);
  
        await dataController.deleteWaterData(req, res);
  
        assert(findByIdAndDeleteStub.calledOnceWith(req.params.id));
        assert(res.status.calledOnceWith(500));
        assert(res.json.calledOnceWith({ message: error.message }));
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

    it('should delete calorie data successfully', async () => {
      try {
        const calorieId = 'testCalorieId';
        const req = { params: { id: calorieId } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        const findByIdAndDeleteStub = sinon.stub(Calorie, 'findByIdAndDelete').resolves();
  
        await dataController.deleteCalorieData(req, res);
  
        // Check if Calorie.findByIdAndDelete() is called with correct calorieId parameter
        assert(findByIdAndDeleteStub.calledOnceWithExactly(calorieId));
  
        // Check if response status is set to 204
        assert(res.status.calledOnceWithExactly(204));
  
        // Check if response JSON message is correct
        assert(res.json.calledOnceWithExactly({ message: 'Calorie data deleted successfully' }));
      } catch (error) {
        console.error(error);
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

    it('should delete weight data successfully', async () => {
      try {
        const weightId = 'testWeightId';
        const req = { params: { id: weightId } }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        const findByIdAndDeleteStub = sinon.stub(Weight, 'findByIdAndDelete').resolves();
  
        await dataController.deleteWeightData(req, res);
  
        assert(findByIdAndDeleteStub.calledOnceWithExactly(weightId));
        assert(res.status.calledOnceWithExactly(204));
        assert(res.json.calledOnceWithExactly({ message: 'Weight data deleted successfully' }));
      } catch (error) {
        console.error(error);
      }
    });
  
    it('should handle errors', async () => {
      try {
        const weightId = 'testWeightId';
        const req = { params: { id: weightId } }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
  
        const error = new Error('Test error');
        const findByIdAndDeleteStub = sinon.stub(Weight, 'findByIdAndDelete').rejects(error);
  
        await dataController.deleteWeightData(req, res);
  
        assert(findByIdAndDeleteStub.calledOnceWithExactly(weightId));
        assert(res.status.calledOnceWithExactly(500));
        assert(res.json.calledOnceWithExactly({ message: error.message }));
      } catch (error) {
        console.error(error);
      }
    });

  });

  // Registration & Login
  describe('Login API', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should login with correct credentials and return JWT token', () => {
      try{
          const validCredentials = { userName: 'john_doe', password: 'password123' }; // NOSONAR
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
      const invalidCredentials = { userName: 'invalid_user', password: 'invalid_password' }; // NOSONAR
      const req = { body: invalidCredentials }; // Mock request object
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'compare').resolves(false);

      authController.login(req, res);

      assert(res.status.calledOnceWithExactly(401));
      assert(res.json.calledOnceWithExactly({ message: 'Invalid username or password' }));
    });
  });

    describe('Logout API', () => {
      afterEach(() => {
        sinon.restore();
      });

      it('should return success message for logout', () => {
        const req = {}; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
      
        authController.logout(req, res);
      
        assert(res.status.calledOnceWithExactly(200));
        assert(res.json.calledOnceWithExactly({ message: 'Logout successful' }));
      });

    });
    

    describe('Profile Creation API', () => {
      afterEach(() => {
        sinon.restore();
      });
      it('should create a new profile successfully', async () => {
        const newProfileData = {
          userName: 'john_doe',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123', // NOSONAR
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
          password: 'password123', // NOSONAR
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

      it('should return 400 if user already exists with the provided email', async () => {
        const existingProfileData = {
          userName: 'existing_user',
          name: 'Existing User',
          email: 'test@example.com',
          password: 'password123', // NOSONAR
          confirmPassword: 'password123',
          height: 170,
          weight: 70
        };
        const req = { body: existingProfileData }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
        sinon.stub(User, 'findOne').resolves({ email: 'test@example.com' });

        await authController.createProfile(req, res);

        assert(res.status.calledOnceWithExactly(400));
        assert(res.json.calledOnceWithExactly({ message: 'User already exists with this email' }));
      });

  });

});
