import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartArea = ({ chartData }) => {
  const labels = [];
  const datas = [];

  for (const key in chartData) {
    labels.push(key);
    datas.push(chartData[key].reduce((acc, currentValue) => acc + currentValue, 0));
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Transaction',
        data: datas,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(125, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff', 
        },
      },
      title: {
        display: true,
        text: 'Weekly Sales Data',
        color: '#fff', 
      },
    },
    scales: {
      x: {
        grid: {
          color: '#fff', 
        },
        ticks: {
          color: '#fff', 
        },
        title: {
          display: true,
          text: 'Dates',
          color: '#fff',
        },
      },
      y: {
        grid: {
          color: '#fff',
        },
        ticks: {
          color: '#fff', 
        },
        title: {
          display: true,
          text: 'Amount',
          color: '#fff',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartArea;
