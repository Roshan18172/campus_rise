const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName: String,

    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    }
    ,
    password: {
        type: String,
        required: false
    },

    otp: String,
    otpExpires: Date,

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "company"
    },
    /* 🔹 PROFILE FIELDS */
    logo: String,
    location: String,
    website: String,
    about: String,
    /* 🔹 JOB ROLES */
    job_roles: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
