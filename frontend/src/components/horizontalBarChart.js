import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const horizontalBarChart = ({userData}) => {
    const data = {
        labels: userData.map(user => user.name),
        datasets: [
          {
            label: 'Active',
            data: userData.map(user => user.active),
            backgroundColor: '#82ca9d',
            borderWidth: 1,
            barThickness: 20,
          },
          {
            label: 'Completion Pending',
            data: userData.map(user => user.pending),
            backgroundColor: '#d0e7ff',
            borderWidth: 1,
            barThickness: 20,
          },
        ],
      };
    
    const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
        x: {
        beginAtZero: true,
        stacked: true,
        },
        y: {
        stacked: true,
        },
    },
    plugins: {
        legend: {
        position: 'top',
        },
        tooltip: {
        mode: 'index',
        intersect: false,
        },
    },
    };

    return <Bar data={data} options={options} />;
};

  
export default horizontalBarChart;






