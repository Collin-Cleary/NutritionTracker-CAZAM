const sinon = require('sinon');

const foodEntryController = require('../controllers/foodEntryController');

// Import the function to create food entry (assuming it's exported from another file)
const FoodEntryModule = require('../models/foodEntryModel');

describe('foodEntryController', function() {
  afterEach(() => {
    sinon.restore();
  });

  it('should call createFoodEntry with correct arguments and call correct positions for responses', async function() {
    const req = {
      body: {
        date: '2024-04-09',
        name: 'Example Food',
        parts: ["1"],
        userId: 'user1'
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const createFoodEntryStub = sinon.stub(FoodEntryModule, 'createFoodEntry').returns({ status: 200, json: req.body });
    await foodEntryController.createFoodEntryData(req, res);

    sinon.assert.calledOnceWithExactly(createFoodEntryStub, req.body.date, req.body.name, req.body.parts, req.body.userId);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, req.body);
  });

  it('should call getFoodEntry with correct arguments and call correct positions for responses', async function() {
    const req = {
      query : {userId : "1"}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const getFoodEntryStub = sinon.stub(FoodEntryModule, 'getFoodEntry').returns({ status: 200, json: "result" });
    await foodEntryController.getFoodEntryData(req, res);

    sinon.assert.calledOnceWithExactly(getFoodEntryStub, req.query);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "result");
  });

  it('should call deleteFoodEntry with correct arguments and call correct positions for responses', async function() {
    const req = {
      params : {id: 1}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    const deleteFoodEntryStub = sinon.stub(FoodEntryModule, 'deleteFoodEntry').returns({ status: 200, json: "deleted" });
    await foodEntryController.deleteFoodEntryData(req, res);

    sinon.assert.calledOnceWithExactly(deleteFoodEntryStub, req.params.id);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "deleted");
  });

});
