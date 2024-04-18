import React, { useState } from 'react';
import './App.css';
import FoodItems from './FoodItems';
import DietTracker from './DietTracker';
import WaterTracker from './WaterTracker';

function Home(props) {
  const [username] = useState('Zaige Shi');
  const [selectedTab, setSelectedTab] = useState('FoodItems');
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'FoodItems':
        return <FoodItems />;
      case 'WaterTracker':
        return <WaterTracker waterIntake={waterIntake} setWaterIntake={setWaterIntake} />;
      case 'DietTracker':
        return <DietTracker consumedCalories={consumedCalories} setConsumedCalories={setConsumedCalories} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h2 className='User-head'>
        Logged User: {username}
      </h2>
      <nav className='Home-nav'>
        <button type="button" onClick={() => handleTabChange('FoodItems')}>
          Food/Meal Items
        </button>
        <button type="button" onClick={() => handleTabChange('DietTracker')}>
          Diet Tracker
        </button>
        <button type="button" onClick={() => handleTabChange('WaterTracker')}>
          Water Tracker
        </button>
        <button type="button" onClick={() => handleTabChange('DietGoals')}>
          Diet Goals
        </button>
        <button type="button" onClick={() => handleTabChange('DietPlanner')}>
          Diet Planner
        </button>
      </nav>
      <main>{renderTabContent()}</main>
    </div>
  );
}

export default Home;
