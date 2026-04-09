const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");

// GET latest prediction (no device_id filter)
router.get("/latest-risk", async (req, res) => {
  try {
    console.log("Fetching latest prediction...");

    const latest = await Prediction
      .findOne()
      .sort({ timestamp: -1 })
      .lean();

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
    console.error("Error fetching prediction:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
