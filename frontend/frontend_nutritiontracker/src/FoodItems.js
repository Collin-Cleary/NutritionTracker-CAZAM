import React, { useState, useEffect } from 'react';
import FoodSearch from './databaseFetcher';

const FoodItems = (props) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [currentSearch, newSearch] = useState(new FoodSearch)
  const [searchTerms, setSearchTerms] = useState("")  
  const [currentList, setList] = useState([])
  const [servingAmount, setAmount] = useState(0)

  useEffect(() => {
  }, []);

  const handleClick = (food) => {
    setSelectedFood(food);
  };

  const handleClose = () => {
    setSelectedFood(null);
  };


  const handleSearchFoodItem = async () => {
    await currentSearch.fetchForData(searchTerms)
  }

  const handleSaveToAccount = async () => {
    try {
      Object.entries(selectedFood.nutrients).forEach(([key, value]) => {
        selectedFood.nutrients[key] *= servingAmount;
      })
      const response = await fetch(`http://localhost:5000/api/fooditem`, {
        method: "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify({
          nutrition : selectedFood.nutrients,
          name : selectedFood.name,
          ingredients : selectedFood.name,
          userId : localStorage.getItem('userName')
        })
      })
      if (!response.ok){
        throw new Error("Failed to Fetch data")
      }
      handleClose()
    } catch (error) {
      console.error("Failed to fetch: ", error.message)
    }
  }

  return (
      <div className="Items">
        <div>
          <input type="text" placeholder='Search for Foods' onChange={(e) => setSearchTerms(e.target.value)}/>
          <button onClick={(e) => {handleSearchFoodItem(); setList(currentSearch.foods)}}>search</button>
        </div>
        {currentList.map((food, index) => (
            <div className="food-item" key={index} value={index} onClick={(e) => handleClick(food)}>
              {food.name}
            </div>
        ))}
        {selectedFood && (
            <div className="modal">
              <h2>{selectedFood.name}</h2>
              <p>Carbs: {selectedFood.nutrients.Carbohydrates}g</p>
              <p>Proteins: {selectedFood.nutrients.Protein}g</p>
              <p>Fats: {selectedFood.nutrients.Fats}g</p>
              <p>Calories: {selectedFood.nutrients.Calories}</p>
              <p>Per {selectedFood.serving_size}</p>
              <button onClick={handleClose}>Close</button>
              <input type="number" placeholder='Amount' onChange={(e) => setAmount(e.target.value)}/>
              <button onClick={handleSaveToAccount}>Add</button>
            </div>
        )}
      </div>
  );
}

export default FoodItems;