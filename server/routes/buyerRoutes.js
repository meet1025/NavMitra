const Product = require("../models/Product");

const express = require("express");
const BuyerProfile = require("../models/BuyerProfile");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/profile",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const existingProfile = await BuyerProfile.findOne({
                userId: req.user.userId
            });

            if (existingProfile) {
                return res.status(400).json({
                    message: "Buyer profile already exists."
                });
            }

            const profile = await BuyerProfile.create({
                userId: req.user.userId,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                district: req.body.district,
                state: req.body.state,
                buyerType: req.body.buyerType,
                organizationName: req.body.organizationName
            });

            res.status(201).json({
                message: "Buyer profile created successfully.",
                profile
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

router.get(
    "/profile",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const profile = await BuyerProfile.findOne({
                userId: req.user.userId
            });

            if (!profile) {
                return res.status(404).json({
                    message: "Buyer profile not found."
                });
            }

            res.status(200).json({
                message: "Buyer profile fetched successfully.",
                profile
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);


// STEP 3 — UPDATE BUYER PROFILE
router.put(
    "/profile",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const profile = await BuyerProfile.findOneAndUpdate(
                { userId: req.user.userId },
                {
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    district: req.body.district,
                    state: req.body.state,
                    buyerType: req.body.buyerType,
                    organizationName: req.body.organizationName
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );

            if (!profile) {
                return res.status(404).json({
                    message: "Buyer profile not found."
                });
            }

            res.status(200).json({
                message: "Buyer profile updated successfully.",
                profile
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

// BROWSE AVAILABLE PRODUCTS (BUYERS ONLY)
router.get(
    "/products",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const products = await Product.find({
                status: "available"
            })
                .populate("farmerId", "name")
                .sort({ createdAt: -1 });

            res.status(200).json({
                message: "Available products fetched successfully.",
                products
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

module.exports = router;