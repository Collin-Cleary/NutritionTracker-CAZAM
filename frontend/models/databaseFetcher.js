

const databaseURL = "https://api.nal.usda.gov/fdc/v1/foods/search"

const key = "DEMO_KEY"

class FoodSearch {

  constructor() {

  }
  
  async fetchForData(query, pageNumber, sortBy) {
    console.log("We will be seeing where this fails")
    const queryString = new URLSearchParams({api_key : key, query : query, pageNumber : pageNumber, sortBy : sortBy}).toString();
    console.log("1")
    try {
      console.log("2")
      const response = await fetch(databaseURL+`?${queryString}`)
      console.log("3")
      if (!response.ok){
        throw new Error("Failed to Fetch data")
      }
      console.log("4")
      this.searchResults = await response.json()
      console.log("5")
    } catch (error) {
      console.error("Failed to fetch: ", error.message)
    }
  }
  
}
  

module.exports = FoodSearch