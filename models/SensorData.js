const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({

  device_id: String,

  accel_diff: Number,

  gyro_diff: Number,

  mic_diff: Number,

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("SensorData", SensorSchema);