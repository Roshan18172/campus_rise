const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    collegeName: String,

    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },

    password: {
        type: String,
        required: false
    },

    otp: String,
    otpExpires: Date,

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "college"
    }
}, { timestamps: true });

module.exports = mongoose.model("College", collegeSchema);
