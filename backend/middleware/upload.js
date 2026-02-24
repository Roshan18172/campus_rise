const multer = require("multer");
const fs = require("fs");
// const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";

    if (file.fieldname === "photo") {
      uploadPath = "uploads/photos";
    } else {
      uploadPath = "uploads/resumes";
    }

    // ✅ Create folder if not exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = multer({ storage });
