
const foodItemURL = ""

class FoodItem {

    constructor(nutrition, name, ingredients, username) {
        this.nutrition = nutrition
        this.name = name
        this.ingredients = ingredients
        this.username = username
    }

}

async function saveFoodItem(foodItem) {
    try {
        const response = await fetch(foodItemURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(foodItem)
        })
        if (!response.ok) {
            throw new Error("Error saving food item")
        }
        let body = await response.json()
        let fi = new FoodItem(body.nutrition, body.name, body.ingredients, body.userId)
        fi.id = body.id
        return fi
    }
    catch (err) {
        console.error(err.message)
    }
}

async function deleteFoodItem(foodItem) {
    try {
        const response = await fetch(foodItemURL+`/${foodItem.id}`, {
            method : "DELETE"
        })
        if (!response.ok) {
            throw new Error("Error deleting food item")
        }
    }
    catch (err) {
        console.error(err.message)
    }
} 

async function getFoodItem(query) {
    try {
        const response = await fetch(foodItemURL+`?${new URLSearchParams(query).toString()}`)
        if (!response.ok) {
            throw new Error("Error getting food items")
        }
        let body = await response.json()
        const fis = body.map(entry => {
            let fi = new FoodItem(entry.nutrition, entry.name, entry.ingredients, entry.userId)
            fi.id = entry.id
            return fi
        }) 
        return fis
    }
    catch (err) {
        console.error(err.message)
    }
}