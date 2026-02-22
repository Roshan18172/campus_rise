const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
    {
        collegeName: { type: String, required: true },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
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
            default: "college",
        },

        address: String,
        website: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
