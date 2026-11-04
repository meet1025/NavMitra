const Product = require("../models/Product");
const Requirement = require("../models/Requirement");
const Offer = require("../models/Offer");

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


// CREATE BUYER REQUIREMENT (BUYERS ONLY)
router.post(
    "/requirements",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const {
                productName,
                category,
                quantity,
                unit,
                targetPrice,
                description,
                city,
                district,
                state
            } = req.body;

            if (!productName || !quantity || !unit) {
                return res.status(400).json({
                    message: "Product name, quantity, and unit are required."
                });
            }

            const requirement = await Requirement.create({
                buyerId: req.user.userId,
                productName,
                category,
                quantity,
                unit,
                targetPrice,
                description,
                city,
                district,
                state
            });

            res.status(201).json({
                message: "Buyer requirement created successfully.",
                requirement
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);


// GET BUYER'S OWN REQUIREMENTS
router.get(
    "/requirements",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const requirements = await Requirement.find({
                buyerId: req.user.userId
            }).sort({ createdAt: -1 });

            res.status(200).json({
                message: "Buyer requirements fetched successfully.",
                requirements
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

// GET OFFERS RECEIVED BY BUYER
router.get(
    "/offers",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const offers = await Offer.find({
                buyerId: req.user.userId
            })
                .populate("farmerId", "name email")
                .populate("requirementId", "productName quantity unit targetPrice")
                .sort({ createdAt: -1 });

            res.status(200).json({
                message: "Received offers fetched successfully.",
                offers
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    }
);

// ACCEPT OR REJECT A FARMER'S OFFER
router.put(
    "/offers/:id",
    authMiddleware,
    roleMiddleware("buyer"),
    async (req, res) => {
        try {
            const { status } = req.body;

            if (!["accepted", "rejected"].includes(status)) {
                return res.status(400).json({
                    message: "Status must be accepted or rejected."
                });
            }

            const offer = await Offer.findOneAndUpdate(
                {
                    _id: req.params.id,
                    buyerId: req.user.userId,
                    status: "pending"
                },
                {
                    status
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );

            if (!offer) {
                return res.status(404).json({
                    message: "Pending offer not found."
                });
            }

            res.status(200).json({
                message: `Offer ${status} successfully.`,
                offer
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