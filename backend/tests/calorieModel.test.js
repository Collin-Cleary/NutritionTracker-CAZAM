const assert = require('assert');
const sinon = require('sinon');
const {Calorie, deleteCalorieItem, createCalorieItem, getCalorieItems}= require("../models/calorieModel")


describe('Calorie Model', () => {

  
  
  describe('getCalorieItems', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return 200 status and matching data when records are found', async () => {
        const mockData = [
            { date: "2024-03-19", userId: "user3", intake: 1800 }
        ];
        const aggregateStub = sinon.stub(Calorie, 'aggregate').resolves(mockData);
        const query = { userId: "user3", date: "2024-03-19" };

        const result = await getCalorieItems(query);

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

        const result = await getCalorieItems(query);

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

        const result = await getCalorieItems(query);

        sinon.assert.calledOnceWithExactly(aggregateStub, [
            { $match: query },
            { $sort: { intake: -1 } },
            { $limit: 1 }
        ]);
        assert.equal(result.status, 500);
        assert.deepEqual(result.json, { message: errorMessage });
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