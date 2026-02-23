const express = require("express");
const Student = require("../models/Student");
const College = require("../models/College");
const Company = require("../models/Company");
// const sendOtpEmail = require("../utils/sendOtp");

const router = express.Router();

const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

// 🔹 Get model by role
const getModelByRole = (role) => {
    if (role === "student") return Student;
    if (role === "college") return College;
    if (role === "company") return Company;
    return null;
};



// 🔹 SEND OTP
router.post("/send-otp", async (req, res) => {
    try {
        const { name, phone, role } = req.body;

        const Model = getModelByRole(role);
        if (!Model) {
            return res.json({ success: false, msg: "Invalid role" });
        }

        if (!phone) {
            return res.json({ success: false, msg: "Phone required" });
        }

        // 🔍 Find existing user by phone
        let user = await Model.findOne({ phone });

        // ⛔ If already registered & verified → don't send OTP again
        if (user && user.isVerified && user.password) {
            return res.json({
                success: false,
                msg: "User already registered. Please login.",
            });
        }

        // 🆕 Create new user if not exists
        if (!user) {
            user = new Model({
                ...(role === "student"
                    ? { name }
                    : role === "college"
                        ? { collegeName: name }
                        : { companyName: name }),
                phone,
                isVerified: false,
            });
        } else {
            // 🔄 Update name if provided
            if (name) {
                if (role === "student") user.name = name;
                if (role === "college") user.collegeName = name;
                if (role === "company") user.companyName = name;
            }
        }

        // ⏱️ Prevent OTP spam (30 sec cooldown)
        if (user.otpExpires && user.otpExpires > Date.now() - 30 * 1000) {
            return res.json({
                success: false,
                msg: "Wait 30 seconds before requesting another OTP",
            });
        }

        // 🔢 Generate OTP
        const otp = generateOtp();

        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;

        await user.save();

        console.log(`📱 OTP for ${phone} is ${otp}`);

        res.json({ success: true, msg: "OTP sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});



// 🔹 VERIFY OTP
router.post("/verify-otp", async (req, res) => {
    try {
        const { phone, otp, role } = req.body;

        const Model = getModelByRole(role);
        if (!Model) {
            return res.json({ success: false, msg: "Invalid role" });
        }

        const user = await Model.findOne({ phone });

        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        if (user.otp !== otp) {
            return res.json({ success: false, msg: "Invalid OTP" });
        }

        if (user.otpExpires < Date.now()) {
            return res.json({ success: false, msg: "OTP expired" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.json({ success: true, msg: "OTP verified" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

module.exports = router;
