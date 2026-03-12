const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.get("/prediction", (req, res) => {

  const python = spawn("python3", ["ml/run_model.py"]);

  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  python.on("close", () => {

    res.json({
      risk: result.trim()
    });

  });

});

module.exports = router;
