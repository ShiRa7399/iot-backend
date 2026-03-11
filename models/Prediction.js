const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({

  device_id: String,

  prediction: String,

  confidence: Number,

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Prediction", PredictionSchema);