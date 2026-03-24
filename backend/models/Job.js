const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    companyName: String,

    title: {
        type: String,
        required: true,
    },

    description: String,

    location: String,

    salary: String,

    jobType: {
        type: String, // Full-time / Internship
        default: "Full-time",
    },

    skills: [String],

    deadline: Date,

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
