const express = require("express");
const Student = require("../models/Student");
const College = require("../models/College");
const Company = require("../models/Company");
const sendOtpEmail = require("../utils/sendOtp");

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
        const { name, email, phone, role } = req.body;

        const Model = getModelByRole(role);
        if (!Model) {
            return res.json({ success: false, msg: "Invalid role" });
        }

        let user;

        // 📧 Company → Email OTP
        if (role === "company") {
            if (!email) return res.json({ success: false, msg: "Email required" });

            user = await Model.findOne({ email });

            if (!user) {
                user = new Model({ companyName: name, email });
            }
        }

        // 📱 Student & College → Mobile OTP
        else {
            if (!phone) return res.json({ success: false, msg: "Mobile required" });

            user = await Model.findOne({ phone });

            if (!user) {
                if (role === "student") {
                    user = new Model({ name, phone });
                } else {
                    user = new Model({ collegeName: name, phone });
                }
            }
        }

        const otp = generateOtp();

        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;

        await user.save();

        if (role === "company") {
            await sendOtpEmail(email, otp);
        } else {
            console.log(`📱 OTP for ${phone} is ${otp}`); // Replace with SMS API later
        }

        res.json({ success: true, msg: "OTP sent" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});



// 🔹 VERIFY OTP
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, phone, otp, role } = req.body;

        const Model = getModelByRole(role);
        if (!Model) {
            return res.json({ success: false, msg: "Invalid role" });
        }

        let user;

        if (role === "company") {
            user = await Model.findOne({ email });
        } else {
            user = await Model.findOne({ phone });
        }

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.json({ success: false, msg: "❌ Wrong OTP, try again" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.json({ success: true, msg: "✅ OTP Verified" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

module.exports = router;
