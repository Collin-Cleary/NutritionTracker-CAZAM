const sinon = require('sinon');

const weightController = require('../controllers/weightController');

const weightModule = require('../models/weightModel');

describe('foodEntryController', function() {
  afterEach(() => {
    sinon.restore();
  });

  it('should call createWeightItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      body: {
        date : "date",
        userId : "userId",
        value : "value"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const createweightItemStub = sinon.stub(weightModule, 'createWeightItem').returns({ status: 200, json: req.body });
    await weightController.createWeightItemData(req, res);

    sinon.assert.calledOnceWithExactly(createweightItemStub , req.body.date, req.body.userId, req.body.value);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, req.body);
  });

  it('should call getWeightItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      query : {userId : "1"}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const getWeightItemStub = sinon.stub(weightModule, 'getWeightItems').returns({ status: 200, json: "result" });
    await weightController.getWeightItemData(req, res);

    sinon.assert.calledOnceWithExactly(getWeightItemStub, req.query);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "result");
  });

  it('should call deleteWeightItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      params : {id: 1}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    const deleteWeightItemStub = sinon.stub(weightModule, 'deleteWeightItem').returns({ status: 200, json: "deleted" });
    await weightController.deleteWeightItemData(req, res);

    sinon.assert.calledOnceWithExactly(deleteWeightItemStub, req.params.id);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "deleted");
  });

});
