const sinon = require('sinon');

const calorieController = require('../controllers/calorieController');

var calorieModule = require('../models/calorieModel');

describe('foodEntryController', function() {
  afterEach(() => {
    sinon.restore();
  });

  it('should call createCalorieItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      body: {
        date : "date",
        userId : "userId",
        intake : "intake"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const createcalorieItemStub = sinon.stub(calorieModule, 'createCalorieItem').returns({ status: 200, json: req.body });
    await calorieController.createCalorieItemData(req, res);

    sinon.assert.calledOnceWithExactly(createcalorieItemStub , req.body.date, req.body.userId, req.body.intake);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, req.body);
  });

  it('should call getCalorieItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      query : {userId : "1"}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const getCalorieItemStub = sinon.stub(calorieModule, 'getCalorieItems').returns({ status: 200, json: "result" });
    await calorieController.getCalorieItemData(req, res);

    sinon.assert.calledOnceWithExactly(getCalorieItemStub, req.query);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "result");
  });

  it('should call deleteCalorieItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      params : {id: 1}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    const deleteCalorieItemStub = sinon.stub(calorieModule, 'deleteCalorieItem').returns({ status: 200, json: "deleted" });
    await calorieController.deleteCalorieItemData(req, res);

    sinon.assert.calledOnceWithExactly(deleteCalorieItemStub, req.params.id);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "deleted");
  });

});
