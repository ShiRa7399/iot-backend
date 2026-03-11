from pymongo import MongoClient
import pandas as pd
import joblib
from datetime import datetime

# connect to MongoDB
client = MongoClient("YOUR_MONGODB_CONNECTION_STRING")

db = client["iotdb"]

sensor_collection = db["sensordatas"]
prediction_collection = db["predictions"]

# load trained model
model = joblib.load("sleep_apnea_model.pkl")

# get ALL sensor data uploaded by ESP32
data_cursor = sensor_collection.find({"device_id": "esp32_01"})

data_list = list(data_cursor)

if len(data_list) == 0:
    print("No sensor data found")
    exit()

# convert to dataframe
df = pd.DataFrame(data_list)

# select features used in training
X = df[['audio','ax','ay','az']]

# run ML prediction
predictions = model.predict(X)

df['Prediction'] = predictions

# calculate apnea events
apnea_events = df['Prediction'].sum()
total_samples = len(df)

apnea_ratio = apnea_events / total_samples

# determine risk
if apnea_ratio > 0.2:
    status = "Apnea Risk Detected"
else:
    status = "Normal Sleep"

# save final prediction to database
result = {
    "device_id": "esp32_01",
    "status": status,
    "apnea_events": int(apnea_events),
    "total_samples": int(total_samples),
    "apnea_ratio": float(apnea_ratio),
    "timestamp": datetime.utcnow()
}

prediction_collection.insert_one(result)

print("Prediction saved:", status)