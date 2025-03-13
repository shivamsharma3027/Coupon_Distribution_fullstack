const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const couponRoutes = require("./routes/couponRoutes");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", couponRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));