const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// import routes
const sensorRoutes = require("./routes/sensorRoutes");

// use routes
app.use("/api", sensorRoutes);

// homepage message
app.get("/", (req, res) => {
  res.send("Sleep Apnea Monitoring Backend is Running");
});

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
