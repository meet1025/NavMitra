
const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        requirementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Requirement",
            required: true
        },

        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        offeredQuantity: {
            type: Number,
            required: true,
            min: 1
        },

        offeredPrice: {
            type: Number,
            required: true,
            min: 0
        },

        message: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Offer", offerSchema);
