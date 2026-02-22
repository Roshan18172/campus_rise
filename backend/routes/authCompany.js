const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const router = express.Router();
const JWT_SECRET = "mysecretkey";


// 🔹 REGISTER COMPANY
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        let company = await Company.findOne({ email, role: "company" });

        if (!company || !company.isVerified) {
            return res.json({ success: false, msg: "Verify OTP first" });
        }

        const salt = await bcrypt.genSalt(10);
        company.password = await bcrypt.hash(password, salt);

        await company.save();

        const token = jwt.sign(
            { id: company._id, role: "company" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: company });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});


// 🔹 LOGIN COMPANY (EMAIL)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const company = await Company.findOne({ email, role: "company" });

        if (!company) return res.json({ success: false, msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, company.password);

        if (!isMatch)
            return res.json({ success: false, msg: "Invalid Credentials" });

        const token = jwt.sign(
            { id: company._id, role: "company" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: company });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
