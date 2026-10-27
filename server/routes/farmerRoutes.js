const express = require("express");

// Farmer profile model
const FarmerProfile = require("../models/FarmerProfile");

// Product model
const Product = require("../models/Product");

// Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Role-based access middleware
const roleMiddleware = require("../middleware/roleMiddleware");


// Create Express router
const router = express.Router();



// FARMER PROFILE
// STEP 1 — CREATE FARMER PROFILE
router.post(
    "/profile",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const existingProfile = await FarmerProfile.findOne({
                userId: req.user.userId
            });

            if (existingProfile) {
                return res.status(400).json({
                    message: "Farmer profile already exists."
                });
            }

            const profile = await FarmerProfile.create({
                userId: req.user.userId,
                phone: req.body.phone,
                address: req.body.address,
                village: req.body.village,
                district: req.body.district,
                state: req.body.state,
                farmingType: req.body.farmingType
            });

            res.status(201).json({
                message: "Farmer profile created successfully.",
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

// STEP 2 — GET FARMER PROFILE
router.get(
    "/profile",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const profile = await FarmerProfile.findOne({
                userId: req.user.userId
            });

            if (!profile) {
                return res.status(404).json({
                    message: "Farmer profile not found."
                });
            }

            res.status(200).json({
                message: "Farmer profile fetched successfully.",
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


 // STEP 2B — UPDATE FARMER PROFILE
router.put(
    "/profile",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const profile = await FarmerProfile.findOneAndUpdate(
                { userId: req.user.userId },
                {
                    phone: req.body.phone,
                    address: req.body.address,
                    village: req.body.village,
                    district: req.body.district,
                    state: req.body.state,
                    farmingType: req.body.farmingType
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!profile) {
                return res.status(404).json({
                    message: "Farmer profile not found."
                });
            }

            res.status(200).json({
                message: "Farmer profile updated successfully.",
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

// FARMER PRODUCT MANAGEMENT
// STEP 3 — CREATE PRODUCT
router.post(
    "/products",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const product = await Product.create({
                farmerId: req.user.userId,
                name: req.body.name,
                category: req.body.category,
                quantity: req.body.quantity,
                unit: req.body.unit,
                pricePerUnit: req.body.pricePerUnit,
                description: req.body.description
            });

            res.status(201).json({
                message: "Product created successfully.",
                product
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

// STEP 4 — GET FARMER'S PRODUCTS
router.get(
    "/products",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const products = await Product.find({
                farmerId: req.user.userId
            }).sort({ createdAt: -1 });

            res.status(200).json({
                message: "Farmer products fetched successfully.",
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

// STEP 5 — UPDATE PRODUCT
router.put(
    "/products/:id",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const product = await Product.findOne({
                _id: req.params.id,
                farmerId: req.user.userId
            });

            if (!product) {
                return res.status(404).json({
                    message: "Product not found."
                });
            }

            product.name = req.body.name ?? product.name;
            product.category = req.body.category ?? product.category;
            product.quantity = req.body.quantity ?? product.quantity;
            product.unit = req.body.unit ?? product.unit;
            product.pricePerUnit = req.body.pricePerUnit ?? product.pricePerUnit;
            product.description = req.body.description ?? product.description;
            product.status = req.body.status ?? product.status;

            await product.save();

            res.status(200).json({
                message: "Product updated successfully.",
                product
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

// STEP 6 — DELETE PRODUCT
router.delete(
    "/products/:id",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const product = await Product.findOneAndDelete({
                _id: req.params.id,
                farmerId: req.user.userId
            });

            if (!product) {
                return res.status(404).json({
                    message: "Product not found."
                });
            }

            res.status(200).json({
                message: "Product deleted successfully."
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

// STEP 7 — UPDATE PRODUCT STATUS
router.patch(
    "/products/:id/status",
    authMiddleware,
    roleMiddleware("farmer"),
    async (req, res) => {
        try {
            const { status } = req.body;

            const allowedStatuses = ["available", "sold", "inactive"];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid product status."
                });
            }

            const product = await Product.findOne({
                _id: req.params.id,
                farmerId: req.user.userId
            });

            if (!product) {
                return res.status(404).json({
                    message: "Product not found."
                });
            }

            product.status = status;

            await product.save();

            res.status(200).json({
                message: "Product status updated successfully.",
                product
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);


// EXPORT ROUTER
module.exports = router;