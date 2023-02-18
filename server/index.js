const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors=require("cors");

const dotenv = require("dotenv");

dotenv.config();
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
mongoose.set('strictQuery', true);

try {
  mongoose.connect(process.env.MONGO_URI);  
  console.log("DB Connected");
} catch (err) {
  console.log(err);
}

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Backend Server running ");
});
