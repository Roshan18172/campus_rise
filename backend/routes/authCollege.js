const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const College = require("../models/College");

const router = express.Router();
const JWT_SECRET = "mysecretkey";

router.post("/register", async (req, res) => {
    try {
        const { phone, password } = req.body;

        let college = await College.findOne({ phone, role: "college" });

        if (!college || !college.isVerified) {
            return res.json({ success: false, msg: "Verify OTP first" });
        }

        const salt = await bcrypt.genSalt(10);
        college.password = await bcrypt.hash(password, salt);

        await college.save();

        const token = jwt.sign(
            { id: college._id, role: "college" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: college });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { phone, password } = req.body;

        const college = await College.findOne({ phone, role: "college" });

        if (!college) return res.json({ success: false, msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, college.password);

        if (!isMatch)
            return res.json({ success: false, msg: "Invalid Credentials" });

        const token = jwt.sign(
            { id: college._id, role: "college" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: college });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
