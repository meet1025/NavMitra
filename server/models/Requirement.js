
const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        productName: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        unit: {
            type: String,
            required: true,
            trim: true
        },

        targetPrice: {
            type: Number,
            min: 0
        },

        description: {
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

        status: {
            type: String,
            enum: ["open", "fulfilled", "closed"],
            default: "open"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Requirement", requirementSchema);