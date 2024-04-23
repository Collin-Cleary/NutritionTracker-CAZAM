import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function WeightTracker({ weight, setWeight }) {
    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('userName');
            const date = new Date().toISOString().slice(0, 10);
            const url = `http://localhost:5000/api/weight/${username}/${date}`;

            try {
                const response = await axios.get(url);
                if (response.data) {
                    console.log('Response:', response.data.value);
                    setWeight(response.data.value);
                    
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const updateWeight = async (weight) => {
        const username = localStorage.getItem('userName');
        const date = new Date().toISOString().slice(0, 10);
        const url = `http://localhost:5000/api/weight/${username}/${date}`;

        try {
            const response = await axios.get(url);
            if (response.data !== null) {
                setWeight(weight);
                await axios.put(url, { value:weight });
            } else {
                setWeight(weight);
                
                console.log('Username:', username);
                console.log('Date:', date);
                await axios.post('http://localhost:5000/api/weight', { date, userId: username, value:weight });
            }
        } catch (error) {
            console.log('Error updating weight:', error);
        }
    };

    return (
        <div className='Tracker'>
            <h2>Weight Tracker</h2>
            <p>Current weight: {weight} kg</p>
            <input type='number' placeholder='Enter your weight' onChange={(e) => setWeight(e.target.value)} />
            <button type='button' onClick={() => updateWeight(weight)}>Update weight</button>
        </div>
    );
}

export default WeightTracker;