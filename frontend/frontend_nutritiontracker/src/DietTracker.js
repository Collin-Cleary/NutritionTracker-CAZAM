import React,{useState,useEffect} from 'react';
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

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('userName');
            const date = new Date().toISOString().slice(0, 10);
            const url = `http://localhost:5000/api/calorie/${username}/${date}`;
            
            try {
                const response = await axios.get(url);
                console.log(response);
                if (response.data) {
                    setConsumedCalories(response.data['intake']);
                    console.log(response.data[0]['intake']);
                    
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddFoodItem = () => {
    const username = localStorage.getItem('userName');
    const date = new Date().toISOString().slice(0, 10);
    if (selectedFood && quantity) {
        const intake = selectedFood.calories * quantity;
        setConsumedCalories(consumedCalories + intake);
        const url = `http://localhost:5000/api/calorie/${username}/${date}`;
        console.log(url);

        // 发送 GET 请求以检查数据是否存在
        axios.get(url)
            .then(response => {
                // 如果数据存在，使用 PUT 方法更新数据
                if (response.data!==null && response.data.length > 0) {
                    console.log(response.data);
                    console.log(intake);
                    setConsumedCalories(response.data[0].intake + intake);
                    axios.put(url, { intake: response.data[0].intake + intake})
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    // 如果数据不存在，使用 POST 方法创建新数据
                    axios.post('http://localhost:5000/api/calorie', { date, userId: username, intake })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
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