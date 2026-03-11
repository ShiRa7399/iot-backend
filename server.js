const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const sensorRoutes = require("./routes/sensorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api", sensorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
