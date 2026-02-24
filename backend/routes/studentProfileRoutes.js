const express = require("express");
const Student = require("../models/Student");
const upload = require("../middleware/upload");

const router = express.Router();



// 🔹 GET PROFILE
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 UPDATE PERSONAL INFO
router.put("/update/:id", async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 UPLOAD PHOTO
router.put("/upload-photo/:id", upload.single("photo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            { photo: req.file.path },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        console.error("PHOTO UPLOAD ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 UPLOAD RESUME
router.put("/upload-resume/:id", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            { resume: req.file.path },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        console.error("RESUME UPLOAD ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});


// 🔹 ADD SKILL
router.post("/add-skill/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.skills.push(req.body.skill);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 DELETE SKILL
router.delete("/delete-skill/:id/:index", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.skills.splice(req.params.index, 1);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 ADD EDUCATION
router.post("/add-education/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.education.push(req.body);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 DELETE EDUCATION
router.delete("/delete-education/:id/:index", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.education.splice(req.params.index, 1);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 ADD PROJECT
router.post("/add-project/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.projects.push(req.body);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔹 DELETE PROJECT
router.delete("/delete-project/:id/:index", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.projects.splice(req.params.index, 1);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit Project
router.put("/edit-project/:id/:index", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.projects[req.params.index] = req.body;
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
