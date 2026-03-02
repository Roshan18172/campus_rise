const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  noticeNo: String,
  title: String,
  content: String,
  date: String,
});

const collegeSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
      unique: true,
    },
    collegeName: String,

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
    },

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
        default: "college"
    },
    
    location: String,
    about: String,

    logo: String,

    courses: [String],

    notices: [noticeSchema],
}, { timestamps: true });

module.exports = mongoose.model("College", collegeSchema);
