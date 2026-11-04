
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function createAdmin() {
    try {
        const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI } =
            process.env;

        if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGO_URI) {
            throw new Error("Required Admin or MongoDB environment variables are missing.");
        }

        if (ADMIN_PASSWORD.length < 12) {
            throw new Error("Admin password must be at least 12 characters.");
        }

        await mongoose.connect(MONGO_URI);

        const email = ADMIN_EMAIL.trim().toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("This email already exists. No account was created.");
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

        await User.create({
            name: ADMIN_NAME.trim(),
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin account created successfully!");
        console.log("Admin email:", email);

    } catch (error) {
        console.error("Admin setup failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
