const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,

    email: {
        type: String,
        required: false,   // ⚠️ make optional for OTP stage
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
        required: false   // ⚠️ set during register
    },

    otp: String,
    otpExpires: Date,

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "student"
    }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
