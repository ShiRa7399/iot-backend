const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  device_id: String,
  status: String,
  apnea_events: Number,
  total_samples: Number,
  apnea_ratio: Number,
  timestamp: Date
});

module.exports = mongoose.model("Prediction", predictionSchema);
