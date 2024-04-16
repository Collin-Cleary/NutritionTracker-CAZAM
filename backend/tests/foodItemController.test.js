const sinon = require('sinon');

const foodItemController = require('../controllers/foodItemController');

const foodItemModule = require('../models/foodItemModel');

describe('foodEntryController', function() {
  afterEach(() => {
    sinon.restore();
  });

  it('should call createFoodItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      body: {
        nutrition : "nutrition",
        name : "name",
        ingredients : "ingredients",
        userId : "userId"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const createFoodItemStub = sinon.stub(foodItemModule, 'createFoodItem').returns({ status: 200, json: req.body });
    await foodItemController.createFoodItemData(req, res);

    sinon.assert.calledOnceWithExactly(createFoodItemStub , req.body.nutrition, req.body.name, req.body.ingredients, req.body.userId);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, req.body);
  });

  it('should call getFoodItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      query : {userId : "1"}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const getFoodItemStub = sinon.stub(foodItemModule, 'getFoodItem').returns({ status: 200, json: "result" });
    await foodItemController.getFoodItemData(req, res);

    sinon.assert.calledOnceWithExactly(getFoodItemStub, req.query);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "result");
  });

  it('should call deleteFoodItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      params : {id: 1}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    const deleteFoodItemStub = sinon.stub(foodItemModule, 'deleteFoodItem').returns({ status: 200, json: "deleted" });
    await foodItemController.deleteFoodItemData(req, res);

    sinon.assert.calledOnceWithExactly(deleteFoodItemStub, req.params.id);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "deleted");
  });

});
