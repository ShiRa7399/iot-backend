const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");

router.get("/latest-risk", async (req, res) => {

  try {

    const latest = await Prediction
      .findOne({ device_id: "esp32_01" })
      .sort({ timestamp: -1 });

    if (!latest) {
      return res.json({ status: "No prediction yet" });
    }

    res.json({
      status: latest.status,
      apnea_events: latest.apnea_events,
      total_samples: latest.total_samples,
      apnea_ratio: latest.apnea_ratio
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;
