import React,{useState} from 'react';
import './App.css';
import FoodItems from './FoodItems';
import DietTracker from './DietTracker';
import DietPlanner from './DietPlanner'

function Home(props) {
  const [username] = useState('Zaige Shi');
  const [selectedTab, setSelectedTab] = useState('FoodItems');

  let id = null;

  const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

    const renderTabContent = () => {
      switch (selectedTab) {
        case 'FoodItems':
          return <FoodItems/>;
        case 'DietTracker':
          return <DietTracker/>;
          case 'DietPlanner':
            return <DietPlanner/>;
        default:
          return null;
      }
    };

  const buttons = document.querySelectorAll("Home-nav button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const clickedButton = event.target;
      buttons.forEach((button) => {
        if (button !== clickedButton) {
          button.classList.remove("active");
        }
      });
      clickedButton.classList.add("active");
    });
  });

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