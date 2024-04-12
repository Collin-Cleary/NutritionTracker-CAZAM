

const foodEntryUrl = "http://localhost:3000/api/foodentry"

const reccomendedAmounts = {
  "Vitamin A" : 900,
  "Vitamin C" : 90,
  "Calcium" : 1300
}

class NutrientBreakdown {

  constructor() {

  }

  async fetchForDate(date, userId) {
    const queryString = new URLSearchParams({date : date, userId : userId}).toString();
    let foodentries = []
    try {
      const response = await fetch(foodEntryUrl+`?${queryString}`)
      if (!response.ok){
        throw new Error("Failed to Fetch data")
      }
      this.foodEntries = await response.json()

    } catch (error) {
      console.error("Failed to fetch: ", error.message)
    }
  }

  getBreakdown() {
    let breakdown = {}
    for (const foodEntry of this.foodEntries) {
      for (const key in foodEntry.nutrients) {
        if (breakdown.hasOwnProperty(key)) {
          breakdown[key] += foodEntry.nutrients[key]
        } else {
          breakdown[key] = foodEntry.nutrients[key]
        }
      }
    }
    return breakdown
  }

}

module.exports = NutrientBreakdown