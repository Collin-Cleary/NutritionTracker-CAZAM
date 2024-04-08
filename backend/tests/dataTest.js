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

  });
});