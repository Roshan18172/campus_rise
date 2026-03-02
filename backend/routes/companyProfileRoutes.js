const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const upload = require("../middleware/uploadLogo");

/* =======================================================
   🔹 GET COMPANY PROFILE
======================================================= */
router.get("/:userId", async (req, res) => {
    try {
        const company = await Company.findById(req.params.userId);
        res.json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* =======================================================
   🔹 UPDATE COMPANY PROFILE
======================================================= */
router.put("/update/:userId", async (req, res) => {
    try {
        const updated = await Company.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* =======================================================
   🔹 UPLOAD LOGO
======================================================= */
router.put(
    "/upload-logo/:userId",
    upload.single("logo"),
    async (req, res) => {
        try {
            const updated = await Company.findByIdAndUpdate(
                req.params.userId,
                { logo: req.file.path },
                { new: true }
            );
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

/* 🔹 ADD JOB ROLE */
router.post("/add-job-role/:companyId", async (req, res) => {
    try {
        const { jobRole } = req.body;

        if (!jobRole || jobRole.trim() === "") {
            return res.status(400).json({ message: "Job role is required" });
        }

        const company = await Company.findById(req.params.companyId);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        if (company.job_roles.includes(jobRole)) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.companyId,
            { $push: { job_roles: jobRole } },
            { new: true }
        );

        res.json({
            message: "Job role added successfully",
            job_roles: updatedCompany.job_roles,
        });

    } catch (error) {
        console.error("ADD JOB ROLE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

/* 🔹 GET ALL JOB ROLES */
router.get("/job-roles/:companyId", async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId).select(
            "job_roles companyName"
        );

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.json(company);
    } catch (error) {
        console.error("GET JOB ROLES ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

/* 🔹 DELETE JOB ROLE */
router.delete("/delete-job-role/:companyId", async (req, res) => {
    try {
        const { jobRole } = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.companyId,
            { $pull: { job_roles: jobRole } },
            { new: true }
        );

        res.json({
            message: "Job role deleted successfully",
            job_roles: updatedCompany.job_roles,
        });

    } catch (error) {
        console.error("DELETE JOB ROLE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;