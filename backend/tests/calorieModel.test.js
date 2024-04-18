const assert = require('assert');
const sinon = require('sinon');
const {Calorie, deleteCalorieItem, createCalorieItem, getCalorieItems,getHighestCalorieItem}= require("../models/calorieModel")


describe('Calorie Model', () => {

  
  
  describe('getHighestCalorieItem', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return 200 status and matching data when records are found', async () => {
        const mockData = [
            { date: "2024-03-19", userId: "user3", intake: 1800 }
        ];
        const aggregateStub = sinon.stub(Calorie, 'aggregate').resolves(mockData);
        const query = { userId: "user3", date: "2024-03-19" };

        const result = await getHighestCalorieItem(query);

        sinon.assert.calledOnceWithExactly(aggregateStub, [
            { $match: query },
            { $sort: { intake: -1 } },
            { $limit: 1 }
        ]);
        assert.equal(result.status, 200);
        assert.deepEqual(result.json, mockData);
    });

    it('should return 404 status and message when no records are found', async () => {
        const aggregateStub = sinon.stub(Calorie, 'aggregate').resolves([]);
        const query = { userId: "user3", date: "2024-03-19" };

        const result = await getHighestCalorieItem(query);

        sinon.assert.calledOnceWithExactly(aggregateStub, [
            { $match: query },
            { $sort: { intake: -1 } },
            { $limit: 1 }
        ]);
        assert.equal(result.status, 404);
        assert.deepEqual(result.json, { message: 'No records found' });
    });

    it('should return 500 status and error message on database error', async () => {
        const errorMessage = "Example DB error";
        const aggregateStub = sinon.stub(Calorie, 'aggregate').throws(new Error(errorMessage));
        const query = { userId: "user3", date: "2024-03-19" };

        const result = await getHighestCalorieItem(query);

        sinon.assert.calledOnceWithExactly(aggregateStub, [
            { $match: query },
            { $sort: { intake: -1 } },
            { $limit: 1 }
        ]);
        assert.equal(result.status, 500);
        assert.deepEqual(result.json, { message: errorMessage });
    });
  });
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
      const result = await getCalorieItems(query);

      sinon.assert.calledOnceWithExactly(findstub, query)
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, mockData);
    });


    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Calorie, 'find').throws(new Error("Example DB error"));
      let query = {userId : "user3"}
      const result = await getCalorieItems(query);

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
      const result = await createCalorieItem(new Date("2024-03-19"), "user3", 1800);
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
      const result = await createCalorieItem(new Date("2024-03-19"), "user3", 1800);

      sinon.assert.calledOnceWithExactly(savestub)
      assert.equal(result.status, 400);
      assert.deepEqual(result.json,{message : "Example DB error saving"});
    });
  });
  describe('deleteCalorieItem', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should delete water item data returning a message and 204 status', async () => {
      const findstub = sinon.stub(Calorie, 'findByIdAndDelete').resolves();
      const result = await deleteCalorieItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,204);
      assert.deepEqual(result.json,{message : "Calorie Item Data Deleted Succesfully"});
    });

    it('should upon error trying to get return error message and 500 status', async () => {
      const findstub = sinon.stub(Calorie, 'findByIdAndDelete').throws(new Error("Example DB error delete"));
      const result = await deleteCalorieItem(5);

      sinon.assert.calledOnceWithExactly(findstub, 5)
      assert.equal(result.status,500);
      assert.deepEqual(result.json, {message : "Example DB error delete"});
    });
  });

});