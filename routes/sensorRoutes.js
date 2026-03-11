const express = require("express");
const router = express.Router();

const SensorData = require("../models/SensorData");

router.post("/sensor-data", async (req, res) => {

  try {

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