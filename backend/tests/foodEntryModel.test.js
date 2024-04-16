const assert = require('assert');
const sinon = require('sinon');
const {FoodEntry, deleteFoodEntry, createFoodEntry, getFoodEntry} = require("../models/foodEntryModel");
const { Mongoose } = require('mongoose');


describe('Food Entry Model', () => {
  
  describe('getFoodEntry', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should get food entry data returning results and 200 status', async () => {
      const populateddata = { date: "12-31-2000", name: "baked potatoes", parts: [
        {nutrition: {"vitamin C" : 20, "iron" : 2}, name: "cheese", ingredients: "cheese melted" ,userId : "user1"}, 
        {nutrition: {"vitamin B" : 20, "iron" : 2}, name: "potatoes", ingredients: "potatoes baked" ,userId : "user1"}],
        userId : "user1"
      }
      let query = {userId : "user1"}
      const findstub = sinon.stub(FoodEntry, 'find')
      mockfunc = {populate : function() {return populateddata}}
      const populatemock = sinon.mock(mockfunc)
      findstub.withArgs(query).returns(populatemock.object);
      const result = await getFoodEntry(query);

      assert.equal(result.status, 200);
      assert.deepEqual(result.json, populateddata);
    });


    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(FoodEntry, 'find').throws(new Error("Example DB error"));
      let query = {userId : "user1"}
      const result = await getFoodEntry(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 500);
      assert.deepEqual(result.json, {message : "Example DB error"});
    });
  });

  describe('createFoodEntry', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return 201 status and the entry when succesfully saving', async () => {
      const mockdata = { date: new Date("12-31-2000"), name: "baked potatoes", parts: ["56cb91bdc3464f14678934ca"], userId : "user1"}
      const savestub = sinon.stub(FoodEntry.prototype, 'save').resolves(mockdata);
      const result = await createFoodEntry(mockdata.date, mockdata.name, mockdata.parts, mockdata.userId);
      const fe = savestub.firstCall.thisValue

      sinon.assert.calledOnceWithExactly(savestub)
      assert.deepEqual(fe.date, mockdata.date) 
      assert.equal(fe.name, mockdata.name)
      assert.deepEqual(fe.parts.map((id) => {return id.toString()}), mockdata.parts)
      assert.equal(fe.userId, mockdata.userId)
      assert.equal(result.status, 201);
      assert.deepEqual(result.json, mockdata);
    });

    it('should upon error trying to save return error message and 400 status', async () => {
      const savestub = sinon.stub(FoodEntry.prototype, 'save').throws(new Error("Example DB error saving"));
      const mockdata = { date: "12-31-2000", name: "baked potatoes", parts: ["1", "2"], userId : "user1"}
      const result = await createFoodEntry(mockdata.date, mockdata.name, mockdata.parts, mockdata.userId);

      sinon.assert.calledOnceWithExactly(savestub)
      assert.equal(result.status, 400);
      assert.deepEqual(result.json,{message : "Example DB error saving"});
    });
  });

  describe('deleteFoodEntry', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should delete food item data returning a message and 204 status', async () => {
      const findstub = sinon.stub(FoodEntry, 'findByIdAndDelete').resolves();
      const result = await deleteFoodEntry(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,204);
      assert.deepEqual(result.json,{message : "Food Entry Data Deleted Succesfully"});
    });

    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(FoodEntry, 'findByIdAndDelete').throws(new Error("Example DB error delete"));
      const result = await deleteFoodEntry(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,500);
      assert.deepEqual(result.json, {message : "Example DB error delete"});
    });
  });

});