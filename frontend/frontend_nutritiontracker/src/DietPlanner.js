import React, { useState } from 'react';
import './App.css';

function DietPlanner() {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [dietType, setDietType] = useState('');
    const [dietPlan, setDietPlan] = useState('');

    const handleGeneratePlan = async () => {
        // Call ChatGPT to generate diet plan based on user inputs
        const dietPlanResponse = await generateDietPlan(currentWeight, goalWeight, dietType);
        setDietPlan(dietPlanResponse);
    };

    const generateDietPlan = async (currentWeight, goalWeight, dietType) => {
        // Placeholder function to call ChatGPT API and generate diet plan
        // You can replace this with your actual backend API call to ChatGPT
        // For now, just return a dummy response
        return "Dummy diet plan generated!";
    };

    return (
        <div className="diet-planner">
            <h2>Diet Planner</h2>
            <div className="input-section">
                <label>Current Weight:</label>
                <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} />
            </div>
            <div className="input-section">
                <label>Goal Weight:</label>
                <input type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} />
            </div>
            <div className="input-section">
                <label>Diet Type:</label>
                <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
                    <option value="">Select Diet Type</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <button onClick={handleGeneratePlan}>Generate Diet Plan</button>
            {dietPlan && (
                <div className="diet-plan">
                    <h3>Diet Plan:</h3>
                    <p>{dietPlan}</p>
                </div>
            )}
        </div>
    );
}

export default DietPlanner;