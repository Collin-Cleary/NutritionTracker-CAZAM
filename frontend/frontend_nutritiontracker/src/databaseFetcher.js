

const databaseURL = "https://api.nal.usda.gov/fdc/v1/foods/search"

const key = "DEMO_KEY"

class FoodSearch {
  foods = []


  async fetchForData(query) {
    const queryString = new URLSearchParams({api_key : key, query : query, pageSize : 10}).toString();
    try {
      const response = await fetch(databaseURL+`?${queryString}`)
      if (!response.ok){
        throw new Error("Failed to Fetch data")
      }
      this.searchResults = await response.json()
      this.convert()
    } catch (error) {
      console.error("Failed to fetch: ", error.message)
    }
  }
  

  convert() {
    this.foods = []
    
    for (const food of this.searchResults.foods) {
        let nutrients = {}
        let serving_size = food.dataType === "Branded" ? `${food.servingSize} ${food.servingSizeUnit}` : "100 g"
        let foodname = food.dataType === "Branded" ? `${food.brandName} ${food.description}` : `${food.description}`
        for (const nutrient of food.foodNutrients){
            if (nutrient.nutrientName === "Protein"){
                nutrients.Protein = nutrient.value
            }
            if (nutrient.nutrientName === "Energy"){
                nutrients.Calories = nutrient.value
            }
            if (nutrient.nutrientName === "Carbohydrate, by difference"){
                nutrients.Carbohydrates = nutrient.value
            }
            if (nutrient.nutrientName === "Total lipid (fat)"){
                nutrients.Fat = nutrient.value
            }
        }
        this.foods.push({nutrients : nutrients, serving_size : serving_size, name : foodname})
    }
  }
}
  

module.exports = FoodSearch