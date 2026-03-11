const express = require("express");
const router = express.Router();

const Prediction = require("../models/Prediction");

// POST prediction
router.post("/prediction", async (req, res) => {

  try {

    const pred = new Prediction(req.body);

    await pred.save();

    res.json({
      status: "stored"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// GET latest prediction
router.get("/prediction", async (req, res) => {

  try {

    const latest = await Prediction.findOne().sort({ created_at: -1 });

    res.json({
      risk: latest.risk
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;
