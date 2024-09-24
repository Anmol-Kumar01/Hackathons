import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { FaSpinner } from "react-icons/fa";
import InputField from "./components/InputField";
import PredictionDisplay from "./components/PredictionDisplay";
import { fetchPrediction } from "./utils/api";

function App() {
  const [prediction, setPrediction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [inputData, setInputData] = useState({
    "PM2.5": 81,
    PM10: 124,
    NO: 1.44,
    NO2: 20,
    NOx: 12,
    NH3: 1000,
    CO: 0.1,
    SO2: 15,
    O3: 127,
    Benzene: 0.2,
    Toluene: 6,
    Xylene: 0.06,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchPrediction(inputData);
      setPrediction(data.prediction);
      enqueueSnackbar("Prediction fetched successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error fetching prediction:", error);
      enqueueSnackbar("Failed to fetch prediction.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Air Quality Prediction
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {Object.keys(inputData).map((key) => (
            <InputField
              key={key}
              label={key}
              value={inputData[key]}
              onChange={handleChange}
            />
          ))}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Loading...
              </>
            ) : (
              "Predict"
            )}
          </button>
        </form>

        {prediction && (
          <div className="mt-8">
            <PredictionDisplay prediction={prediction} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
