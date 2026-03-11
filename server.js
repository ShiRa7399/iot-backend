const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const sensorRoutes = require("./routes/sensorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/iotdb")
.then(() => console.log("MongoDB connected"));

app.use("/api", sensorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});