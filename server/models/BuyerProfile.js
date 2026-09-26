const mongoose = require("mongoose");

const buyerProfileSchema = new mongoose.Schema(
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

        city: {
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

        buyerType: {
            type: String,
            trim: true
        },

        organizationName: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("BuyerProfile", buyerProfileSchema);