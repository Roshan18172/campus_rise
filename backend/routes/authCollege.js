const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const College = require("../models/College");

const router = express.Router();
const JWT_SECRET = "mysecretkey";

router.post("/register", async (req, res) => {
  try {
    const { phone, email, password } = req.body;

    console.log(req.body); // 🔍 debug

    let college = await College.findOne({ phone, role: "college" });

    if (!college || !college.isVerified) {
      return res.json({ success: false, msg: "Verify OTP first" });
    }

    // ✅ Update email only if provided
    if (email && email.trim() !== "") {
      college.email = email.trim();
    }

    const salt = await bcrypt.genSalt(10);
    college.password = await bcrypt.hash(password, salt);

    // 🔴 Important if schema had no email earlier
    college.markModified("email");

    await college.save();

    const token = jwt.sign(
      { id: college._id, role: "college" },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ success: true, token, data: college });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});


router.post("/login", async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return res.json({
                success: false,
                msg: "Email or Phone and Password required"
            });
        }

        const college = await College.findOne({
            $or: [{ email }, { phone }]
        });

        if (!college) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, college.password || "");
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: college._id, role: "college" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, data: college });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});


module.exports = router;
