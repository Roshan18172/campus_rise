const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

/* ===============================
   🔹 GET ALL JOBS
================================ */
router.get("/all", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ===============================
   🔹 APPLY JOB
================================ */
router.post("/apply", async (req, res) => {
    try {
        const { jobId, studentId } = req.body;

        const exists = await Application.findOne({ jobId, studentId });

        if (exists) {
            return res.status(400).json({ message: "Already applied" });
        }

        const app = new Application({ jobId, studentId });
        await app.save();

        res.json({ message: "Applied successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ===============================
   🔹 SAVE JOB (FIXED ✅)
================================ */
router.post("/save", async (req, res) => {
    try {
        const { jobId, studentId } = req.body;

        const exists = await SavedJob.findOne({ jobId, studentId });

        if (exists) {
            return res.status(400).json({ message: "Already saved" });
        }

        const saved = new SavedJob({ jobId, studentId });
        await saved.save();

        res.json({ message: "Job saved successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ===============================
   🔹 GET SAVED JOBS
================================ */
router.get("/saved/:studentId", async (req, res) => {
    try {
        const saved = await SavedJob.find({
            studentId: req.params.studentId
        }).populate("jobId");

        const jobs = saved.map(item => ({
            ...item.jobId._doc,
            savedId: item._id
        }));

        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ================================
   🔹 REMOVE SAVED JOB
================================ */
router.delete("/saved/:id", async (req, res) => {
    try {
        await SavedJob.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed from saved jobs" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
