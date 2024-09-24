from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from predict import predictAQI

app = Flask(__name__)
CORS(app)  # To enable cross-origin requests from the Vite frontend



@app.route('/predict', methods=['GET', 'POST'])
def predict_api():
    try:
        # Get the input data from the request (JSON format)
        data = request.get_json()
        print("Received data:", data)  # Debugging print
        
        # Create a DataFrame from the input data
        user_input = pd.DataFrame(data)
        print("Input DataFrame:\n", user_input)  # Debugging print
        
        # Call the predict function with user input
        prediction = predictAQI(user_input)

        # Extract the scalar prediction value
        prediction_value = float(prediction[0][0])  # Convert to Python float
        print("Prediction:", prediction_value)  # Debugging print

        # Send prediction response to the frontend
        return jsonify({'prediction': prediction_value})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
