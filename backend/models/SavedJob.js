const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }
}, { timestamps: true });

module.exports = mongoose.model("SavedJob", savedJobSchema);
