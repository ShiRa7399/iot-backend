const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

router.post("/run-analysis", (req, res) => {

  exec("python3 predict_sleep.py", (error, stdout, stderr) => {

    console.log("STDOUT:", stdout);
    console.log("STDERR:", stderr);

    if (error) {
      return res.status(500).json({
        error: stderr || error.message
      });
    }

    res.json({
      message: "Sleep analysis completed",
      output: stdout
    });

  });

});

module.exports = router;
