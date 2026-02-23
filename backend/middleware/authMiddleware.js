const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const College = require("../models/College");
const Company = require("../models/Company");

const JWT_SECRET = "mysecretkey";

const authMiddleware = (roles = []) => {
    // allow single role string or array
    if (typeof roles === "string") {
        roles = [roles];
    }

    return async (req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            // decoded => { id, role }
            req.user = decoded;

            // 🔐 Role check
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ msg: "Access denied: Insufficient role" });
            }

            // 📦 Fetch full user details based on role
            let userDetails = null;

            if (decoded.role === "student") {
                userDetails = await Student.findById(decoded.id).select("-password");
            }
            else if (decoded.role === "college") {
                userDetails = await College.findById(decoded.id).select("-password");
            }
            else if (decoded.role === "company") {
                userDetails = await Company.findById(decoded.id).select("-password");
            }

            if (!userDetails) {
                return res.status(404).json({ msg: "User not found" });
            }

            // attach full profile
            req.userDetails = userDetails;

            next();
        } catch (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }
    };
};

module.exports = authMiddleware;
