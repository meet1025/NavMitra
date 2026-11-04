
const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const User = require("../models/User");
const FarmerProfile = require("../models/FarmerProfile");
const BuyerProfile = require("../models/BuyerProfile");
const Product = require("../models/Product");

const router = express.Router();

// All routes require an authenticated Admin
router.use(authMiddleware, roleMiddleware("admin"));

// Farmer Report
router.get("/farmers", async (req, res) => {
    try {
        const farmers = await User.find({ role: "farmer" })
            .select("-password")
            .lean();

        const profiles = await FarmerProfile.find().lean();

        const profileMap = new Map(
            profiles.map(profile => [profile.userId.toString(), profile])
        );

        const report = farmers.map(farmer => ({
            ...farmer,
            profile: profileMap.get(farmer._id.toString()) || null
        }));

        res.json({ count: report.length, farmers: report });

    } catch (error) {
        console.error("Farmer report error:", error.message);
        res.status(500).json({ message: "Unable to generate farmer report." });
    }
});

// Buyer Report
router.get("/buyers", async (req, res) => {
    try {
        const buyers = await User.find({ role: "buyer" })
            .select("-password")
            .lean();

        const profiles = await BuyerProfile.find().lean();

        const profileMap = new Map(
            profiles.map(profile => [profile.userId.toString(), profile])
        );

        const report = buyers.map(buyer => ({
            ...buyer,
            profile: profileMap.get(buyer._id.toString()) || null
        }));

        res.json({ count: report.length, buyers: report });

    } catch (error) {
        console.error("Buyer report error:", error.message);
        res.status(500).json({ message: "Unable to generate buyer report." });
    }
});

// Product Listing Report
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
            .populate("farmerId", "name email")
            .sort({ createdAt: -1 })
            .lean();

        res.json({ count: products.length, products });

    } catch (error) {
        console.error("Product report error:", error.message);
        res.status(500).json({ message: "Unable to generate product report." });
    }
});

module.exports = router;
