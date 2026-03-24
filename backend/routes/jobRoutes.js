const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Company = require("../models/Company");

/* ===============================
   🔹 POST JOB
================================ */
router.post("/post/:companyId", async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const newJob = new Job({
            companyId: company._id,
            companyName: company.companyName,
            ...req.body,
        });

        await newJob.save();

        res.json({ message: "Job posted successfully", job: newJob });

    } catch (err) {
        console.error("POST JOB ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

/* ===============================
   🔹 GET COMPANY JOBS
================================ */
router.get("/company/:companyId", async (req, res) => {
    try {
        const jobs = await Job.find({ companyId: req.params.companyId }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ===============================
   🔹 DELETE JOB
================================ */
router.delete("/:jobId", async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.jobId);
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
