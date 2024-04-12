const assert = require('assert');
const sinon = require('sinon');
const {Water, getWaterItems, createWaterItem, deleteWaterItem} = require("../models/waterModel")


describe('Water Model', () => {
  
  describe('getWaterItems', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should get water item data returning results and 200 status', async () => {
      const mockData = [
        { date: "2024-03-19", userId: "user3", amount: 100 }
      ];
      const findstub = sinon.stub(Water, 'find').resolves(mockData);
      let query = {userId : "user3"}
      result = await getWaterItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, mockData);
    });


    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Water, 'find').throws(new Error("Example DB error"));
      let query = {userId : "user3"}
      result = await getWaterItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 500);
      assert.deepEqual(result.json, {message : "Example DB error"});
    });
  });

  describe('createWaterItem', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return 201 status and the item when succesfully saving', async () => {
      const mockData = { date: new Date("2024-03-19"), userId: "user3", amount: 100 }
      const savestub = sinon.stub(Water.prototype, 'save').resolves(mockData);
      result = await createWaterItem(new Date("2024-03-19"), "user3", 100);
      const ci = savestub.firstCall.thisValue

      sinon.assert.calledOnceWithExactly(savestub)
      assert.deepEqual(ci.date, mockData.date)
      assert.equal(ci.userId, mockData.userId)
      assert.equal(ci.amount, mockData.amount)
      assert.equal(result.status, 201);
      assert.deepEqual(result.json, mockData);
    });

    it('should upon error trying to save return error message and 400 status', async () => {
      const savestub = sinon.stub(Water.prototype, 'save').throws(new Error("Example DB error saving"));
      result = await createWaterItem(new Date("2024-03-19"), "user3", 100);

      sinon.assert.calledOnceWithExactly(savestub)
      assert.equal(result.status, 400);
      assert.deepEqual(result.json,{message : "Example DB error saving"});
    });
  });

  describe('deleteWaterItem', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should delete water item data returning a message and 204 status', async () => {
      const findstub = sinon.stub(Water, 'findByIdAndDelete').resolves();
      result = await deleteWaterItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,204);
      assert.deepEqual(result.json,{message : "Water Item Data Deleted Succesfully"});
    });

    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Water, 'findByIdAndDelete').throws(new Error("Example DB error delete"));
      result = await deleteWaterItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,500);
      assert.deepEqual(result.json, {message : "Example DB error delete"});
    });
  });

});