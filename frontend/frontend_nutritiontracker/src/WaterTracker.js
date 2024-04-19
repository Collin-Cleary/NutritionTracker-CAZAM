import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function WaterTracker({ waterIntake, setWaterIntake }) {
    const waterData = [
        { name: 'Water', amount: 250 },
        { name: 'Juice', amount: 110 },
        { name: 'Milk', amount: 150 },
        { name: 'Tea', amount: 500 },
        { name: 'Coffee', amount: 0 },
        { name: 'Soda', amount: 150 },
        { name: 'Beer', amount: 330 },
        { name: 'Wine', amount: 100 },
        { name: 'Whiskey', amount: 0 },
        { name: 'Vodka', amount: 0 },
    ];
    const [goal] = useState(2000);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('userName');
            const date = new Date().toISOString().slice(0, 10);
            const url = `http://localhost:5000/api/water/${username}/${date}`;

            try {
                const response = await axios.get(url);
                if (response.data) {
                    console.log(response);
                    setWaterIntake(response.data.amount);
                    console.log('Water intake:', response.data.amount);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const updateWaterIntake = async (amount) => {
        const username = localStorage.getItem('userName');
        const date = new Date().toISOString().slice(0, 10);
        const url = `http://localhost:5000/api/water/${username}/${date}`;
    
        try {
            const response = await axios.get(url);
            if (response.data !== null ) {
                const updatedAmount = response.data.amount + amount;
                console.log('Updated water intake:', updatedAmount);
                setWaterIntake(updatedAmount);
                await axios.put(url, { amount: updatedAmount });
            } else {
                setWaterIntake(amount);
                await axios.post('http://localhost:5000/api/water', { date, userId: username, amount });
            }
        }   catch (error) { 
            console.log('Error updating water intake:', error);
        }
    };

    const handleAddDrink = async () => {
        if (selectedDrink && quantity) {
            const amount = selectedDrink.amount * quantity;
            await updateWaterIntake(amount);
        }
    };

    const progress = Math.round((waterIntake / goal) * 100);

    return (
        <div className='WaterTracker'>
            <h2>Water Tracker</h2>
            <div className='Progress'>
                <div
                    className='ProgressBar'
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p>
                {waterIntake} ml / {goal} ml
            </p>
            
            <select onChange={(e) => setSelectedDrink(waterData[e.target.value])}>
                <option value="" disabled selected>Select a drink</option>
                {waterData.map((drink, index) => (
                    <option key={index} value={index}>
                        {drink.name}( {drink.amount} ml)
                    </option>
                ))}
            </select>
            <input
                type='number'
                placeholder='Quantity'
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleAddDrink}>Add Drink</button>
        </div>

    );
}

export default WaterTracker;

