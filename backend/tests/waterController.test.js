const sinon = require('sinon');

const waterController = require('../controllers/waterController');

var waterModule = require('../models/waterModel');

describe('foodEntryController', function() {
  afterEach(() => {
    sinon.restore();
  });

  it('should call createWaterItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      body: {
        date : "date",
        userId : "userId",
        amount : "amount"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const createwaterItemStub = sinon.stub(waterModule, 'createWaterItem').returns({ status: 200, json: req.body });
    await waterController.createWaterItemData(req, res);

    sinon.assert.calledOnceWithExactly(createwaterItemStub , req.body.date, req.body.userId, req.body.amount);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, req.body);
  });

  it('should call getWaterItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      query : {userId : "1"}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const getWaterItemStub = sinon.stub(waterModule, 'getWaterItems').returns({ status: 200, json: "result" });
    await waterController.getWaterItemData(req, res);

    sinon.assert.calledOnceWithExactly(getWaterItemStub, req.query);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "result");
  });

  it('should call deleteWaterItem with correct arguments and call correct positions for responses', async function() {
    const req = {
      params : {id: 1}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    const deleteWaterItemStub = sinon.stub(waterModule, 'deleteWaterItem').returns({ status: 200, json: "deleted" });
    await waterController.deleteWaterItemData(req, res);

    sinon.assert.calledOnceWithExactly(deleteWaterItemStub, req.params.id);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, "deleted");
  });

});
