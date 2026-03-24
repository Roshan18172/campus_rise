const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    status: {
        type: String,
        default: "Applied",
    }
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
