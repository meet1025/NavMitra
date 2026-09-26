const mongoose = require("mongoose");

const farmerProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        phone: {
            type: String,
            trim: true
        },

        address: {
            type: String,
            trim: true
        },

        village: {
            type: String,
            trim: true
        },

        district: {
            type: String,
            trim: true
        },

        state: {
            type: String,
            trim: true
        },

        farmingType: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("FarmerProfile", farmerProfileSchema);