const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

router.post("/run-analysis", (req, res) => {

  exec("python predict_sleep.py", (error, stdout, stderr) => {

    if (error) {
      console.error(stderr);
      return res.status(500).json({ error: "ML execution failed" });
    }

    res.json({
      message: "Sleep analysis completed",
      output: stdout
    });

  });

});

module.exports = router;
