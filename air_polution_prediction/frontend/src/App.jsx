import React, { useState } from 'react';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [inputData, setInputData] = useState({
    'PM2.5': 81,
    PM10: 124,
    NO: 1.44,
    NO2: 20,
    NOx: 12,
    NH3: 1000,
    CO: 0.1,
    SO2: 15,
    O3: 127,
    Benzene: 0.20,
    Toluene: 6,
    Xylene: 0.06
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([inputData]), // Send inputData as an array of objects
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  return (
    <div>
      <h1>Air Quality Prediction</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(inputData).map((key) => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type="number"
              name={key}
              value={inputData[key]}
              onChange={handleChange}
              step="any"
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
}

export default App;
