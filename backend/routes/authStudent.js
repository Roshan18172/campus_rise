const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();
const JWT_SECRET = "mysecretkey";


// 🔹 REGISTER STUDENT
router.post("/register", async (req, res) => {
    try {
        const { phone, email, password } = req.body;

        if (!phone || !password) {
            return res.json({ success: false, msg: "Phone & Password required" });
        }

        let student = await Student.findOne({ phone, role: "student" });

        if (!student || !student.isVerified) {
            return res.json({ success: false, msg: "Verify OTP first" });
        }

        // ✅ Save email if provided
        if (email) {
            student.email = email;
        }

        // ✅ Hash password
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);

        await student.save();

        const token = jwt.sign(
            { id: student._id, role: "student" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: student });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// 🔹 LOGIN STUDENT (MOBILE)
router.post("/login", async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return res.json({
                success: false,
                msg: "Email or Phone and Password required"
            });
        }

        const student = await Student.findOne({
            $or: [{ email }, { phone }]
        });

        if (!student) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, student.password || "");
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: student._id, role: "student" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: student });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
