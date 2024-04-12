const assert = require('assert')
const sinon = require('sinon')
const FoodSearch = require('../models/databaseFetcher')
const fetchMock = require('fetch-mock')

describe("databaseFetcher", () => {

  afterEach(() => {
    sinon.restore();
    fetchMock.reset()
  });


  it('should properly form query and assign results', async () => {
    const expQuery = "cheddar,cheese"
    const expPageNumber = 123;
    const expSortBy= "publishedDate";
    const expResponse = [{exampleResponse : "some foods"}]

    fetchMock.get('https://api.nal.usda.gov/fdc/v1/foods/search'+`?${new URLSearchParams({api_key : "DEMO_KEY", query : expQuery, pageNumber : expPageNumber, sortBy : expSortBy}).toString()}`, expResponse, {});
    
    const fs = new FoodSearch()
    await fs.fetchForData(expQuery, expPageNumber, expSortBy)
    assert.equal(fetchMock.done(), true)
    assert.deepEqual(fs.searchResults, expResponse);
  });

  it('should properly handle errors while fetching', async () => {
    fetchMock.get('*', {
      body: {example : "example"},
      status: 400
    })
    const errorStub = sinon.stub(console, 'error').returns()
    const fs = new FoodSearch()
    await fs.fetchForData(1, 2, 3)
    sinon.assert.calledOnce(errorStub)
    assert.equal(fs.foodEntries, undefined);
  })  

})