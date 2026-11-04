const express = require("express");
const cors = require("cors");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing from environment variables");
    process.exit(1);
}

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

// Start server only after successful database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`NavMitra server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();