import React, { useState } from "react";
import campusriselogo from "../campusriselogo.png";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [role, setRole] = useState("student");
    const [otpSent, setOtpSent] = useState(false);

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #2563EB, #10B981)",
            }}
        >
            <div className="card shadow-lg p-4 border-0" style={{ width: "420px" }}>
                <div className="text-center mb-3">
                    <img src={campusriselogo} alt="CampusRise" width="80" />
                    <h4 className="fw-bold mt-2">Create Account</h4>
                </div>

                <form>
                    {/* Role Selector */}
                    <div className="mb-2">
                        <label className="form-label">Register As</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">🎓 Student</option>
                            <option value="company">🏢 Company</option>
                            <option value="college">🏫 College</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="mb-2">
                        <label className="form-label">
                            {role === "company"
                                ? "Company Name"
                                : role === "college"
                                    ? "College Name"
                                    : "Full Name"}
                        </label>
                        <input type="text" className="form-control" />
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                    </div>

                    {/* Mobile (hide for company if you want) */}
                    {role !== "company" && (
                        <div className="mb-2">
                            <label className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" />
                        </div>
                    )}

                    {/* OTP Section (only for student & college) */}
                    {role !== "company" &&
                        (!otpSent ? (
                            <button
                                type="button"
                                className="btn btn-warning w-100 mb-2"
                                onClick={() => setOtpSent(true)}
                            >
                                Send OTP
                            </button>
                        ) : (
                            <div className="mb-2">
                                <label className="form-label">Enter OTP</label>
                                <input type="text" className="form-control" />
                            </div>
                        ))}

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                    </div>

                    <button className="btn btn-success w-100 mb-3">Register</button>

                    <p className="text-center mb-0">
                        Already have an account?{" "}
                        <Link to="/login" className="fw-bold text-primary">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
