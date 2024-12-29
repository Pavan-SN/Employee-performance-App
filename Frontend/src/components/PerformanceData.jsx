

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PerformanceData({ data }) {
 
  const calculateMean = (values) => {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  };

  const calculateStandardDeviation = (values, mean) => {
    const variance = values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };

  const percentages = Object.values(data);
  const mean = calculateMean(percentages);
  const stdDev = calculateStandardDeviation(percentages, mean);
  const safeStdDev = stdDev === 0 ? 1 : stdDev;

  const generateBellCurveData = () => {
    const curveData = [];
    const range = 100;

    for (let i = 0; i <= range; i++) {
      const x = (i - mean) / safeStdDev; 
      const y = Math.exp(-0.5 * x * x) / (safeStdDev * Math.sqrt(2 * Math.PI)); 
      curveData.push({ x: i, y });
    }
    return curveData;
  };

  const bellCurveData = generateBellCurveData();

  const chartData = {
    labels: bellCurveData.map(point => point.x),
    datasets: [
      {
        label: 'Bell Curve (Normal Distribution)',
        data: bellCurveData.map(point => point.y),
        fill: false,
        borderColor: 'rgb(132, 117, 214)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bell Curve of Performance Data',
      },
    },
  };

  return (
    <div>
      <h2>Actual Performance Percentages</h2>
      <table>
        <thead>
          <tr>
            <th>Rating Category</th>
            <th>Actual Percentage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((category) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{data[category]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: '600px', height: '400px', marginTop: '20px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default PerformanceData;


