const assert = require('assert')
const sinon = require('sinon')
const NutrientBreakdown = require('../models/nutrientBreakdown')


describe("nutrientBreakdown", () => {

  afterEach(() => {
    sinon.restore();
  });


  it('should properly form query and assign food entries', async () => {
    const expDate = new Date()
    const expUserId = 123;
    const expFoodEntries = [{ nutrients: { protein: 20, carbs: 30 } }, {nutrients : {protein : 40, "Vitamin A" : 10}}];
    const fetchStub = sinon.stub(global, 'fetch').resolves(Response.json(expFoodEntries))

    const nb = new NutrientBreakdown()
    await nb.fetchForDate(expDate, expUserId)

    sinon.assert.calledOnceWithExactly(fetchStub, "http://localhost:3000/api/foodentry"+`?${new URLSearchParams({date : expDate, userId : expUserId}).toString()}`)
    assert.deepEqual(nb.foodEntries, expFoodEntries);
  });

  it('should properly handle errors', async () => {
    const expFoodEntries = [{ nutrients: { protein: 20, carbs: 30 } }, {nutrients : {protein : 40, "Vitamin A" : 10}}];
    const fetchStub = sinon.stub(global, 'fetch').resolves(Response.json(expFoodEntries, {status : 400}))
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