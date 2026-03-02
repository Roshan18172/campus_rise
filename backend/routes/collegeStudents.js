const express = require("express");
const router = express.Router();
const StudentProfile = require("../models/Student");
const CollegeProfile = require("../models/College");


// 🔹 Get all students of logged-in college
router.get("/:collegeUserId", async (req, res) => {
    try {
        const college = await CollegeProfile.findOne({
            userId: req.params.collegeUserId,
        });

        if (!college) {
            return res.status(404).json({ msg: "College not found" });
        }

        const students = await StudentProfile.find({
            "education.college": college.collegeName,
        }).select("-password"); // hide sensitive data

        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});


// 🔹 Get single student full details
router.get("/student/:studentId", async (req, res) => {
    try {
        const student = await StudentProfile.findById(req.params.studentId);

        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
