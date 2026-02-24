const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    degree: String,
    college: String,
    startYear: String,
    endYear: String,
    score: String,
});

const projectSchema = new mongoose.Schema({
    title: String,
    desc: String,
    github: String,
});

const studentSchema = new mongoose.Schema(
    {
        name: String,

        email: {
            type: String,
            unique: true,
            sparse: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        password: String,

        otp: String,
        otpExpires: Date,

        isVerified: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            default: "student",
        },

        location: String,
        gender: String,
        blood: String,
        headline: String,
        about: String,

        photo: String,
        resume: String,

        skills: [String],
        education: [educationSchema],
        projects: [projectSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
