import React, { useState } from 'react';
import axios from "axios";
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';


import './App.css';

function DietPlanner() {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [dietType, setDietType] = useState('');
    const [healthConditions, setHealthConditions] = useState('');
    const [misc, setMisc] = useState('');
    const [dietPlan, setDietPlan] = useState('');

    const handleGeneratePlan = async () => {
        // Call ChatGPT to generate diet plan based on user inputs
        const dietPlanResponse = await generateDietPlan(currentWeight, goalWeight, dietType, healthConditions, misc);
        setDietPlan(dietPlanResponse.dietPlan);
        console.log('dietPlan type:', typeof dietPlanResponse.dietPlan);
        console.log('dietPlan length:', dietPlanResponse.dietPlan.length);
        console.log('dietPlan:', dietPlanResponse.dietPlan);
        savePDF(dietPlanResponse.dietPlan);
    };

    const generateDietPlan = async (_currentWeight, _goalWeight, _dietType, _healthConditions, _misc) => {
        try {
            const response = await axios.post('http://localhost:5000/gpt/generateDiet', {
                currentWeight: _currentWeight, 
                goalWeight:_goalWeight, 
                dietType: _dietType, 
                healthConditions: _healthConditions, 
                misc: _misc
            });
            return response.data; // Assuming the response contains the generated diet plan
        } catch (error) {
            console.error('Error generating diet plan:', error);
        }
    };

    const savePDF = (text) => {
        const doc = new jsPDF();
        
        // Try different coordinates if necessary
        doc.text(text, 10, 20); // Changed y-coordinate to 20
        
        doc.save('diet_plan.pdf');
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
            <div className="input-section">
                <label>Health Conditions:</label>
                <input type="text" value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)} />
            </div>
            <div className="input-section">
                <label>Misc:</label>
                <input type="text" value={misc} onChange={(e) => setMisc(e.target.value)} />
            </div>
            <button onClick={handleGeneratePlan}>Generate Diet Plan</button>
        </div>
    );
}

export default DietPlanner;
