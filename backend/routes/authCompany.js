const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const router = express.Router();
const JWT_SECRET = "mysecretkey";


// 🔹 REGISTER COMPANY
router.post("/register", async (req, res) => {
    try {
        const { phone, email, password } = req.body;

        if (!phone || !email || !password) {
            return res.json({
                success: false,
                msg: "Phone, Email and Password required",
            });
        }

        // 🔍 Find by phone OR email (important for old OTP records)
        let company = await Company.findOne({
            $or: [{ phone }, { email }],
            role: "company",
        });

        if (!company) {
            return res.json({ success: false, msg: "Send OTP first" });
        }

        if (!company.isVerified) {
            return res.json({ success: false, msg: "Verify OTP first" });
        }

        // 🚫 Prevent duplicate phone
        const phoneExists = await Company.findOne({
            phone,
            _id: { $ne: company._id },
        });

        if (phoneExists) {
            return res.json({ success: false, msg: "Phone already in use" });
        }

        // 🚫 Prevent duplicate email
        const emailExists = await Company.findOne({
            email,
            _id: { $ne: company._id },
        });

        if (emailExists) {
            return res.json({ success: false, msg: "Email already in use" });
        }

        // ✅ ALWAYS SAVE PHONE & EMAIL
        company.phone = phone.trim();
        company.email = email.trim();

        // 🔐 Hash password
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
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});




// 🔹 LOGIN COMPANY (EMAIL)
router.post("/login", async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return res.json({
                success: false,
                msg: "Email or Phone and Password required"
            });
        }

        const company = await Company.findOne({
            $or: [{ email }, { phone }]
        });

        if (!company) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, company.password || "");
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: company._id, role: "company" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: company });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});


module.exports = router;
