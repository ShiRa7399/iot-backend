require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ❗ disable buffering
mongoose.set('bufferCommands', false);

// routes
const sensorRoutes = require("./routes/sensorRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const mlRoutes = require("./routes/mlRoutes");

// connect DB FIRST
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // ONLY AFTER DB CONNECTS → use routes
    app.use("/api", sensorRoutes);
    app.use("/api", predictionRoutes);
    app.use("/api", mlRoutes);

    app.get("/", (req, res) => {
      res.send("Backend Running");
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("DB connection failed:", err);
  }
};

startServer();
