const express = require("express");
const mongoose = require("mongoose");
mongoose.set('bufferCommands', false);

const app = express();

app.use(express.json());

// import routes
const sensorRoutes = require("./routes/sensorRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const mlRoutes = require("./routes/mlRoutes");


// use routes
app.use("/api", sensorRoutes);
app.use("/api", predictionRoutes);
app.use("/api", mlRoutes);

// homepage message
app.get("/", (req, res) => {
  res.send("Sleep Apnea Monitoring Backend is Running");
});

// connect mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
