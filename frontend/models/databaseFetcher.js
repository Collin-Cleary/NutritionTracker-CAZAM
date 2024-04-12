

const databaseURL = "https://api.nal.usda.gov/fdc/v1/foods/search"

const key = "DEMO_KEY"

class FoodSearch {

  constructor() {

  }
  
  async fetchForData(query, pageNumber, sortBy) {
    const queryString = new URLSearchParams({api_key : key, query : query, pageNumber : pageNumber, sortBy : sortBy}).toString();
    try {
      const response = await fetch(databaseURL+`?${queryString}`)
      if (!response.ok){
        throw new Error("Failed to Fetch data")
      }
      this.searchResults = await response.json()
    } catch (error) {
      console.error("Failed to fetch: ", error.message)
    }
  }
  
}
  

module.exports = FoodSearch