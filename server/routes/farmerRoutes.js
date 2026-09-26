const express = require("express");
const FarmerProfile = require("../models/FarmerProfile");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

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

module.exports = router;