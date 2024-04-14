import React, { useState, useEffect } from 'react';


const FoodItems = (props) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodData, setFoodData] = useState([]);


  const handleClick = (food) => {
    setSelectedFood(food);
  };

  const handleClose = () => {
    setSelectedFood(null);
  };

  return (
      <div className="Items">
        {foodData.map((food, index) => (
            <div className="food-item" key={index} onClick={() => handleClick(food)}>
              {food.item_name}
            </div>
        ))}

        {selectedFood && (
            <div className="modal">
              <h2>{selectedFood.item_name}</h2>
              <p>Carbs: {selectedFood.carbs}g</p>
              <p>Proteins: {selectedFood.proteins}g</p>
              <p>Fats: {selectedFood.fats}g</p>
              <button onClick={handleClose}>Close</button>
            </div>
        )}
      </div>
  );
}

export default FoodItems;