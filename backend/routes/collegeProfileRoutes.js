const express = require("express");
const router = express.Router();
const CollegeProfile = require("../models/College");
const upload = require("../middleware/uploadLogo");


// 🔹 GET PROFILE
router.get("/:userId", async (req, res) => {
    try {
        let profile = await CollegeProfile.findOne({ userId: req.params.userId });

        if (!profile) {
            profile = await CollegeProfile.create({ userId: req.params.userId });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 UPDATE PROFILE (name, location, about)
router.put("/update/:userId", async (req, res) => {
    try {
        const updated = await CollegeProfile.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true, upsert: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 UPLOAD LOGO
router.put("/upload-logo/:userId", upload.single("logo"), async (req, res) => {
    try {
        const updated = await CollegeProfile.findOneAndUpdate(
            { userId: req.params.userId },
            { logo: req.file.path },
            { new: true, upsert: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 ADD COURSE
router.post("/add-course/:userId", async (req, res) => {
    try {
        const profile = await CollegeProfile.findOneAndUpdate(
            { userId: req.params.userId },
            { $push: { courses: req.body.course } },
            { new: true, upsert: true }
        );

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 DELETE COURSE
router.delete("/delete-course/:userId/:index", async (req, res) => {
    try {
        const profile = await CollegeProfile.findOne({ userId: req.params.userId });

        profile.courses.splice(req.params.index, 1);
        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 ADD NOTICE
router.post("/add-notice/:userId", async (req, res) => {
    try {
        const profile = await CollegeProfile.findOneAndUpdate(
            { userId: req.params.userId },
            { $push: { notices: req.body } },
            { new: true, upsert: true }
        );

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 EDIT NOTICE
router.put("/edit-notice/:userId/:index", async (req, res) => {
    try {
        const profile = await CollegeProfile.findOne({ userId: req.params.userId });

        profile.notices[req.params.index] = req.body;

        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 DELETE NOTICE
router.delete("/delete-notice/:userId/:index", async (req, res) => {
    try {
        const profile = await CollegeProfile.findOne({ userId: req.params.userId });

        profile.notices.splice(req.params.index, 1);
        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
