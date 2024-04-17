import React,{useState} from 'react';
import './App.css';
import axios from 'axios';


function DietTracker() {
    const foodData = [
        { name: 'Apple', calories: 104 },
        { name: 'Banana', calories: 112},
        { name: 'Chicken Breast', calories: 145.6 },
        { name: 'Broccoli', calories: 34 },
        { name: 'Quinoa', calories: 102.2 },
        { name: 'Almonds', calories: 511 },
        { name: 'Tofu', calories: 70 },
        { name: 'Salmon', calories: 152 },
        { name: 'Eggs', calories: 65 },
        { name: 'Brown Rice', calories: 230.4 },
      ];
    const [calorieGoal] = useState(2000);
    const [consumedCalories, setConsumedCalories] = useState(0);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleAddFoodItem  = () => {
        const username = localStorage.getItem('userName');
        const date = new Date().toISOString().slice(0, 10);
        if (selectedFood && quantity) {
            setConsumedCalories(consumedCalories + selectedFood.calories * quantity);
            axios.post('http://localhost:5000/api/calorie', {date, userId: username, intake:consumedCalories}).then
            (response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });  
          }          
    };

    const progress = Math.round((consumedCalories / calorieGoal) * 100);
        return (
        <div className="Tracker">
            <h1>Diet Tracker</h1>
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