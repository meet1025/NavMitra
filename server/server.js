const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("NavMitra Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`NavMitra server running on port ${PORT}`);
});