const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

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
            default: "student",
        },

        resume: String,
        skills: [String],
        collegeName: String,
        course: String,
        year: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
