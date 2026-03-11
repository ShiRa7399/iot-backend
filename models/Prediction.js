
const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({

  risk: String,

  created_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Prediction", PredictionSchema);
