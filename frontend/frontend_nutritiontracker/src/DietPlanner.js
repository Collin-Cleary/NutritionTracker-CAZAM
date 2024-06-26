import React, { useState } from 'react';
import axios from "axios";
import { jsPDF } from 'jspdf';


import './App.css';

function DietPlanner() {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [dietType, setDietType] = useState('');
    const [healthConditions, setHealthConditions] = useState('');
    const [duration, setDuration] = useState('');
    const [misc, setMisc] = useState('');
    const [dietPlan_, setDietPlan] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);


    const handleGeneratePlan = async () => {
        setIsGenerating(true);
        // Call ChatGPT to generate diet plan based on user inputs
        try{
            const dietPlanResponse = await generateDietPlan(currentWeight, goalWeight, dietType, healthConditions, duration, misc);
            setDietPlan(dietPlanResponse.dietPlan);
            console.log('dietPlan type:', typeof dietPlan_);
            console.log('dietPlan length:', dietPlanResponse.dietPlan.length);
            console.log('dietPlan:', dietPlanResponse.dietPlan);
            savePDF(dietPlanResponse.dietPlan);
        } catch(error){
            console.error('Error generating diet plan:', error);
        } finally{
            setIsGenerating(false);
        }
    };

    const generateDietPlan = async (_currentWeight, _goalWeight, _dietType, _healthConditions, _duration, _misc) => {
        try {
            const response = await axios.post('http://localhost:5000/gpt/generateDiet', {
                currentWeight: _currentWeight, 
                goalWeight:_goalWeight, 
                dietType: _dietType, 
                healthConditions: _healthConditions,
                duration: _duration, 
                misc: _misc
            });
            return response.data;
        } catch (error) {
            console.error('Error generating diet plan:', error);
        }
    };

    const savePDF = (text) => {
        const doc = new jsPDF();
        const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
        let y = 10;
        
        textLines.forEach(line => {
            if (y > doc.internal.pageSize.height - 20) {
                doc.addPage();
                y = 10;
            }
            doc.text(line, 10, y);
            y += 10; // Increment the Y position
        });
        doc.save('diet_plan.pdf');
    };
    

    return (
        <div className="diet-planner">
            <h2>Diet Planner</h2>
            <div className="input-section">
                <label>Current Weight (lbs):</label>
                <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} />
            </div>
            <div className="input-section">
                <label>Goal Weight (lbs):</label>
                <input type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} />
            </div>
            <div className="input-section">
                <label>Diet Type:</label>
                <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
                    <option value=""></option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                </select>
            </div>
            <div className="input-section">
                <label>
                    Health Conditions:
                    <input type="text" value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)} />
                </label>
            </div>
            <div className="input-section">
                <label>
                    Duration (in weeks):
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </label>
            </div>
            <div className="input-section">
                <label>
                    Additional inputs:
                    <input type="text" value={misc} onChange={(e) => setMisc(e.target.value)} />
                </label>
                
            </div>
            <button disabled={isGenerating} onClick={handleGeneratePlan}>
                {isGenerating ? 'Generating...' : 'Generate Diet Plan'}
            </button>
        </div>
    );
}

export default DietPlanner;
