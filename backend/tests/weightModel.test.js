const assert = require('assert');
const sinon = require('sinon');
const {Weight, deleteWeightItem, createWeightItem, getWeightItems}= require("../models/weightModel")


describe('Weight Model', () => {
  
  describe('getWeightItems', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should get weight item data returning results and 200 status', async () => {
      const mockData = [
        { date: "2024-03-19", userId: "user3", value: 130 }
      ];
      const findstub = sinon.stub(Weight, 'find').resolves(mockData);
      let query = {userId : "user3"}
      result = await getWeightItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, mockData);
    });


    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Weight, 'find').throws(new Error("Example DB error"));
      let query = {userId : "user3"}
      result = await getWeightItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 500);
      assert.deepEqual(result.json, {message : "Example DB error"});
    });
  });

  describe('createWeightItem', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return 201 status and the item when succesfully saving', async () => {
      const mockData = { date: new Date("2024-03-19"), userId: "user3", value: 130 }
      const savestub = sinon.stub(Weight.prototype, 'save').resolves(mockData);
      result = await createWeightItem(new Date("2024-03-19"), "user3", 130);
      const ci = savestub.firstCall.thisValue

      sinon.assert.calledOnceWithExactly(savestub)
      assert.deepEqual(ci.date, mockData.date)
      assert.equal(ci.userId, mockData.userId)
      assert.equal(ci.value, mockData.value)
      assert.equal(result.status, 201);
      assert.deepEqual(result.json, mockData);
    });

    it('should upon error trying to save return error message and 400 status', async () => {
      const savestub = sinon.stub(Weight.prototype, 'save').throws(new Error("Example DB error saving"));
      result = await createWeightItem(new Date("2024-03-19"), "user3", 130);

      sinon.assert.calledOnceWithExactly(savestub)
      assert.equal(result.status, 400);
      assert.deepEqual(result.json,{message : "Example DB error saving"});
    });
  });

  describe('deleteWeightItem', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should delete weight item data returning a message and 204 status', async () => {
      const findstub = sinon.stub(Weight, 'findByIdAndDelete').resolves();
      result = await deleteWeightItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,204);
      assert.deepEqual(result.json,{message : "Weight Item Data Deleted Succesfully"});
    });

    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Weight, 'findByIdAndDelete').throws(new Error("Example DB error delete"));
      result = await deleteWeightItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,500);
      assert.deepEqual(result.json, {message : "Example DB error delete"});
    });
  });

});