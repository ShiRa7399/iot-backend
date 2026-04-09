const express = require("express");
const router = express.Router();

const Prediction = require("../models/Prediction");

// get latest prediction
router.get("/get-prediction", async (req, res) => {
  try {

    const latest = await Prediction
      .findOne({ device_id: "esp32_01" })
      .sort({ timestamp: -1 });

    if (!latest) {
      return res.json({ status: "No prediction yet" });
    }

    res.json({
      status: latest.status
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const SensorData = require("../models/SensorData");

router.post("/sensor-data", async (req, res) => {

  try {
    console.log("API HIT 🔥");
    console.log("Body:", req.body);

    res.send("received");
    const sensor = new SensorData(req.body);

    await sensor.save();

    res.json({
      status: "stored"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
