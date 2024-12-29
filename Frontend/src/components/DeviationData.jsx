import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DeviationData({ data }) {
  if (Object.keys(data).length === 0) {
    return <p>Loading deviation data...</p>;
  }

  const calculateMean = (data) => {
    const sum = Object.values(data).reduce((acc, value) => acc + parseFloat(value), 0);
    return sum / Object.values(data).length;
  };

  const calculateStandardDeviation = (data, mean) => {
    const variance = Object.values(data).reduce((acc, value) => {
      const deviation = parseFloat(value) - mean;
      return acc + Math.pow(deviation, 2);
    }, 0);
    return Math.sqrt(variance / Object.values(data).length);
  };

  const mean = calculateMean(data);
  const standardDeviation = calculateStandardDeviation(data, mean);

  const xValues = [];
  for (let i = mean - 3 * standardDeviation; i <= mean + 3 * standardDeviation; i += 0.1) {
    xValues.push(i.toFixed(2));
  }

  const yValues = xValues.map((x) => {
    const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(standardDeviation, 2)));
    return (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * exponent;
  });

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: "Bell Curve",
        data: yValues,
        fill: false,
        borderColor: 'rgb(132, 117, 214)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Deviation from Standard percentages </h2>
      <Line data={chartData} />
    </div>
  );
}

export default DeviationData;

