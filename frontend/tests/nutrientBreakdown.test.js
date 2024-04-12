const assert = require('assert')
const sinon = require('sinon')
const NutrientBreakdown = require('../models/nutrientBreakdown')
const fetchMock = require('fetch-mock')

describe("nutrientBreakdown", () => {

  afterEach(() => {
    sinon.restore();
  });


  it('should properly form query and assign food entries', async () => {
    const expDate = new Date()
    const expUserId = 123;
    const expFoodEntries = [{ nutrients: { protein: 20, carbs: 30 } }, {nutrients : {protein : 40, "Vitamin A" : 10}}];
    fetchMock.get("http://localhost:3000/api/foodentry"+`?${queryString = new URLSearchParams({date : expDate, userId : expUserId}).toString()}`, expFoodEntries);
    
    const nb = new NutrientBreakdown()
    await nb.fetchForDate(expDate, expUserId)

    assert.equal(fetchMock.done(), true)
    assert.deepEqual(nb.foodEntries, expFoodEntries);
  });

  it('should properly handle errors', async () => {
    fetchMock.get('*', {
      body: {example : "example"},
      status: 400
    })
    const errorStub = sinon.stub(console, 'error').returns()
    const nb = new NutrientBreakdown()
    await nb.fetchForDate(12, 123)
    sinon.assert.calledOnce(errorStub)
    assert.equal(nb.foodEntries, undefined);
  })  

  it('should propely combine nutirents into a single breakdown', async () => {
    const nb = new NutrientBreakdown()
    nb.foodEntries = [{ nutrients: { protein: 20, carbs: 30 } }, {nutrients : {protein : 40, "Vitamin A" : 10}}]
    const breakdown = nb.getBreakdown()
    assert.deepEqual(breakdown,  { protein: 60, carbs: 30 , "Vitamin A" : 10 } );
  })

})