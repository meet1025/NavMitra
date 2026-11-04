const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware must come before the API routes
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("NavMitra Backend is running...");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/admin", adminRoutes);

// Start database connection and server
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`NavMitra server running on port ${PORT}`);
});
