import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function DietTracker({ consumedCalories, setConsumedCalories }) {

  const [calorieGoal] = useState(2000);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    console.log('useEffect called');
    const fetchData = async () => {
      await fetchCaloriesData();
      await fetchFoodData();
    };
    fetchData();
    console.log('useEffect finished');
    

    
  }, []);

  const fetchCaloriesData = async () => {
    const username = localStorage.getItem('userName');
    const date = new Date().toISOString().slice(0, 10);
    const url = `http://localhost:5000/api/calorie/${username}/${date}`;
    try {
      const response = await axios.get(url);

      if (response.data) {
        setConsumedCalories(response.data[0].intake);
      }
      else {
        setConsumedCalories(0);
        await axios.post('http://localhost:5000/api/calorie', { date, userId: username, intake:0 });
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const fetchFoodData = async () => {
    const username = localStorage.getItem('userName');
    try {
      const foodResponse = await axios.get('http://localhost:5000/api/fooditem', {
        params: { userId: username }
      });
      if (foodResponse.data) {
        console.log('Food data:', foodResponse.data);
        const transformedData = foodResponse.data.map(item => ({
          name: item.name,
          calories: item.nutrition.Calories
        }));
        setFoodData(transformedData);
      }
    } catch (foodError) {
      console.log('Error fetching food data:', foodError);
    }
  };

  const updateConsumedCalories = async (intake) => {
    const username = localStorage.getItem('userName');
    const date = new Date().toISOString().slice(0, 10);
    const url = `http://localhost:5000/api/calorie/${username}/${date}`;

    try {
      const response = await axios.get(url);
      if (response.data !== null && response.data.length > 0) {
        const updatedIntake = response.data[0].intake + intake;
        setConsumedCalories(updatedIntake);
        await axios.put(url, { intake: updatedIntake });
      } else {
        setConsumedCalories(intake);
        await axios.post('http://localhost:5000/api/calorie', { date, userId: username, intake });
      }
    } catch (error) {
      console.log('Error updating consumed calories:', error);
    }
  };

  const handleAddFoodItem = async () => {
    if (selectedFood && quantity) {
      console.log('Adding food item:', selectedFood, quantity);
      const intake = selectedFood.calories * quantity;
      await updateConsumedCalories(intake);
    }
  };

  const progress = Math.round((consumedCalories / calorieGoal) * 100);
  return (
    <div className="Tracker">
      <h2>Diet Tracker</h2>
      <p>Calorie Goal: {calorieGoal} kcal</p>
      <p>Consumed Calories: {consumedCalories} kcal</p>
      <p>Progress: {progress}%</p>
      <select onChange={(e) => setSelectedFood(foodData[e.target.value])}>
        <option value="" disabled selected>Select food items</option>
        {foodData.map((item, index) => (
          <option key={index} value={index}>
            {item.name} ({item.calories} kcal)
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddFoodItem}>Add Food Item</button>
    </div>
  );
}

export default DietTracker;
