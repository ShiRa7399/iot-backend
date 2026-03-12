const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

// Run ML model
router.post("/run-model", (req, res) => {

  exec("python3 ml/run_model.py", (error, stdout, stderr) => {

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.json({
      status: "ML model executed",
      output: stdout
    });

  });

});

module.exports = router;
