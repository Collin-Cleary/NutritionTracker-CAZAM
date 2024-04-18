import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

import './App.css';

var username;
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WaterGraph = ({ apiUrl }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      username = localStorage.getItem('userName');
      try {
        // Fetch data from the API
        const response = await axios.get('http://localhost:5000/api/water', {
            params: {
              userId: username
            }
        });
        const data = response.data;

        // Transform the data into a format suitable for the bar chart
        let labels = data.map(item => new Date(item.date.split("T")[0].replace(/-/g, '\/')));
        let values = data.map(item => item.amount);

        const combined = labels.map((date, index) => ({
            date: date,
            value: values[index],
        }));

        combined.sort((a,b) => a.date - b.date);

        const dateValueMap = new Map();

        for (const item of combined) {
          const date = item.date.getTime();
          const value = item.value;
          if (dateValueMap.has(date)) {
            dateValueMap.set(date, dateValueMap.get(date) + value);
          } else {
            dateValueMap.set(date, value);
          }
        }

        const uniqueArray = Array.from(dateValueMap).map(([date, value]) => ({
          date: new Date(date),
          value: value,
        }));

        labels = uniqueArray.map(item => item.date.toDateString())
        values = uniqueArray.map(item => item.value)

        

        const transformedData = {
          labels,
          datasets: [
            {
              label: 'My Data',
              data: values,
              backgroundColor: 'rgba(144, 238, 144, 0.6)',
              borderColor: 'rgba(144, 238, 144, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(transformedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Options for the bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'water intake Chart from ' + username,
      },
    },
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  // Render the bar chart using the data from the API
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WaterGraph;
