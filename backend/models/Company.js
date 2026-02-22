const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        otp: String,
        otpExpires: Date,

        role: {
            type: String,
            default: "company",
        },

        website: String,
        address: String,
        hrName: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
