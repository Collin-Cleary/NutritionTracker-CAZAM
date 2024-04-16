import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const FoodItems = (props) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const storedFoodData = localStorage.getItem('foodData');

    if (storedFoodData) {
      setFoodData(JSON.parse(storedFoodData));
    } else {
      axios.get(`${baseUrl}/items`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            if (response.status === 200) {
              const data = response.data;
              setFoodData(data);

              localStorage.setItem('foodData', JSON.stringify(data));
            } else {
              console.log('Get Food items failed.');
            }
          })
          .catch(error => {
            console.log(`Error fetching data from the server: `, error);
          });
    }
  }, []);

  const handleClick = (food) => {
    setSelectedFood(food);
  };

  const handleClose = () => {
    setSelectedFood(null);
  };

  return (
      <div className="Items">
        {foodData.map((food, index) => (
            <div className="food-item" key={index} onClick={() => handleClick(food)} onKeyDown={this.handleKeyDown}>
              {food.item_name}
            </div>
        ))}

        {selectedFood && (
            <div className="modal">
              <h2>{selectedFood.item_name}</h2>
              <p>Carbs: {selectedFood.carbs}g</p>
              <p>Proteins: {selectedFood.proteins}g</p>
              <p>Fats: {selectedFood.fats}g</p>
              <p>Vitamins: {selectedFood.vitamins}</p>
              <button onClick={handleClose}>Close</button>
            </div>
        )}
      </div>
  );
}

export default FoodItems;