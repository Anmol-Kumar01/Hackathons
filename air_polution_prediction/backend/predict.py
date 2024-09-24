import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import pickle

# Load the saved model
model = load_model('model.h5')

# Load the scaler (if it was saved using pickle)
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Define user input


# Scale the input data (same way as during training)
def predictAQI(user_input):
    user_input_scaled = scaler.transform(user_input)

# Make predictions
    user_pred = model.predict(user_input_scaled)
    return user_pred


# Print the predicted AQI
