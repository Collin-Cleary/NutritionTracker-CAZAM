import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

import './App.css';

var username;
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeightGraph = ({ apiUrl }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      username = localStorage.getItem('userName');
      try {
        // Fetch data from the API
        const response = await axios.get('http://localhost:5000/api/weight', {
            params: {
              userId: username
            }
        });
        const data = response.data;

        // Transform the data into a format suitable for the bar chart
        let labels = data.map(item => new Date(item.date.split("T")[0].replace(/-/g, '\/')));
        let values = data.map(item => item.value);

        const combined = labels.map((date, index) => ({
            date: date,
            value: values[index],
        }));

        combined.sort((a,b) => a.date - b.date);

        const uniqueArray = []
        const seenDates = new Set();

        for (const item of combined) {
          if(!seenDates.has(item.date.toDateString())){
            seenDates.add(item.date.toDateString())
            uniqueArray.push(item)
          }
        }

        labels = uniqueArray.map(item => item.date.toDateString())
        values = uniqueArray.map(item => item.value)

        

        const transformedData = {
          labels,
          datasets: [
            {
              label: 'My Data',
              data: values,
              backgroundColor: 'rgba(128, 128, 128, 0.6)',
              borderColor: 'rgba(128, 128, 128, 1)',
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
        text: 'Weight Chart From ' + username,
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

export default WeightGraph;
