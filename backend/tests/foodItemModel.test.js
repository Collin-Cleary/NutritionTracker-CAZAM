const assert = require('assert');
const sinon = require('sinon');
const {FoodItem, deleteFoodItem, createFoodItem, getFoodItem} = require("../models/foodItemModel")


describe('Food Item Model', () => {
  
  describe('getFoodItem', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should get food item data returning results and 200 status', async () => {
      const mockData = [
        { nutrition: {"vitamin C" : 20, "iron" : 2}, name: "baked potatoes", ingredients: "potatoes cheese" ,userId : "user1"}
      ];
      const findstub = sinon.stub(FoodItem, 'find').resolves(mockData);
      let query = {userId : "user1"}
      result = await getFoodItem(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, mockData);
    });


    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(FoodItem, 'find').throws(new Error("Example DB error"));
      let query = {userId : "user1"}
      result = await getFoodItem(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 500);
      assert.deepEqual(result.json, {message : "Example DB error"});
    });
  });

  describe('createFoodItem', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return 201 status and the item when succesfully saving', async () => {
      const mockData = { nutrition: {"vitamin C" : 20, "iron" : 2}, name: "baked potatoes", ingredients: "potatoes cheese" ,userId : "user1"}
      const savestub = sinon.stub(FoodItem.prototype, 'save').resolves(mockData);
      result = await createFoodItem({"vitamin C" : 20, "iron" : 2}, "baked potatoes", "potatoes cheese", "user1");
      const fi = savestub.firstCall.thisValue

      sinon.assert.calledOnceWithExactly(savestub)
      assert.deepEqual(Object.fromEntries(fi.nutrition.entries()), {"vitamin C" : 20, "iron" : 2}) //Need to transform it from mongoose map
      assert.equal(fi.name, "baked potatoes")
      assert.equal(fi.ingredients, "potatoes cheese")
      assert.equal(fi.userId, "user1")
      assert.equal(result.status, 201);
      assert.deepEqual(result.json, mockData);
    });

    it('should upon error trying to save return error message and 400 status', async () => {
      const savestub = sinon.stub(FoodItem.prototype, 'save').throws(new Error("Example DB error saving"));
      result = await createFoodItem({"vitamin C" : 20, "iron" : 2}, "baked potatoes", "potatoes cheese", "user1");

      sinon.assert.calledOnceWithExactly(savestub)
      assert.equal(result.status, 400);
      assert.deepEqual(result.json,{message : "Example DB error saving"});
    });
  });

  describe('deleteFoodItem', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should delete food item data returning a message and 204 status', async () => {
      const findstub = sinon.stub(FoodItem, 'findByIdAndDelete').resolves();
      result = await deleteFoodItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,204);
      assert.deepEqual(result.json,{message : "Food Item Data Deleted Succesfully"});
    });

    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(FoodItem, 'findByIdAndDelete').throws(new Error("Example DB error delete"));
      result = await deleteFoodItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,500);
      assert.deepEqual(result.json, {message : "Example DB error delete"});
    });
  });

});