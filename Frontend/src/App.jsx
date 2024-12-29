
import React, { useEffect, useState } from "react";
import axios from "axios";
import PerformanceData from "./components/PerformanceData";
import DeviationData from "./components/DeviationData";
import './App.css'; 

function App() {
  const [actualData, setActualData] = useState({});
  const [deviationData, setDeviationData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/performance/percentages")
      .then((response) => {
        setActualData(response.data);
      })
      .catch((err) => {
        setError("Error fetching actual data");
        console.error(err);
      });
  }, []); 


  useEffect(() => {
    if (Object.keys(actualData).length === 0) return; 

    axios
      .get("http://localhost:8080/performance/adjustments")
      .then((response) => {
        const adjustments = response.data;

        const adjustedData = {};

        adjustments.forEach((adjustment) => {
          const match = adjustment.match(/Adjust category (\w) by (-?\d+(\.\d+)?)%/);

          if (match) {
            const category = match[1];
            const adjustmentValue = parseFloat(match[2]);

            adjustedData[category] = (actualData[category] || 0) + adjustmentValue;
          }
        });

        setDeviationData(adjustedData);
      })
      .catch((err) => {
        setError("Error fetching deviation data");
        console.error(err);
      });
  }, [actualData]);

  if (!Object.keys(actualData).length || !Object.keys(deviationData).length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Bell-Curve for Employee's Performance</h1>
      {error && <p>{error}</p>}
      <PerformanceData data={actualData} />
      <DeviationData data={deviationData} />
    </div>
  );
}

export default App;

