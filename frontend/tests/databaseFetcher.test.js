const assert = require('assert')
const sinon = require('sinon')
const FoodSearch = require('../models/databaseFetcher')


describe("databaseFetcher", () => {

  afterEach(() => {
    sinon.restore();
  });


  it('should properly form query and assign results', async () => {
    const expQuery = "cheddar,cheese"
    const expPageNumber = 123;
    const expSortBy= "publishedDate";
    const expResponse = [{exampleResponse : "some foods"}]
    const fetchStub = sinon.stub(global, 'fetch').resolves(Response.json(expResponse))

    const fs = new FoodSearch()
    await fs.fetchForData(expQuery, expPageNumber, expSortBy)

    console.log(fetchStub.getCall(0).args)
    sinon.assert.calledOnceWithExactly(fetchStub, "https://api.nal.usda.gov/fdc/v1/foods/search"+`?${new URLSearchParams({api_key : "DEMO_KEY", query : expQuery, pageNumber : expPageNumber, sortBy : expSortBy}).toString()}`)
    assert.deepEqual(fs.searchResults, expResponse);
  });

  it('should properly handle errors while fetching', async () => {
    const fetchStub = sinon.stub(global, 'fetch').resolves(Response.json({example : "example"}, {status : 400}))
    const errorStub = sinon.stub(console, 'error').returns()
    const fs = new FoodSearch()
    await fs.fetchForData(1, 2, 3)
    sinon.assert.calledOnce(errorStub)
    assert.equal(fs.foodEntries, undefined);
  })  

})