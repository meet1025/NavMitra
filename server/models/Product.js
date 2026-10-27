const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: String,
            required: true,
            trim: true
        },

        pricePerUnit: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["available", "sold", "inactive"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);