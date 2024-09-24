import React from "react";

function PredictionDisplay({ prediction }) {
  return (
    <div className="mt-6 p-6 bg-green-100 rounded-lg shadow-lg transform transition-all hover:scale-105">
      <h2 className="text-3xl font-bold text-green-800 mb-2 text-center">
        Prediction
      </h2>
      <p className="text-lg text-green-600 text-center">{prediction}</p>
    </div>
  );
}

export default PredictionDisplay;
