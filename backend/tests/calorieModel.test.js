const assert = require('assert');
const sinon = require('sinon');
const {Calorie, deleteCalorieItem, createCalorieItem, getCalorieItems}= require("../models/calorieModel")


describe('Calorie Model', () => {
  
  describe('getCalorieItems', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should get calorie item data returning results and 200 status', async () => {
      const mockData = [
        { date: "2024-03-19", userId: "user3", intake: 1800 }
      ];
      const findstub = sinon.stub(Calorie, 'find').resolves(mockData);
      let query = {userId : "user3"}
      result = await getCalorieItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, mockData);
    });


    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Calorie, 'find').throws(new Error("Example DB error"));
      let query = {userId : "user3"}
      result = await getCalorieItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 500);
      assert.deepEqual(result.json, {message : "Example DB error"});
    });
  });

  describe('createCalorieItem', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return 201 status and the item when succesfully saving', async () => {
      const mockData = { date: new Date("2024-03-19"), userId: "user3", intake: 1800 }
      const savestub = sinon.stub(Calorie.prototype, 'save').resolves(mockData);
      result = await createCalorieItem(new Date("2024-03-19"), "user3", 1800);
      const ci = savestub.firstCall.thisValue

      sinon.assert.calledOnceWithExactly(savestub)
      assert.deepEqual(ci.date, mockData.date)
      assert.equal(ci.userId, mockData.userId)
      assert.equal(ci.intake, mockData.intake)
      assert.equal(result.status, 201);
      assert.deepEqual(result.json, mockData);
    });

    it('should upon error trying to save return error message and 400 status', async () => {
      const savestub = sinon.stub(Calorie.prototype, 'save').throws(new Error("Example DB error saving"));
      result = await createCalorieItem(new Date("2024-03-19"), "user3", 1800);

      sinon.assert.calledOnceWithExactly(savestub)
      assert.equal(result.status, 400);
      assert.deepEqual(result.json,{message : "Example DB error saving"});
    });
  });

  describe('deleteCalorieItem', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should delete food item data returning a message and 204 status', async () => {
      const findstub = sinon.stub(Calorie, 'findByIdAndDelete').resolves();
      result = await deleteCalorieItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,204);
      assert.deepEqual(result.json,{message : "Food Item Data Deleted Succesfully"});
    });

    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Calorie, 'findByIdAndDelete').throws(new Error("Example DB error delete"));
      result = await deleteCalorieItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,500);
      assert.deepEqual(result.json, {message : "Example DB error delete"});
    });
  });

});